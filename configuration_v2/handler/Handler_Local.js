/**
 * Handler for Local config 本地配置云端同步处理
 * 键与 Conf_Local 的 fullKey 一致（含模块前缀），仅保留 Conf_Local 中存在的同步项
 */
function Handler_Local() {
    class Handler {
        constructor() { }

        // ----- CHECKOUT -----
        "CHECKOUT.UI_LAYOUT_TYPE" = {
            settingKey: "CHECKSTAND_LAYOUT_TYPE_HANDLE",
            settingType: "CONTENT",
        };

        "CHECKOUT.UI_PRODUCT_CARD" = {
            settingKey: "PRODUCT_CARD_SHOW",
            settingType: "CONTENT",
            settingSubKey: {
                NAME_SHOW: "UI_PRODUCT_CARD_NAME_SHOW",
                PRICE_SHOW: "UI_PRODUCT_CARD_PRICE_SHOW",
                PICTURE_SHOW: "UI_PRODUCT_CARD_PICTURE_SHOW",
                CODE_SHOW: "UI_PRODUCT_CARD_CODE_SHOW",
                COUNT_SHOW: "UI_PRODUCT_CARD_COUNT_SHOW",
                PACKAGE_SHOW: "UI_PRODUCT_CARD_PACKAGE_SHOW",
            },
        };

        "CHECKOUT.BUSINESS_TYPE" = {
            settingKey: "STORE_BUSINESS_TYPE_HANDLE",
            settingType: "CONTENT",
        };

        "CHECKOUT.PRODUCT_ITEM_AUTO_MERGE_ENABLE" = {
            settingKey: "PRODUCT_MERGE",
            settingType: "SWITCH",
        };

        "CHECKOUT.SETTLEMENT_SPLIT_ORDER_ENABLE" = {
            settingKey: "SPLIT_ORDER_SETTLEMENT",
            settingType: "SWITCH",
        };

        "CHECKOUT.SETTLEMENT_AUTO_PRINT_BILL_TICKET_ENABLE" = {
            settingKey: "AUTO_PRINT_SETTLEMENT_TICKET",
            settingType: "SWITCH",
        };

        "CHECKOUT.SETTLEMENT_MANUAL_PRINT_MAKING_TICKET_ENABLE" = {
            settingKey: "MANUAL_PRINT_MAKING_TICKET",
            settingType: "SWITCH",
        };

        "CHECKOUT.SETTLEMENT_CASH_AUTO_FILL_ENABLE" = {
            settingKey: "CASH_BACHFILL_INPUTBOX",
            settingType: "SWITCH",
        };

        "CHECKOUT.SETTLEMENT_CASH_AMOUNT_COVERAGE_ENABLE" = {
            settingKey: "CASH_AMOUNT_COVERAGE",
            settingType: "SWITCH",
        };

        "CHECKOUT.POS_QR_ORDER_ENABLE" = {
            settingKey: "TABLE_QR_CODE_TO_ORDER",
            settingType: "SWITCH",
        };

        "CHECKOUT.POS_QR_ORDER_AUTO_ACCEPT_ENABLE" = {
            settingKey: "TABLE_AUTO_ACCEPT_ORDER",
            settingType: "SWITCH",
        };

        "CHECKOUT.LOW_INVENTORY_WARNING_ENABLE" = {
            settingKey: "INV_WARNING",
            settingType: "SWITCH",
        };

        "CHECKOUT.POS_SCAN_ORDER_ENABLE" = {
            settingKey: "STORE_SCAN_SWITCH",
            settingType: "SWITCH",
        };

        "CHECKOUT.COMMODITY_CLASSIFICATION" = {
            settingKey: "COMMODITY_CLASSIFICATION",
            settingType: "CONTENT",
            settingSubKey: {
                NAME_SHOW: "UI_CATEGORY_NAME_SHOW",
                PICTURE_SHOW: "UI_CATEGORY_PICTURE_SHOW",
                COUNT_SHOW: "UI_CATEGORY_COUNT_SHOW",
            },
        };

        "CHECKOUT.AD_SELF_SECONDARY" = {
            settingKey: "AD_SELF_SECONDARY",
            settingType: "CONTENT",
        };

        "CHECKOUT.AD_SELF_PLAY_TYPE" = {
            settingKey: "AD_SELF_PLAY_TYPE",
            settingType: "CONTENT",
        };

        "CHECKOUT.AD_SELF_PLAY_SWITCH" = {
            settingKey: "AD_SELF_PLAY_SWITCH",
            settingType: "CONTENT",
        };

        "CHECKOUT.AD_SELF_DINING_METHOD" = {
            settingKey: "AD_SELF_DINING_METHOD",
            settingType: "CONTENT",
        };

        "CHECKOUT.AD_SELF_PAYMENT_METHOD" = {
            settingKey: "AD_SELF_PAYMENT_METHOD",
            settingType: "CONTENT",
        };

        "CHECKOUT.AD_SELF_DELIVERED_METHOD" = {
            settingKey: "AD_SELF_DELIVERED_METHOD",
            settingType: "CONTENT",
        };

        "CHECKOUT.AD_SELF_CHECKSTAND_LAYOUT_TYPE" = {
            settingKey: "AD_SELF_CHECKSTAND_LAYOUT_TYPE",
            settingType: "CONTENT",
        };

        "CHECKOUT.UI_COMMODITY_CLASSIFICATION" = {
            settingKey: "COMMODITY_CLASSIFICATION",
            settingType: "CONTENT",
            settingSubKey: {
                NAME_SHOW: "UI_CATEGORY_NAME_SHOW",
                PICTURE_SHOW: "UI_CATEGORY_PICTURE_SHOW",
                COUNT_SHOW: "UI_CATEGORY_COUNT_SHOW",
            },
        }

        // ----- MEMBER -----
        "MEMBER.MEMBER_ENABLE" = {
            settingKey: "MEMBER_ABILITY",
            settingType: "SWITCH",
        };

        // ----- PAYMENT -----
        "PAYMENT.PAY_METHOD_LIST" = {
            pull: async () => {
                const res = await max.serviceCall(
                    "mobileGetPayMethodList",
                    { body: {} },
                    { env: max.envVar.getValue("SUNMI_ENV") },
                    true
                );
                const { data, success } = res.body;
                if (success) return { PAY_METHOD_LIST: data };
            },
        };

        "PAYMENT.PAY_ECR_CONFIG" = {
            settingKey: "PAY_ECR_CONFIG",
            settingType: "CONTENT",
        };

        // ----- TAX -----
        "TAX.TAX_LIST" = {
            pull: async () => {
                const res = await max.serviceCall(
                    "listStoreTaxItemsByMgt",
                    { body: {} },
                    { env: max.envVar.getValue("SUNMI_ENV") },
                    true
                );
                const { data, success } = res.body;
                if (success) return { TAX_LIST: data };
            },
        };

        "TAX.FEE_LIST" = {
            pull: async () => {
                const res = await max.serviceCall(
                    "listFeeItem",
                    { body: {} },
                    { env: max.envVar.getValue("SUNMI_ENV") },
                    true
                );
                const { data, success } = res.body;
                if (success) return { FEE_LIST: data?.list || [] };
            },
        };

        "TAX.PRODUCT_PRICE_INCLUDE_TAX_ENABLE" = {
            settingKey: "PRODUCT_VAT",
            settingType: "SWITCH",
            push: async (data) => {
                const res = await max.serviceCall(
                    "setProductVatSetting",
                    {
                        body: {
                            status: data.PRODUCT_PRICE_INCLUDE_TAX_ENABLE ? "open" : "close",
                        },
                    },
                    { env: max.envVar.getValue("SUNMI_ENV") },
                    true
                );
                return res.body;
            },
        };

        "TAX.TAXATION_MODE" = {
            settingKey: "TAXATION_MODE",
            settingType: "CONTENT",
        };

        // ----- VOICE -----
        "VOICE.SCAN_PAYMENT_ENABLE" = {
            settingKey: "SCAN_PAYMENT",
            settingType: "SWITCH",
        };

        "VOICE.SCAN_PAYMENT_BEEP_ENABLE" = {
            settingKey: "SCAN_PAYMENT_BEEP",
            settingType: "SWITCH",
        };

        "VOICE.SCAN_PAYMENT_TEXT_ENABLE" = {
            settingKey: "SCAN_PAYMENT_VOICE",
            settingType: "SWITCH",
        };

        "VOICE.TACKOUT_ORDER_ENABLE" = {
            settingKey: "TACKOUT_ORDER",
            settingType: "SWITCH",
        };

        "VOICE.TACKOUT_ORDER_BEEP_ENABLE" = {
            settingKey: "TACKOUT_ORDER_BEEP",
            settingType: "SWITCH",
        };

        "VOICE.TACKOUT_ORDER_TEXT_ENABLE" = {
            settingKey: "TACKOUT_ORDER_VOICE",
            settingType: "SWITCH",
        };

        "VOICE.SCAN_ORDER_ENABLE" = {
            settingKey: "SCAN_ORDER",
            settingType: "SWITCH",
        };

        "VOICE.SCAN_ORDER_BEEP_ENABLE" = {
            settingKey: "SCAN_ORDER_BEEP",
            settingType: "SWITCH",
        };

        "VOICE.SCAN_ORDER_TEXT_ENABLE" = {
            settingKey: "SCAN_ORDER_VOICE",
            settingType: "SWITCH",
        };

        "VOICE.CHANNEL_SCAN_ORDER_ENABLE" = {
            settingKey: "CHANNEL_SCAN_ORDER",
            settingType: "SWITCH",
        };

        "VOICE.CHANNEL_SCAN_ORDER_BEEP_ENABLE" = {
            settingKey: "CHANNEL_SCAN_ORDER_BEEP",
            settingType: "SWITCH",
        };

        "VOICE.CHANNEL_SCAN_ORDER_TEXT_ENABLE" = {
            settingKey: "CHANNEL_SCAN_ORDER_VOICE",
            settingType: "SWITCH",
        };
    }

    return new Handler();
}