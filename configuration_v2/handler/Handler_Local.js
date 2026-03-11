/**
 * Handler for Cashier module 收银台模块配置处理函数
 * 
 * Name rules 命名规范: 与Conf_xx的配置项key对应
 */
function Handler_Local() {
    class Handler {
        constructor() { }

        /**
         * 收银台布局尺寸
         * {
         *   "settingKey": "CHECKSTAND_LAYOUT_TYPE_HANDLE",
         *   "settingType": "CONTENT",
         *   "settingVal": 'GRAPH' // GRAPH（卡片）LIST（列表）
         * }
         */
        UI_LAYOUT_TYPE = {
            settingKey: "CHECKSTAND_LAYOUT_TYPE_HANDLE",
            settingType: "CONTENT",
        };
        // /**
        //  * 桌台选择视图
        //  */
        // UI_DINING_LAYOUT_TYPE = {
        //     settingKey: 'DINING_LAYOUT',
        //     settingType: 'CONTENT'
        // };
        /**
         * 商品卡片样式
         * {
         *   "settingKey": "PRODUCT_CARD_SHOW",
         *   "settingType": "CONTENT",
         *   "settingVal": {
         *      "NAME_SHOW": "open",
         *      "PRICE_SHOW": "open",
         *      "PICTURE_SHOW": "open",
         *      "CODE_SHOW": "open",
         *      "COUNT_SHOW": "open",
         *      "PACKAGE_SHOW": "open",
         *   }
         * }
         */
        UI_PRODUCT_CARD = {
            settingKey: "PRODUCT_CARD_SHOW",
            settingType: "CONTENT",
            settingSubKey: {
                // cloud key -> local key (defined in Conf_xx file)
                NAME_SHOW: "UI_PRODUCT_CARD_NAME_SHOW",
                PRICE_SHOW: "UI_PRODUCT_CARD_PRICE_SHOW",
                PICTURE_SHOW: "UI_PRODUCT_CARD_PICTURE_SHOW",
                CODE_SHOW: "UI_PRODUCT_CARD_CODE_SHOW",
                COUNT_SHOW: "UI_PRODUCT_CARD_COUNT_SHOW",
                PACKAGE_SHOW: "UI_PRODUCT_CARD_PACKAGE_SHOW",
            },
        };
        /**
         * 营业模式（正快餐设置）
         * {
         *   "settingKey": "STORE_BUSINESS_TYPE_HANDLE",
         *   "settingType": "CONTENT",
         *   "settingVal": 'ALL' // SETTLE_FIRST(先结账后用餐) | ORDER_FIRST(先用餐后结账) | ALL(全部)
         * }
         */
        BUSINESS_TYPE = {
            settingKey: "STORE_BUSINESS_TYPE_HANDLE",
            settingType: "CONTENT",
        };
        /**
         * 是否菜品自动合并
         * {
         *   "settingKey": "PRODUCT_MERGE",
         *   "settingType": "SWITCH",
         *   "settingVal": 'close' // close（禁用）open（启用）
         * }
         */
        PRODUCT_ITEM_AUTO_MERGE_ENABLE = {
            settingKey: "PRODUCT_MERGE",
            settingType: "SWITCH",
        };
        /**
         * 是否启用拆分支付
         */
        SETTLEMENT_SPLIT_ORDER_ENABLE = {
            settingKey: "SPLIT_ORDER_SETTLEMENT",
            settingType: "SWITCH",
        };
        /**
         * 是否结账后默认打印结账单
         */
        SETTLEMENT_AUTO_PRINT_BILL_TICKET_ENABLE = {
            settingKey: "AUTO_PRINT_SETTLEMENT_TICKET",
            settingType: "SWITCH",
        };
        /**
         * 是否快餐手动打印制作单
         */
        SETTLEMENT_MANUAL_PRINT_MAKING_TICKET_ENABLE = {
            settingKey: "MANUAL_PRINT_MAKING_TICKET",
            settingType: "SWITCH",
        };
        /**
         * 是否现金支付默认回填输入框
         */
        SETTLEMENT_CASH_AUTO_FILL_ENABLE = {
            settingKey: "CASH_BACHFILL_INPUTBOX",
            settingType: "SWITCH",
        };
        /**
         * 是否现金常用支付金额覆盖模式
         */
        SETTLEMENT_CASH_AMOUNT_COVERAGE_ENABLE = {
            settingKey: "CASH_AMOUNT_COVERAGE",
            settingType: "SWITCH",
        };
        // enable POS qr order 是否启用POS扫码点餐
        POS_QR_ORDER_ENABLE = {
            settingKey: "TABLE_QR_CODE_TO_ORDER",
            settingType: "SWITCH",
        };
        // enable POS qr order auto accept 是否启用POS扫码点餐自动接单
        POS_QR_ORDER_AUTO_ACCEPT_ENABLE = {
            settingKey: "TABLE_AUTO_ACCEPT_ORDER",
            settingType: "SWITCH",
        };
        // 低库存预警
        LOW_INVENTORY_WARNING_ENABLE = {
            settingKey: "INV_WARNING",
            settingType: "SWITCH",
        };

        // whether enable POS scan to order 是否启用POS扫码点餐 (注意不是外部渠道扫码点餐!)
        POS_SCAN_ORDER_ENABLE = {
            settingKey: "STORE_SCAN_SWITCH",
            settingType: "SWITCH",
        };

        UI_COMMODITY_CLASSIFICATION = {
            settingKey: "COMMODITY_CLASSIFICATION",
            settingType: "CONTENT",
            settingSubKey: {
                NAME_SHOW: "UI_CATEGORY_NAME_SHOW",
                PICTURE_SHOW: "UI_CATEGORY_PICTURE_SHOW",
                COUNT_SHOW: "UI_CATEGORY_COUNT_SHOW",
            },
        }


    }

    return new Handler();
}