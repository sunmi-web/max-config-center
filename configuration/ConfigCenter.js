function ConfigCenter() {
    /**
     * version: 1.0.0
     */
    const logger = max.globalFn.logger();

    // config entries 配置文件
    const ConfigEntry = max.globalFn.ConfEntry();
    // config handlers 配置处理句柄
    const HandlerEntry = max.globalFn.HandlerEntry();

    /**
     * get config item 查询指定key配置项
     * @param {string} module required
     * @param {string} key required
     *
     * eg:
     * const ConfigCenter = max.globalFn.ConfigCenter();
     * const valX = ConfigCenter.get('moduleName', 'KEY_X')
     */
    const get = (module = "", key = "") => {
        // console.log("get===>", module, key)
        if (!module || !key) {
            logger.error("[ConfigCenter/get]", "module and key cannot be undefined");
            return;
        }
        // cloud > cache > local
        const cacheKey = `@SETTING_${module}.${key}`;
        const cacheVal = max.cache.get(cacheKey);
        if (cacheVal !== undefined && cacheVal !== null) {
            return cacheVal;
        }
        return ConfigEntry[module]?.()?.[key];
    };

    /**
     * set config item 设置指定key配置项值
     * @param {string} module required
     * @param {string} key required
     * @param {any} value required
     *
     * eg:
     * const ConfigCenter = max.globalFn.ConfigCenter();
     * ConfigCenter.set('moduleName', 'KEY_X', true)
     */
    const set = (module = "", key = "", value) => {
        if (!module || !key || value === undefined) {
            logger.error(
                "[ConfigCenter/set]",
                "module, key and value cannot be undefined"
            );
            return false;
        }
        const cacheKey = `@SETTING_${module}.${key}`;
        max.cache.set(cacheKey, value);
    };
    /**
     * parse config from cloud
     * @param {string} module required
     * @param {string} handlerId required
     * @param {object} rawConfig required
     * @param {string} rawConfig.settingKey required
     * @param {string} rawConfig.settingType required
     * @param {string|object} rawConfig.settingVal required
     */
    const parse = (module = "", handlerId, rawConfig) => {
        if (!module || !handlerId || !rawConfig) {
            logger.error(
                "[ConfigCenter/parse]",
                "module, handlerId, rawConfig cannot be undefined"
            );
            return;
        }
        // handlerId is recommended to define with key by default 定义handlerId时要求默认使用key的名称
        const handlerObj = HandlerEntry[module]?.()?.[handlerId];
        if (!handlerObj) {
            logger.error(
                "[ConfigCenter/parse]",
                `cannot find handler by params: ${{ module, handlerId }}`
            );
            return;
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
            if (!handlerObj.settingSubKey) {
                logger.error(
                    "[ConfigCenter/parse]",
                    `settingSubKey cannot be undefined when settingVal is object`
                );
                return;
            }
            Object.keys(handlerObj.settingSubKey).map((subKey) => {
                const localKey = handlerObj.settingSubKey[subKey];
                result[localKey] = rawConfig.settingVal[subKey] === "open";
            });
        }
        return result;
    };
    /**
     * raw config to cloud
     * @param {string} module required
     * @param {string} handlerId
     * @param {any} parsedConfig required
     */
    const raw = (module = "", handlerId, parsedConfig) => {
        if (!module || !handlerId || parsedConfig === undefined) {
            logger.error(
                "[ConfigCenter/raw]",
                "module, handlerId, parsedConfig cannot be undefined"
            );
            return;
        }
        // handlerId is recommended to define with key by default 定义handlerId时要求默认使用key的名称
        const handlerObj = HandlerEntry[module]?.()?.[handlerId];
        if (!handlerObj) {
            logger.error(
                "[ConfigCenter/raw]",
                `cannot find handler by params: ${{ module, handlerId }}`
            );
            return;
        }

        const result = {
            settingKey: handlerObj.settingKey,
            settingType: handlerObj.settingType,
            settingVal: undefined,
        };
        // transform data
        if (handlerObj.settingType === "SWITCH") {
            result.settingVal = parsedConfig ? "open" : "close";
        } else if (
            handlerObj.settingType === "CONTENT" &&
            typeof parsedConfig === "string"
        ) {
            result.settingVal = parsedConfig;
        } else if (
            handlerObj.settingType === "CONTENT" &&
            typeof parsedConfig === "object"
        ) {
            if (!handlerObj.settingSubKey) {
                logger.error(
                    "[ConfigCenter/raw]",
                    `settingSubKey cannot be undefined when settingVal is object`
                );
                return;
            }
            const valueObj = {};
            Object.keys(handlerObj.settingSubKey).map((subKey) => {
                const localKey = handlerObj.settingSubKey[subKey];
                const cacheKey = `@SETTING_${module}.${localKey}`;
                valueObj[subKey] =
                    parsedConfig[localKey] === undefined
                        ? max.cache.get(cacheKey)
                            ? "open"
                            : "close"
                        : parsedConfig[localKey]
                            ? "open"
                            : "close";
            });
            result.settingVal = valueObj;
        }
        return result;
    };
    /**
     * pull config from cloud
     * @param {string} module required
     * @param {string} handlerId required
     */
    const pull = async (module = "", handlerId) => {
        if (!module || !handlerId) {
            logger.error(
                "[ConfigCenter/pull]",
                "module, handlerId cannot be undefined"
            );
            return false;
        }
        // handlerId is recommended to define with key by default 定义handlerId时要求默认使用key的名称
        const handlerObj = HandlerEntry[module]?.()?.[handlerId];
        if (!handlerObj) {
            logger.error(
                "[ConfigCenter/pull]",
                `cannot find handler by params: ${{ module, handlerId }}`
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
                        `custom pull config (${{ module, handlerId }}) fail: `
                    );
                    result = false;
                }
            } catch (e) {
                logger.errorApm(
                    "[ConfigCenter/pull]",
                    `custom pull config (${{ module, handlerId }}) exception: `,
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
                    // parse
                    const parsedConfig = parse(module, handlerId, data[0]);
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
     * push config from cloud
     * @param {string} module required
     * @param {string} handlerId required
     * @param {any} data required
     */
    const push = async (module = "", handlerId, data) => {
        debugger
        let result = {
            success: false
        };
        if (!module || !handlerId || data === undefined) {
            logger.error(
                "[ConfigCenter/push]",
                "module, handlerId and data cannot be undefined"
            );
            return result;
        }
        // handlerId is recommended to define with key by default 定义handlerId时要求默认使用key的名称
        const handlerObj = HandlerEntry[module]?.()?.[handlerId];
        if (!handlerObj) {
            logger.error(
                "[ConfigCenter/push]",
                `cannot find handler by params: ${{ module, handlerId }}`
            );
            return result;
        }


        // custom push
        if (handlerObj.push) {
            try {
                const res = await handlerObj.push(data);
                if (res.success) {
                    Object.keys(data).map((localKey) => {
                        const cacheKey = `@SETTING_${module}.${localKey}`;
                        max.cache.set(cacheKey, data[localKey]);
                    });
                    result = {
                        success: true
                    };
                } else {
                    logger.errorApm(
                        "[ConfigCenter/push]",
                        `custom push config (${{ module, handlerId }}) fail: `,
                        res
                    );
                    result = {
                        success: false,
                        detail: res
                    };
                }
            } catch (e) {
                logger.errorApm(
                    "[ConfigCenter/push]",
                    `custom push config (${{ module, handlerId }}) exception: `,
                    e
                );
                result = {
                    success: false,
                    detail: e
                };
            }
        }
        // standard push
        else {
            try {
                // transform data
                const rawConfig = raw(module, handlerId, data);
                const settingArr = [rawConfig];

                // sync to cloud
                const res = await max.serviceCall(
                    "setSoftSettings",
                    {
                        body: {
                            setting: settingArr,
                        },
                    },
                    { env: max.envVar.getValue("SUNMI_ENV") },
                    true
                );

                const { success } = res.body;
                if (success) {
                    // update config local
                    const parsedConfig = parse(module, handlerId, rawConfig);
                    Object.keys(parsedConfig).map((localKey) => {
                        const cacheKey = `@SETTING_${module}.${localKey}`;
                        max.cache.set(cacheKey, parsedConfig[localKey]);
                    });
                    result = {
                        success: true
                    };
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
     * @param {Object[]} params required
     * @param {string} params[].module
     * @param {string} params[].handlerId
     */
    const batchPull = async (params = []) => {
        try {
            const standardHandlers = [];
            const customHandlers = [];
            // analyze
            params.map((item) => {
                const { module, handlerId } = item;
                if (!module || !handlerId) {
                    logger.error(
                        "[ConfigCenter/batchPull]",
                        "module, handlerId cannot be undefined"
                    );
                    return;
                }
                const handlerObj = HandlerEntry[module]?.()?.[handlerId];
                if (!handlerObj) {
                    logger.error(
                        "[ConfigCenter/batchPull]",
                        `cannot find handler by params: ${{ module, handlerId }}`
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

            // request standard data
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
            if (success) {
                standardHandlers.map((handler) => {
                    const { module, handlerId, settingKey } = handler;
                    // parse
                    const parsedConfig = parse(
                        module,
                        handlerId,
                        data.find((item) => item.settingKey === settingKey)
                    );
                    if (parsedConfig === undefined) {
                        logger.errorApm(
                            "[ConfigCenter/batchPull]",
                            `parsedConfig is undefined. module: ${module} handlerId: ${handlerId} settingKey: ${settingKey}`,
                            standardRes
                        );
                        return;
                    }
                    // update cache
                    Object.keys(parsedConfig).map((localKey) => {
                        const cacheKey = `@SETTING_${module}.${localKey}`;
                        max.cache.set(cacheKey, parsedConfig[localKey]);
                    });
                });
            } else {
                logger.errorApm(
                    "[ConfigCenter/batchPull]",
                    `batch pull config ${JSON.stringify(standardHandlers)} fail: `,
                    standardRes
                );
            }

            // request custom data
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
            return (
                standardRes.body.success &&
                customRes.reduce((prev, curr) => prev && curr, true)
            );
        } catch (e) {
            logger.errorApm(
                "[ConfigCenter/batchPull]",
                `batch pull config ${params} exception: `,
                e
            );
            return false;
        }
    };
    /**
     * batch push config to cloud
     * @param {Object[]} params required
     * @param {string} params[].module
     * @param {string} params[].handlerId
     * @param {any} params[].data
     */
    const batchPush = async (params = []) => {
        try {
            const standardHandlers = [];
            const customHandlers = [];
            // analyze
            params.map((item) => {
                const { module, handlerId, data } = item;
                if (!module || !handlerId) {
                    logger.error(
                        "[ConfigCenter/batchPush]",
                        "module, handlerId cannot be undefined"
                    );
                    return;
                }
                const handlerObj = HandlerEntry[module]?.()?.[handlerId];
                if (!handlerObj) {
                    logger.error(
                        "[ConfigCenter/batchPush]",
                        `cannot find handler by params: ${{ module, handlerId }}`
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
            /** standard data **/
            // transform
            const rawConfigArr = standardHandlers.map((handler) =>
                raw(handler.module, handler.handlerId, handler.data)
            );
            // sync to cloud
            const standardRes = await max.serviceCall(
                "setSoftSettings",
                {
                    body: {
                        setting: rawConfigArr,
                    },
                },
                { env: max.envVar.getValue("SUNMI_ENV") },
                true
            );
            const { success } = standardRes.body;
            if (success) {
                // update config local
                standardHandlers.map((handler) => {
                    const { module, handlerId, settingKey } = handler;
                    // parse
                    const parsedConfig = parse(
                        module,
                        handlerId,
                        rawConfigArr.find((item) => item.settingKey === settingKey)
                    );
                    // update cache
                    Object.keys(parsedConfig).map((localKey) => {
                        const cacheKey = `@SETTING_${module}.${localKey}`;
                        max.cache.set(cacheKey, parsedConfig[localKey]);
                    });
                });
            } else {
                logger.errorApm(
                    "[ConfigCenter/batchPush]",
                    `batch push config (${standardHandlers}) fail: `,
                    standardRes
                );
                return false;
            }

            /** custom data **/
            const customRes = await Promise.all(
                customHandlers.map(async (handler) => {
                    const { module, handlerId, data } = handler;
                    try {
                        const res = await handler.push(data);
                        if (res.success) {
                            Object.keys(data).map((localKey) => {
                                const cacheKey = `@SETTING_${module}.${localKey}`;
                                max.cache.set(cacheKey, data[localKey]);
                            });
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
                            "[ConfigCenter/batchPull]",
                            `custom batch batch push config (${{
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
            return (
                standardRes.body.success &&
                customRes.reduce((prev, curr) => prev && curr, true)
            );
        } catch (e) {
            logger.errorApm(
                "[ConfigCenter/batchPush]",
                `batch push config ${params} exception: `,
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
