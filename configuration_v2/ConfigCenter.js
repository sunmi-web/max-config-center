function ConfigCenter() {
    /**
     * version: 2.0.0
     * 纯 v2：命名规范 <模块>.<KEY>，仅支持 get(fullKey) / set(fullKey, value)
     */
    const logger = max.globalFn.logger();

    const ConfigEntry = max.globalFn.ConfEntry();
    const HandlerEntry = max.globalFn.HandlerEntry();

    /** 从入口 ConfEntry 按 fullKey 取值（入口已合并 Conf_Universal + Conf_Local） */
    const getFromEntry = (fullKey) => {
        const val = ConfigEntry[fullKey];
        return val !== undefined && val !== null ? val : undefined;
    };

    /**
     * 查询配置项 get(fullKey)
     * @param {string} fullKey 如 'CHECKOUT.PRODUCT_ITEM_AUTO_MERGE_ENABLE'
     */
    const get = (fullKey = "") => {
        if (!fullKey) {
            logger.error("[ConfigCenter/get]", "fullKey cannot be empty");
            return undefined;
        }
        const cacheKey = `@SETTING_${fullKey}`;
        const cacheVal = max.cache.get(cacheKey);
        if (cacheVal !== undefined && cacheVal !== null) {
            return cacheVal;
        }
        const fromEntry = getFromEntry(fullKey);
        if (fromEntry === undefined) {
            logger.error("[ConfigCenter/get]", `key not found: ${fullKey}`);
        }
        return fromEntry;
    };

    /**
     * 设置配置项 set(fullKey, value)
     * @param {string} fullKey 如 'CHECKOUT.PRODUCT_ITEM_AUTO_MERGE_ENABLE'
     * @param {any} value
     */
    const set = (fullKey = "", value) => {
        if (!fullKey || value === undefined) {
            logger.error("[ConfigCenter/set]", "fullKey and value cannot be undefined");
            return false;
        }
        max.cache.set(`@SETTING_${fullKey}`, value);
        return true;
    };
    /**
     * parse config from cloud
     * @param {string} fullKey 如 'VOICE.CHANNEL_SCAN_ORDER_TEXT_ENABLE'
     * @param {object} rawConfig 云端原始配置
     */
    const parse = (fullKey = "", rawConfig) => {
        if (!fullKey || typeof fullKey !== "string") {
            logger.error("[ConfigCenter/parse]", "fullKey cannot be empty");
            return undefined;
        }
        const dotIdx = fullKey.indexOf(".");
        if (dotIdx <= 0) {
            logger.error("[ConfigCenter/parse]", `invalid fullKey: ${fullKey}`);
            return undefined;
        }
        const module = fullKey.slice(0, dotIdx);
        const handlerId = fullKey.slice(dotIdx + 1);
        if (!rawConfig) {
            logger.error(
                "[ConfigCenter/parse]",
                `rawConfig empty (cloud may not return this key), skip: ${module}.${handlerId}`
            );
            return undefined;
        }
        const fullKeyLookup = `${module}.${handlerId}`;
        const handlerObj = HandlerEntry[fullKeyLookup] ?? HandlerEntry[handlerId];
        if (!handlerObj) {
            logger.error(
                "[ConfigCenter/parse]",
                `handler not found: ${fullKeyLookup}`
            );
            return undefined;
        }

        const result = {};
        if (handlerObj.settingType === "SWITCH") {
            result[handlerId] = rawConfig.settingVal?.toUpperCase() === "OPEN";
        } else if (
            handlerObj.settingType === "CONTENT" &&
            typeof rawConfig.settingVal === "string"
        ) {
            result[handlerId] = rawConfig.settingVal;
        } else if (
            handlerObj.settingType === "CONTENT" &&
            typeof rawConfig.settingVal === "object"
        ) {
            // settingSubKey: 云端 key -> 本地 key（本地 key 不含模块前缀）
            if (handlerObj.settingSubKey) {
                Object.keys(handlerObj.settingSubKey).forEach((subKey) => {
                    const localKey = handlerObj.settingSubKey[subKey];
                    result[localKey] = rawConfig.settingVal[subKey] === "open";
                });
            } else {
                // 未配 settingSubKey 时，整段 settingVal 作为该 handlerId 的值，不阻塞
                result[handlerId] = rawConfig.settingVal;
            }
        }
        return result;
    };
    /**
     * raw config to cloud
     * @param {string} fullKey 如 'VOICE.CHANNEL_SCAN_ORDER_TEXT_ENABLE'
     * @param {any} parsedConfig 已解析的配置
     */
    const raw = (fullKey = "", parsedConfig) => {
        if (!fullKey || typeof fullKey !== "string") {
            logger.error("[ConfigCenter/raw]", "fullKey cannot be empty");
            return undefined;
        }
        const dotIdx = fullKey.indexOf(".");
        if (dotIdx <= 0) {
            logger.error("[ConfigCenter/raw]", `invalid fullKey: ${fullKey}`);
            return undefined;
        }
        const module = fullKey.slice(0, dotIdx);
        const handlerId = fullKey.slice(dotIdx + 1);
        if (parsedConfig === undefined) {
            logger.error("[ConfigCenter/raw]", `parsedConfig undefined, skip: ${fullKey}`);
            return undefined;
        }
        const parsed = parsedConfig;
        const fullKeyLookup = `${module}.${handlerId}`;
        const handlerObj = HandlerEntry[fullKeyLookup] ?? HandlerEntry[handlerId];
        if (!handlerObj) {
            logger.error(
                "[ConfigCenter/raw]",
                `handler not found: ${fullKeyLookup}`
            );
            return undefined;
        }

        const result = {
            settingKey: handlerObj.settingKey,
            settingType: handlerObj.settingType,
            settingVal: undefined,
        };
        // transform data
        if (handlerObj.settingType === "SWITCH") {
            result.settingVal = parsed ? "open" : "close";
        } else if (
            handlerObj.settingType === "CONTENT" &&
            typeof parsed === "string"
        ) {
            result.settingVal = parsed;
        } else if (
            handlerObj.settingType === "CONTENT" &&
            typeof parsed === "object"
        ) {
            // settingSubKey: 云端 key -> 本地 key（本地 key 不含模块前缀）
            if (handlerObj.settingSubKey) {
                const valueObj = {};
                Object.keys(handlerObj.settingSubKey).forEach((subKey) => {
                    const localKey = handlerObj.settingSubKey[subKey];
                    const cacheKey = `@SETTING_${module}.${localKey}`;
                    valueObj[subKey] =
                        parsed[localKey] === undefined
                            ? max.cache.get(cacheKey)
                                ? "open"
                                : "close"
                            : parsed[localKey]
                                ? "open"
                                : "close";
                });
                result.settingVal = valueObj;
            } else {
                // 未配 settingSubKey 时，parsed 中 handlerId 对应整段对象即 settingVal
                result.settingVal = parsed[handlerId] !== undefined ? parsed[handlerId] : parsed;
            }
        }
        return result;
    };
    /**
     * pull config from cloud
     * @param {string} fullKey 如 'VOICE.CHANNEL_SCAN_ORDER_TEXT_ENABLE'
     */
    const pull = async (fullKey = "") => {
        if (!fullKey || typeof fullKey !== "string") {
            logger.error("[ConfigCenter/pull]", "fullKey cannot be empty");
            return false;
        }
        const dotIdx = fullKey.indexOf(".");
        if (dotIdx <= 0) {
            logger.error("[ConfigCenter/pull]", `invalid fullKey: ${fullKey}`);
            return false;
        }
        const module = fullKey.slice(0, dotIdx);
        const hid = fullKey.slice(dotIdx + 1);
        const handlerObj = HandlerEntry[fullKey] ?? HandlerEntry[hid];
        if (!handlerObj) {
            logger.error(
                "[ConfigCenter/pull]",
                `handler not found: ${fullKey}`
            );
            return false;
        }

        let result = false;
        // custom pull
        if (handlerObj.pull) {
            try {
                const parsedConfig = await handlerObj.pull();
                if (parsedConfig) {
                    // update cache
                    Object.keys(parsedConfig).map((localKey) => {
                        const cacheKey = `@SETTING_${module}.${localKey}`;
                        max.cache.set(cacheKey, parsedConfig[localKey]);
                    });
                    result = true;
                } else {
                    logger.errorApm(
                        "[ConfigCenter/pull]",
                        `custom pull config (${{ module, handlerId: hid }}) fail: `
                    );
                    result = false;
                }
            } catch (e) {
                logger.errorApm(
                    "[ConfigCenter/pull]",
                    `custom pull config (${{ module, handlerId: hid }}) exception: `,
                    e
                );
                result = false;
            }
        }
        // standard pull
        else {
            try {
                const res = await max.serviceCall(
                    "getSoftSettings",
                    {
                        body: {
                            settingKeys: [handlerObj.settingKey],
                        },
                    },
                    { env: max.envVar.getValue("SUNMI_ENV") },
                    true
                );
                const { data, success } = res.body;
                if (success) {
                    const parsedConfig = parse(fullKey, data[0]);
                    // update cache
                    Object.keys(parsedConfig).map((localKey) => {
                        const cacheKey = `@SETTING_${module}.${localKey}`;
                        max.cache.set(cacheKey, parsedConfig[localKey]);
                    });
                    result = true;
                } else {
                    logger.errorApm(
                        "[ConfigCenter/pull]",
                        `pull config (${handlerObj.settingKey}) fail: `,
                        res
                    );
                    result = false;
                }
            } catch (e) {
                logger.errorApm(
                    "[ConfigCenter/pull]",
                    `pull config (${handlerObj.settingKey}) exception: `,
                    e
                );
                result = false;
            }
        }
        return result;
    };
    /**
     * push config to cloud
     * @param {string} fullKey 如 'PAYMENT.PAY_ECR_CONFIG'
     * @param {any} data 要下发的配置值
     */
    const push = async (fullKey = "", data) => {
        let result = { success: false };
        if (!fullKey || typeof fullKey !== "string") {
            logger.error("[ConfigCenter/push]", "fullKey cannot be empty");
            return result;
        }
        const dotIdx = fullKey.indexOf(".");
        if (dotIdx <= 0) {
            logger.error("[ConfigCenter/push]", `invalid fullKey: ${fullKey}`);
            return result;
        }
        if (data === undefined) {
            logger.error("[ConfigCenter/push]", "data cannot be undefined");
            return result;
        }
        const module = fullKey.slice(0, dotIdx);
        const hid = fullKey.slice(dotIdx + 1);
        const handlerObj = HandlerEntry[fullKey] ?? HandlerEntry[hid];
        if (!handlerObj) {
            logger.error(
                "[ConfigCenter/push]",
                `handler not found: ${fullKey}`
            );
            return result;
        }

        // custom push
        if (handlerObj.push) {
            try {
                const res = await handlerObj.push(data);
                if (res.success) {
                    if (data != null && typeof data === "object" && !Array.isArray(data)) {
                        Object.keys(data).forEach((localKey) => {
                            max.cache.set(`@SETTING_${module}.${localKey}`, data[localKey]);
                        });
                    } else {
                        max.cache.set(`@SETTING_${module}.${hid}`, data);
                    }
                    result = { success: true };
                } else {
                    logger.errorApm(
                        "[ConfigCenter/push]",
                        `custom push config (${{ module, handlerId: hid }}) fail: `,
                        res
                    );
                    result = { success: false, detail: res };
                }
            } catch (e) {
                logger.errorApm(
                    "[ConfigCenter/push]",
                    `custom push config (${{ module, handlerId: hid }}) exception: `,
                    e
                );
                result = { success: false, detail: e };
            }
        }
        // standard push
        else {
            try {
                const rawConfig = raw(fullKey, data);
                const settingArr = [rawConfig];

                const res = await max.serviceCall(
                    "setSoftSettings",
                    {
                        body: { setting: settingArr },
                    },
                    { env: max.envVar.getValue("SUNMI_ENV") },
                    true
                );

                const { success } = res.body;
                if (success) {
                    const parsedConfig = parse(fullKey, rawConfig);
                    if (parsedConfig && typeof parsedConfig === "object") {
                        Object.keys(parsedConfig).forEach((localKey) => {
                            max.cache.set(`@SETTING_${module}.${localKey}`, parsedConfig[localKey]);
                        });
                    }
                    result = { success: true };
                } else {
                    logger.errorApm(
                        "[ConfigCenter/push]",
                        `push config (${handlerObj.settingKey}) fail: `,
                        res
                    );
                    result = {
                        success: false,
                        detail: res.body
                    };
                }
            } catch (e) {
                logger.errorApm(
                    "[ConfigCenter/push]",
                    `push config (${handlerObj.settingKey}) exception: `,
                    e
                );
                result = {
                    success: false,
                    detail: e
                };
            }
        }
        return result;
    };
    /**
     * batch pull config from cloud
     * @param {string[]} fullKeys 配置项 fullKey 数组，如 ['VOICE.SCAN_PAYMENT_ENABLE', 'VOICE.CHANNEL_SCAN_ORDER_TEXT_ENABLE']
     */
    const batchPull = async (fullKeys = []) => {
        try {
            const standardHandlers = [];
            const customHandlers = [];
            const normalized = fullKeys.map((item) => {
                if (typeof item === "string") {
                    const dotIdx = item.indexOf(".");
                    if (dotIdx <= 0) return null;
                    return { module: item.slice(0, dotIdx), handlerId: item.slice(dotIdx + 1), fullKey: item };
                }
                return item?.module && item?.handlerId
                    ? { ...item, fullKey: `${item.module}.${item.handlerId}` }
                    : null;
            }).filter(Boolean);

            normalized.forEach(({ module, handlerId }) => {
                const fullKeyLookup = `${module}.${handlerId}`;
                const handlerObj = HandlerEntry[fullKeyLookup] ?? HandlerEntry[handlerId];
                if (!handlerObj) {
                    logger.error(
                        "[ConfigCenter/batchPull]",
                        `handler not found, skip: ${fullKeyLookup}`
                    );
                    return;
                }
                if (handlerObj.pull) {
                    customHandlers.push({
                        module,
                        handlerId,
                        ...handlerObj,
                    });
                } else {
                    standardHandlers.push({
                        module,
                        handlerId,
                        ...handlerObj,
                    });
                }
            });

            let standardOk = true;
            if (standardHandlers.length > 0) {
                const standardRes = await max.serviceCall(
                    "getSoftSettings",
                    {
                        body: {
                            settingKeys: standardHandlers.map((handler) => handler.settingKey),
                        },
                    },
                    { env: max.envVar.getValue("SUNMI_ENV") },
                    true
                );
                const { data, success } = standardRes.body;
                standardOk = success;
                if (success) {
                    standardHandlers.forEach((handler) => {
                        const { module, handlerId, settingKey } = handler;
                        const fullKey = `${module}.${handlerId}`;
                        const parsedConfig = parse(
                            fullKey,
                            data.find((item) => item.settingKey === settingKey)
                        );
                        if (parsedConfig === undefined) {
                            logger.error(
                                "[ConfigCenter/batchPull]",
                                `parse failed, skip: ${module}.${handlerId} (settingKey: ${settingKey})`
                            );
                            return;
                        }
                        Object.keys(parsedConfig).forEach((localKey) => {
                            max.cache.set(`@SETTING_${module}.${localKey}`, parsedConfig[localKey]);
                        });
                    });
                } else {
                    logger.errorApm(
                        "[ConfigCenter/batchPull]",
                        `batch pull config ${JSON.stringify(standardHandlers)} fail: `,
                        standardRes
                    );
                }
            }

            const customRes = await Promise.all(
                customHandlers.map(async (handler) => {
                    const { module, handlerId } = handler;
                    try {
                        const parsedConfig = await handler.pull();
                        if (parsedConfig) {
                            // update cache
                            Object.keys(parsedConfig).map((localKey) => {
                                const cacheKey = `@SETTING_${module}.${localKey}`;
                                max.cache.set(cacheKey, parsedConfig[localKey]);
                            });
                            return true;
                        } else {
                            logger.errorApm(
                                "[ConfigCenter/batchPull]",
                                `custom batch pull config (${{ module, handlerId }}) fail: `
                            );
                            return false;
                        }
                    } catch (e) {
                        logger.errorApm(
                            "[ConfigCenter/batchPull]",
                            `custom batch pull config (${{ module, handlerId }}) exception: `,
                            e
                        );
                        return false;
                    }
                })
            );
            const customOk = customRes.length === 0 || customRes.every(Boolean);
            return standardOk && customOk;
        } catch (e) {
            logger.errorApm(
                "[ConfigCenter/batchPull]",
                `batch pull config exception: `,
                e
            );
            return false;
        }
    };
    /**
     * batch push config to cloud
     * @param {Object[]} items 如 [{ key: 'PAYMENT.PAY_ECR_CONFIG', value: JSON.stringify({...}) }]
     *   - key: fullKey（模块.配置项）
     *   - value: 要下发的值（与 handler 类型一致：SWITCH 为 boolean，CONTENT 为 string 或 object）
     */
    const batchPush = async (items = []) => {
        try {
            const standardHandlers = [];
            const customHandlers = [];
            const normalized = items.map((item) => {
                if (item?.key != null && item?.value !== undefined) {
                    const dotIdx = String(item.key).indexOf(".");
                    if (dotIdx <= 0) return null;
                    const module = String(item.key).slice(0, dotIdx);
                    const handlerId = String(item.key).slice(dotIdx + 1);
                    return { module, handlerId, data: item.value };
                }
                if (item?.module && item?.handlerId && item?.data !== undefined) {
                    return { module: item.module, handlerId: item.handlerId, data: item.data };
                }
                return null;
            }).filter(Boolean);

            normalized.forEach(({ module, handlerId, data }) => {
                const fullKeyLookup = `${module}.${handlerId}`;
                const handlerObj = HandlerEntry[fullKeyLookup] ?? HandlerEntry[handlerId];
                if (!handlerObj) {
                    logger.error(
                        "[ConfigCenter/batchPush]",
                        `handler not found, skip: ${fullKeyLookup}`
                    );
                    return;
                }
                if (handlerObj.push) {
                    customHandlers.push({
                        module,
                        handlerId,
                        data,
                        ...handlerObj,
                    });
                } else {
                    standardHandlers.push({
                        module,
                        handlerId,
                        data,
                        ...handlerObj,
                    });
                }
            });
            let standardOk = true;
            if (standardHandlers.length > 0) {
                const rawConfigArr = standardHandlers.map((handler) =>
                    raw(`${handler.module}.${handler.handlerId}`, handler.data)
                );
                const standardRes = await max.serviceCall(
                    "setSoftSettings",
                    {
                        body: { setting: rawConfigArr },
                    },
                    { env: max.envVar.getValue("SUNMI_ENV") },
                    true
                );
                const { success } = standardRes.body;
                standardOk = success;
                if (success) {
                    standardHandlers.forEach((handler) => {
                        const { module, handlerId, settingKey } = handler;
                        const fullKey = `${module}.${handlerId}`;
                        const parsedConfig = parse(
                            fullKey,
                            rawConfigArr.find((item) => item.settingKey === settingKey)
                        );
                        if (parsedConfig && typeof parsedConfig === "object") {
                            Object.keys(parsedConfig).forEach((localKey) => {
                                max.cache.set(`@SETTING_${module}.${localKey}`, parsedConfig[localKey]);
                            });
                        }
                    });
                } else {
                    logger.errorApm(
                        "[ConfigCenter/batchPush]",
                        `batch push config (${standardHandlers}) fail: `,
                        standardRes
                    );
                    return false;
                }
            }

            const customRes = await Promise.all(
                customHandlers.map(async (handler) => {
                    const { module, handlerId, data } = handler;
                    try {
                        const res = await handler.push(data);
                        if (res.success) {
                            if (data != null && typeof data === "object" && !Array.isArray(data)) {
                                Object.keys(data).forEach((localKey) => {
                                    max.cache.set(`@SETTING_${module}.${localKey}`, data[localKey]);
                                });
                            } else {
                                max.cache.set(`@SETTING_${module}.${handlerId}`, data);
                            }
                            return true;
                        } else {
                            logger.errorApm(
                                "[ConfigCenter/batchPush]",
                                `custom batch push config (${{
                                    module,
                                    handlerId,
                                    data,
                                }}) fail: `,
                                res
                            );
                            return false;
                        }
                    } catch (e) {
                        logger.errorApm(
                            "[ConfigCenter/batchPush]",
                            `custom batch push config (${{
                                module,
                                handlerId,
                                data,
                            }}) exception: `,
                            e
                        );
                        return false;
                    }
                })
            );
            const customOk = customRes.length === 0 || customRes.every(Boolean);
            return standardOk && customOk;
        } catch (e) {
            logger.errorApm(
                "[ConfigCenter/batchPush]",
                "batch push config exception: ",
                e
            );
            return false;
        }
    };

    return {
        get,
        set,
        pull,
        push,
        batchPull,
        batchPush,
        parse,
        raw
    };
}
