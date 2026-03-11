function Conf_Local() {
    /**
     * Config for Cashier module 收银台模块配置 
     *
     * Name rules 命名规范: 
     * eg `<二级域>.<KEY>`
     */

    // 系统配置 SYS
    // 点餐 POS
    // 结算 SETTLEMENT
    // 叫号 CALL
    // 接单 ACCEPT
    // 外卖 TAKEOUT
    // 排队 QUEUE
    // 订单 ORDER
    // 商品 GOOD
    // 菜单 MENU
    // 库存 INVENTORY
    // 桌台 TABLE
    // 报表 REPORT
    // 税 TAX
    // 会员 MEMBER
    // 设备 IOT
    // 支付 PAYMENT
    // 经营设置 SETTING
    // 语音 VOICE
    // 账号 ACCOUNT
    // 国际化 I18N

    return {
        // Cashier
        // layout size of cashier 收银台布局尺寸
        UI_LAYOUT_TYPE: 'NORM',  // NORM（标准）BIG（大图）
        // layout type of dining table selection 桌台选择视图 v2.4.0
        UI_DINING_LAYOUT_TYPE: 'LIST', // LIST（列表模式） CANVAS（画布模式）

        // show product name in product card 是否显示商品卡片商品名称
        UI_PRODUCT_CARD_NAME_SHOW: true,
        // show product pirce in product card 是否显示商品卡片商品价格
        UI_PRODUCT_CARD_PRICE_SHOW: true,
        // show product picture in product card 是否显示商品卡片商品图片
        UI_PRODUCT_CARD_PICTURE_SHOW: true,
        // show product code in product card 是否显示商品卡片商品码
        UI_PRODUCT_CARD_CODE_SHOW: false,
        // show product count in product card 是否显示商品卡片商品数量
        UI_PRODUCT_CARD_COUNT_SHOW: true,
        // show package tag in product card 是否显示商品卡片套餐标记
        UI_PRODUCT_CARD_PACKAGE_SHOW: true,

        /**** Cashier cart ****/
        // business type 营业方式（正快餐设置）
        BUSINESS_TYPE: 'ALL',  // SETTLE_FIRST(先结账后用餐) | ORDER_FIRST(先用餐后结账) | ALL(全部)
        // auto merge same product to one item in cart 是否菜品自动合并
        PRODUCT_ITEM_AUTO_MERGE_ENABLE: false,
        // support custom price input 是否支持商品改价
        CUSTOM_PRICE_SUPPORT: true,
        // support temporary goods 是否支持临时商品
        TEMPORARY_GOODS_SUPPORT: true,

        /**** Cashier settlement ****/

        // enable split pay 是否启用拆分支付
        SETTLEMENT_SPLIT_PAY_ENABLE: false,
        // enable split order 是否启用拆分账单
        SPLIT_ORDER_ENABLE: false,
        // auto print ticket after settlement 是否结账后默认打印结账单
        SETTLEMENT_AUTO_PRINT_BILL_TICKET_ENABLE: true,
        // print making ticket manually under SETTLE_FIRST business type 是否快餐手动打印制作单
        SETTLEMENT_MANUAL_PRINT_MAKING_TICKET_ENABLE: false,
        // whether auto fill amount on pay method of cash 是否现金支付默认回填输入框
        SETTLEMENT_CASH_AUTO_FILL_ENABLE: true,
        // quick amount input trigger full coverage 是否现金常用支付金额覆盖模式
        SETTLEMENT_CASH_AMOUNT_COVERAGE_ENABLE: true,

        /**** Cashier order accept ****/
        // enable D-store order 是否启用D-store扫码点餐
        D_STORE_QR_ORDER_ENABLE: false,
        // enable D-store order auto accept 是否启用D-store自动接单
        D_STORE_ORDER_AUTO_ACCEPT_ENABLE: false,
        // enable POS qr order 是否启用POS扫码点餐
        POS_QR_ORDER_ENABLE: true,
        // enable POS qr order auto accept 是否启用POS扫码点餐自动接单
        POS_QR_ORDER_AUTO_ACCEPT_ENABLE: true,
        //enable store qr order 是否启用门店扫码点餐
        STORE_QR_ORDER_ENABLE: true,
        //enable store qr order auto accept 是否启用门店扫码点餐自动接单
        STORE_QR_ORDER_AUTO_ACCEPT_ENABLE: true,

        /** inventory */
        // enable POS warning when lack of inventory 负库存量警告，当启用此功能时，Pos和扫码点餐超卖时，需要二次确认并再次下单或结账
        LOW_INVENTORY_WARNING_ENABLE: false,

        /** Ads **/
        // enable sencondary screen Ads 是否开启副屏广告
        SECONDARY_SCREEN_AD_ENABLE: false,

        /** Scan to order **/
        // whether enable POS scan to order 是否启用POS扫码点餐 (注意不是外部渠道扫码点餐!)
        POS_SCAN_ORDER_ENABLE: true,
        //打印预结单不允许退菜
        PRE_PRINT_NO_REFUND_CAT_ENABLE: false,

        // color of goods 商品图形定义
        ITEM_COLOR_MAP: {
            red: '#CE3E33',
            orange: '#FF6929',
            yellow: '#FF9C00',
            green: '#2E935A',
            blue: '#224FC2',
            cyan: '#00B3EC',
            purple: '#8F23C2',
        },
        // shape image of goods 商品图形定义 （暂时注释，等能力支持后替换下面的base64）
        // ITEM_SHAPE_MAP: {
        //     cat: 'https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502207unf59uwgheszjjl282v3wxag.png', // item_shape_cat.png
        //     rabbit: 'https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250220cm2e9adxiwjhtj9ymwv6b1b4c.png', // item_shape_rabbit.png
        //     bear: 'https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250220j74bq95w7bfw209rkhaqiye8m.png', // item_shape_bear.png
        //     elephant: 'https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec25022048dkau62favu0seyasbcs33rl.png',  // item_shape_elephant.png
        //     deer: 'https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250220vw5sx35nkkguya4wp07jugcrh.png', // item_shape_deer.png
        //     cattle: 'https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250220m734m4hbcbv1ix8hwqx4i81ng.png', // item_shape_cattle.png
        //     butterfly: 'https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250220h23q1g5cwibd1t19r94np87kc.png',  // item_shape_butterfly.png
        // },
        ITEM_SHAPE_MAP: {
            cat: 'data:image/png;base64,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', // item_shape_cat.png
            rabbit: 'data:image/png;base64,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', // item_shape_rabbit.png
            bear: 'data:image/png;base64,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', // item_shape_bear.png
            elephant: 'data:image/png;base64,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',  // item_shape_elephant.png
            deer: 'data:image/png;base64,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', // item_shape_deer.png
            cattle: 'data:image/png;base64,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', // item_shape_cattle.png
            butterfly: 'data:image/png;base64,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',  // item_shape_butterfly.png
        },
        // background image of goods 商品背景图定义
        ITEM_BG_MAP: {
            "default": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502208y1urhu5jna8k4fgbitrswyqs.png", // item_bg_placehold.png
            // rabbit
            "rabbit#CE3E33": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221p67jg7xezmix7sd524yndvsq7.png", // item_bg_rabbit_red.png
            "rabbit#FF6929": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502210rc6crtasn4rxdsd7zpdw37pp.png", // item_bg_rabbit_orange.png
            "rabbit#FF9C00": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221vunh7mpg7c94q22tmv29sk71t.png", // item_bg_rabbit_yellow.png
            "rabbit#2E935A": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221g7lentwqbjyj7q3ze40sg9c7r.png", // item_bg_rabbit_green.png
            "rabbit#00B3EC": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221wijp94wvampn2047w4fim65sq.png", // item_bg_rabbit_blue.png
            "rabbit#224FC2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221bwqwnsbtegg07m88gt6pctfq3.png", // item_bg_rabbit_cyan.png
            "rabbit#8F23C2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502218s3ivgxjbwhzfeu40apvt5a6r.png", // item_bg_rabbit_purple.png
            // bear
            "bear#CE3E33": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221bwzqvrw8e4hez8v1uelqlrxhc.png", // item_bg_bear_red.png
            "bear#FF6929": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502212lcbs1k4clr0h39lt7hqiu6bn.png", // item_bg_bear_orange.png
            "bear#FF9C00": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221a6unmqp4bk08bjzfyasux3nsd.png", // item_bg_bear_yellow.png
            "bear#2E935A": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec25022173m4f0wx4d13qarwzs6gd4uhs.png", // item_bg_bear_green.png
            "bear#00B3EC": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221hj90k3n3x4lgbtpysyxkvhj8d.png", // item_bg_bear_blue.png
            "bear#224FC2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502218i1q53htzk7sym3t8wey24jad.png", // item_bg_bear_cyan.png
            "bear#8F23C2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502219x0amkujq2v9s9cx86ggczp66.png", // item_bg_bear_purple.png
            // elephant
            "elephant#CE3E33": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221are83gmx3pj51lmsgzskzge25.png", // item_bg_elephant_red.png
            "elephant#FF6929": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221njl5z348dpkypqha63v65gm8j.png", // item_bg_elephant_orange.png
            "elephant#FF9C00": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221yk6i5d0tudmlqnwmguzq5vy88.png", // item_bg_elephant_yellow.png
            "elephant#2E935A": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221fc4em96favajqfixthsvp4vxg.png", // item_bg_elephant_green.png
            "elephant#00B3EC": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502211w6y29fj1y1577vmj03h178pn.png", // item_bg_elephant_blue.png
            "elephant#224FC2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221xgn8eevx8m2z286qxdbh4vhqs.png", // item_bg_elephant_cyan.png
            "elephant#8F23C2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221buyaymdiwfm79stjzhyycx14l.png", // item_bg_elephant_purple.png
            // cat
            "cat#CE3E33": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221qxpjcw5uppl07yty0vsz63l0f.png", // item_bg_cat_red.png
            "cat#FF6929": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502211wgcefpw0619bjgysblwnmnz7.png", // item_bg_cat_orange.png
            "cat#FF9C00": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502218azeucpmlgt231hd3kw9zkvs9.png", // item_bg_cat_yellow.png
            "cat#2E935A": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221ad1ib35sqv4fxzwsmynp583yr.png", // item_bg_cat_green.png
            "cat#00B3EC": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221hrj4b9u5adep0dmm9cavbupdu.png", // item_bg_cat_blue.png
            "cat#224FC2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221asdpf8cdnpvg6hj79i7m5f9r7.png", // item_bg_cat_cyan.png
            "cat#8F23C2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221wq2j92fp3yi15fem7kag7dd3f.png", // item_bg_cat_purple.png
            // deer
            "deer#CE3E33": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221eu2uure6vwqjk9j6y9za6pg2d.png", // item_bg_deer_red.png
            "deer#FF6929": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502218gzxby6slhptzr35q2sjpktc3.png", // item_bg_deer_orange.png
            "deer#FF9C00": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221wmrpz510ubnvqpv9s0tzvnmbj.png", // item_bg_deer_yellow.png
            "deer#2E935A": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221uz5vxy8iqqirrvqpcuczbnh3j.png", // item_bg_deer_green.png
            "deer#00B3EC": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221z2xkkyfdr6bvwdhi9vxghrn15.png", // item_bg_deer_blue.png
            "deer#224FC2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221w35sptuzd6zf6gq0sxr1lkxn9.png", // item_bg_deer_cyan.png
            "deer#8F23C2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221l3fwr62tihzq2ua244aftmhur.png", // item_bg_deer_purple.png
            // cattle
            "cattle#CE3E33": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221w2gr9mvnhwbx39b6qn68nd7gs.png", // item_bg_cattle_red.png
            "cattle#FF6929": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221b2xq5mai4kd2m7hl67xswcfpr.png", // item_bg_cattle_orange.png
            "cattle#FF9C00": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec25022128f38a31ebx3zgjdjfb4z5lju.png", // item_bg_cattle_yellow.png
            "cattle#2E935A": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221ywy049zhzs98536prj388cr25.png", // item_bg_cattle_green.png
            "cattle#00B3EC": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221kvkj8lnxx2jhffvcbe29va7dd.png", // item_bg_cattle_blue.png
            "cattle#224FC2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec25022197rdsbkn95e0zvj57yzp6kg6n.png", // item_bg_cattle_cyan.png
            "cattle#8F23C2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502214expzvpddek87mwnbaahiaq9l.png", // item_bg_cattle_purple.png
            // butterfly
            "butterfly#CE3E33": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221l6h8nttq7nznj4mnej10kcz34.png", // item_bg_butterfly_red.png
            "butterfly#FF6929": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502216zhhrqvszies63snq9gcndrvf.png", // item_bg_butterfly_orange.png
            "butterfly#FF9C00": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502218g8bal52d4lu55h6aavdcqqep.png", // item_bg_butterfly_yellow.png
            "butterfly#2E935A": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221um467y1hdi6pk2z9sr7qh91mt.png", // item_bg_butterfly_green.png
            "butterfly#00B3EC": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec2502215pg36asxslw4sheafg8c1zz3m.png", // item_bg_butterfly_blue.png
            "butterfly#224FC2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221wldxhh8lb4z156nbbbdpa2cer.png", // item_bg_butterfly_cyan.png
            "butterfly#8F23C2": "https://cdn.biot-apps.com/resource/8376e0598fc948b18429e12f3708414e/rec250221skm8pcwp410y9cnwa9zzfybw3.png", // item_bg_butterfly_purple.png
        },

        // 外部渠道菜单
        // External channel menu.
        EXTERNAL_CHANNEL_MENU_ENABLE: false,

        // IoT
        SUPPORT_PRINTER_MODEL: [
            "XP-Q80A",
            "XP-58IIA",
            "XP-Q304F",
            "XP-365B",
            "GP-2120TU",
            "Cloud-58",
            "Cloud-80",
            "Standard-58",
            "Standard-80",
        ],
        LABEL_PRINTER_PAPER_SIZE: [[60, 40], [60, 30], [40, 30]],

        // whether enable member module 是否启用会员
        MEMBER_ENABLE: false,
        // whether support member deposit 是否支持会员储值
        MEMBER_DEPOSIT_SUPPORT: true,
        // whether support member promotion 是否支持会员营销 [pending]
        MEMBER_PROMOTION_SUPPORT: true,
        // whether support member deposit whene offline 离线是否支持会员充值 crm_deposit_config
        MEMBER_DEPOSIT_OFFLINE_SUPPORT: false,

        // 抹零规则列表（由后端或业务逻辑填充）
        "ROUNDING_RULES": [],

        // 抹零规则枚举值映射
        "RoundingRuleType": {
            "NO_ROUNDING": "NO_ROUNDING",      // 无抹零
            "UP": "ROUND_UP",                  // 始终向上
            "DOWN": "ROUND_DOWN",              // 始终向下
            "MID_UP": "ROUND_NEAREST_UP",      // 舍入到最接近的值（中值向上）
            "MID_DOWN": "ROUND_NEAREST_DOWN",  // 舍入到最接近的值（中值向下）
            "NEAREST": "ROUND_NEAREST"         // 舍入到最接近的值
        },

        // 抹零配置描述文本：按「精度」->「规则类型」->「区间映射」三层结构组织
        // 每条记录含 from（起始分段）、to（结束分段）、round（舍入目标值）
        "ROUNDING_RULE_DESC": {

            // ── 精度：0.01（分）──────────────────────────────
            "0.01": {
                "NO_ROUNDING": []                // 无抹零，不做任何处理
            },

            // ── 精度：0.05（5分）────────────────────────────
            "0.05": {
                "ROUND_NEAREST": [              // 四舍五入到最近0.05
                    { "from": "0.01", "to": "0.02", "round": "0.00" },
                    { "from": "0.03", "to": "0.07", "round": "0.05" },
                    { "from": "0.08", "to": "0.09", "round": "0.10" }
                ],
                "ROUND_UP": [                   // 向上取整到0.05
                    { "from": "0.01", "to": "0.04", "round": "0.05" },
                    { "from": "0.06", "to": "0.09", "round": "0.10" }
                ],
                "ROUND_DOWN": [                 // 向下取整到0.05
                    { "from": "0.01", "to": "0.04", "round": "0.00" },
                    { "from": "0.06", "to": "0.09", "round": "0.50" }
                ]
            },

            // ── 精度：0.10（1角）────────────────────────────
            "0.10": {
                "ROUND_NEAREST_UP": [          // 四舍五入（中值向上）到0.10
                    { "from": "0.01", "to": "0.04", "round": "0.00" },
                    { "from": "0.05", "to": "0.09", "round": "0.10" }
                ],
                "ROUND_NEAREST_DOWN": [        // 四舍五入（中值向下）到0.10
                    { "from": "0.01", "to": "0.05", "round": "0.00" },
                    { "from": "0.06", "to": "0.09", "round": "0.10" }
                ],
                "ROUND_UP": [                  // 向上取整到0.10
                    { "from": "0.01", "to": "0.09", "round": "0.10" }
                ],
                "ROUND_DOWN": [                // 向下取整到0.10
                    { "from": "0.01", "to": "0.09", "round": "0.00" }
                ]
            },

            // ── 精度：0.50（5角）────────────────────────────
            "0.50": {
                "ROUND_NEAREST_UP": [          // 四舍五入（中值向上）到0.50
                    { "from": "0.01", "to": "0.24", "round": "0.00" },
                    { "from": "0.25", "to": "0.74", "round": "0.50" },
                    { "from": "0.75", "to": "0.99", "round": "1.00" }
                ],
                "ROUND_NEAREST_DOWN": [        // 四舍五入（中值向下）到0.50
                    { "from": "0.01", "to": "0.25", "round": "0.00" },
                    { "from": "0.26", "to": "0.75", "round": "0.50" },
                    { "from": "0.76", "to": "0.99", "round": "1.00" }
                ],
                "ROUND_UP": [                  // 向上取整到0.50
                    { "from": "0.01", "to": "0.49", "round": "0.50" },
                    { "from": "0.51", "to": "0.99", "round": "1.00" }
                ],
                "ROUND_DOWN": [                // 向下取整到0.50
                    { "from": "0.01", "to": "0.49", "round": "0.00" },
                    { "from": "0.51", "to": "0.99", "round": "0.50" }
                ]
            },

            // ── 精度：1.00（1元）────────────────────────────
            "1.00": {
                "ROUND_NEAREST_UP": [          // 四舍五入（中值向上）到1元
                    { "from": "0.01", "to": "0.49", "round": "0.00" },
                    { "from": "0.50", "to": "0.99", "round": "1.00" }
                ],
                "ROUND_NEAREST_DOWN": [        // 四舍五入（中值向下）到1元
                    { "from": "0.01", "to": "0.50", "round": "0.00" },
                    { "from": "0.51", "to": "0.99", "round": "1.00" }
                ],
                "ROUND_UP": [                  // 向上取整到1元
                    { "from": "0.01", "to": "0.99", "round": "1.00" }
                ],
                "ROUND_DOWN": [                // 向下取整到1元
                    { "from": "0.01", "to": "0.99", "round": "0.00" }
                ]
            },

            // ── 精度：1（整数位，无小数）────────────────────
            "1": {
                "NO_ROUNDING": []              // 无抹零
            },

            // ── 精度：5──────────────────────────────────────
            "5": {
                "ROUND_NEAREST": [             // 四舍五入到最近5
                    { "from": "1", "to": "2", "round": "0" },
                    { "from": "3", "to": "7", "round": "5" },
                    { "from": "8", "to": "9", "round": "10" }
                ],
                "ROUND_UP": [                  // 向上取整到5
                    { "from": "1", "to": "4", "round": "5" },
                    { "from": "6", "to": "9", "round": "10" }
                ],
                "ROUND_DOWN": [                // 向下取整到5
                    { "from": "1", "to": "4", "round": "0" },
                    { "from": "6", "to": "9", "round": "5" }
                ]
            },

            // ── 精度：10─────────────────────────────────────
            "10": {
                "ROUND_NEAREST_UP": [          // 四舍五入（中值向上）到10
                    { "from": "1", "to": "4", "round": "0" },
                    { "from": "5", "to": "9", "round": "10" }
                ],
                "ROUND_NEAREST_DOWN": [        // 四舍五入（中值向下）到10
                    { "from": "1", "to": "5", "round": "0" },
                    { "from": "6", "to": "9", "round": "10" }
                ],
                "ROUND_UP": [                  // 向上取整到10
                    { "from": "1", "to": "9", "round": "10" }
                ],
                "ROUND_DOWN": [                // 向下取整到10
                    { "from": "1", "to": "9", "round": "0" }
                ]
            },

            // ── 精度：50─────────────────────────────────────
            "50": {
                "ROUND_NEAREST_UP": [          // 四舍五入（中值向上）到50
                    { "from": "1", "to": "24", "round": "0" },
                    { "from": "25", "to": "74", "round": "50" },
                    { "from": "75", "to": "99", "round": "100" }
                ],
                "ROUND_NEAREST_DOWN": [        // 四舍五入（中值向下）到50
                    { "from": "1", "to": "25", "round": "0" },
                    { "from": "26", "to": "75", "round": "50" },
                    { "from": "76", "to": "99", "round": "100" }
                ],
                "ROUND_UP": [                  // 向上取整到50
                    { "from": "1", "to": "49", "round": "50" },
                    { "from": "51", "to": "99", "round": "100" }
                ],
                "ROUND_DOWN": [                // 向下取整到50
                    { "from": "1", "to": "49", "round": "0" },
                    { "from": "50", "to": "99", "round": "50" }
                ]
            },

            // ── 精度：100────────────────────────────────────
            "100": {
                "ROUND_NEAREST_UP": [          // 四舍五入（中值向上）到100
                    { "from": "1", "to": "49", "round": "0" },
                    { "from": "50", "to": "99", "round": "100" }
                ],
                "ROUND_NEAREST_DOWN": [        // 四舍五入（中值向下）到100
                    { "from": "1", "to": "50", "round": "0" },
                    { "from": "51", "to": "99", "round": "100" }
                ],
                "ROUND_UP": [                  // 向上取整到100
                    { "from": "1", "to": "99", "round": "100" }
                ],
                "ROUND_DOWN": [                // 向下取整到100
                    { "from": "1", "to": "99", "round": "0" }
                ]
            },

            // ── 精度：1000───────────────────────────────────
            "1000": {
                "ROUND_NEAREST_UP": [          // 四舍五入（中值向上）到1000
                    { "from": "1", "to": "499", "round": "0" },
                    { "from": "500", "to": "999", "round": "1000" }
                ],
                "ROUND_NEAREST_DOWN": [        // 四舍五入（中值向下）到1000
                    { "from": "1", "to": "500", "round": "0" },
                    { "from": "501", "to": "999", "round": "1000" }
                ],
                "ROUND_UP": [                  // 向上取整到1000
                    { "from": "1", "to": "999", "round": "1000" }
                ],
                "ROUND_DOWN": [                // 向下取整到1000
                    { "from": "1", "to": "999", "round": "0" }
                ]
            }
        },

        // 抹零规则参数配置（由业务动态填充）
        "ROUNDING_PARAM_CONFIG": {},

        // 自定义支付方式随机图标池
        "PAY_METHOD_RANDOM_ICON": [
            "https://cdn.biot-apps.com/resource/74564fa1f4e344ca9765bd381f3daabb/rec230221idf2463tb1r085zt8umn0sgzh.png",
            "https://cdn.biot-apps.com/resource/74564fa1f4e344ca9765bd381f3daabb/rec2302213v4suv9hdyjqnx0klwjkjxnvr.png",
            "https://cdn.biot-apps.com/resource/74564fa1f4e344ca9765bd381f3daabb/rec230221839m5rgx4dquj8lxsugdtsxb0.png",
            "https://cdn.biot-apps.com/resource/74564fa1f4e344ca9765bd381f3daabb/rec23022182alt37medripmakvsprsb0uk.png"
        ],

        // 支付方式列表（由业务动态填充）
        "PAY_METHOD_LIST": [],

        // 是否启用小费功能
        "TIP_ENABLE": false,

        // 快捷小费配置（由业务动态填充）
        "TIP_SHORTCUT_INFO": {},

        // 在线支付类型标识列表
        "ONLINE_PAYMENT_TYPE": ["CARD", "QR", "ONLINE"],

        // whether enable pickup module 是否启用叫号取餐
        PICKUP_ENABLE: true,
        // max serial number
        MAX_SERIAL_NUMBER: 9999,
        // min serial number 
        MIN_SERIAL_NUMBER: 1,
        /**
         * Supported order channels for number calling pickup
         * channel: string
         * channelName: string;
         * enabled: boolean;
         * type: string;
         * iconUrl: string;
         */
        NUMBER_CALLING_ORDERCHANNELS: [],
        // auto meal delivery on number calling pickup
        AUTO_MEALDELIVERY_ENABLE: false,

        // whether enable Queue module 是否启用排队叫号
        QUEUE_ENABLE: true,
        // table settings for queue 排队桌台设置
        QUEUE_TABLE_LIST: [],

        // ----
        // store avatar using for ticket 店铺头像
        STORE_AVATAR: "",
        STORE_AVATAR_BASE64: "",
        APP_ONLINE_PAYMENT: ['PP', 'TMN', 'QRIS'],
        // app logo using for brand（size limit <= 256*256） 应用logo，尺寸不大于256*256
        APP_LOGO: max.envVar.getValue('SYS_APP_LOGO'),
        // dark of app logo  for print 
        APP_LOGO_DARK: max.envVar.getValue('SYS_APP_LOGO_OFFLINE'),
        // app name using for brand 应用名，不需要国际化
        APP_NAME: max.envVar.getValue('SYS_APP_NAME'),
        // desktop default subScreen background image
        STORE_LOGIN_AD_IMG: max.envVar.getValue('SYS_LOGIN_AD_IMG'),
        STORE_SUBSCREEN_AD_IMG: max.envVar.getValue('SYS_SUBSCREEN_AD_IMG'),
        STORE_SUBSCREEN_PAY_AD_IMG: max.envVar.getValue('SYS_SUBSCREEN_PAY_AD_IMG'),
        D3MINI_SUBSCREEN_PAY_AD_IMG: max.envVar.getValue('SYS_SUBSCREEN_PAY_AD_IMG_MINI'),
        // store cascade address enable  店铺级联地址是否开启
        STORE_CASCADE_ADDRESS_ENABLE: true,
        // store cascade address required  店铺级联地址是否必须
        STORE_CASCADE_ADDRESS_REQUIRED: true,
        // store business type 店铺业态是否必须
        STORE_BUSINESS_TYPE_REQUIRED: true,
        // ----

        // locale language
        LOCALE_LANGUAGE_MAP: {
            "zh-CN": "中文(简体)",
            "en-US": "English",
            "zh-TW": "中文(繁體)",
            "zh-HK": "中文(香港)",
            "ja": "日本語",
            "es": "Español",
            "fr": "Français",
            "ar": "العربية",
            "pt": "português",
            "bn": "বাংলা",
            "ru": "русский",
            "de": "Deutsch",
            "ko": "한국어",
            "it": "italiano",
            "tr": "Türkçe",
            "id": "Indonesia",
            "ro": "română",
            "nl": "Nederlands",
            "el": "Ελληνικά",
            "pl": "polski",
            "sv": "svenska",
            "hu": "magyar",
            "uk": "українська",
            "da": "dansk",
            "no": "norsk",
            "th": "ไทย",
            "sq": "shqiptar",
            "fi": "suomi",
            "sk": "slovenčina",
            "sl": "slovenščina",
            "cs": "čeština",
            "rs": "српски",
            "hr": "hrvatski",
            "et": "eesti",
            "lt": "lietuvių",
            "is": "íslenska",
            "lv": "latviešu",
            "bs": "bosanski",
            "sh": "srpskohrvatski",
            "mk": "македонски",
            "az": "Azərbaycan dili",
            "ka": "ქართული",
            "am": "አማር",
            "he": "עברית",
            "sw": "Kiswahili",
            "ta": "தமிழ்",
            "fa": "فارسی",
            "pa": "پنجابی",
            "ml": "മലയാളം",
            "kn": "ಕನ್ನಡ",
            "te": "తెలుగు",
            "vi": "Tiếng Việt",
            "km": "ភាសាខ្មែរ",
            "my": "မြန်မာ",
            "zsm": "Bahasa Malaysia",
            "ms": "Bahasa Malaysia"
        },

        // locale date
        FORMAT_DATE: "YYYY-MM-DD",
        FORMAT_DATE_SHORT: "MM-DD",
        FORMAT_TIME: "HH:mm:ss",
        FORMAT_TIME_SHORT: "HH:mm",
        FORMAT_DATE_TIME: "YYYY-MM-DD HH:mm:ss",
        FORMAT_DATE_TIME_SHORT: "YYYY-MM-DD HH:mm",
        FORMAT_DATE_SHORT_TIME_SHORT: "MM-DD HH:mm",

        /**
         * some examples:
         * zh-CN:
         *      TELEPHONE_VALIDATOR: /^(0\d{2,3})[-]?\d{7,8}$/,
         *      CELLPHONE_VALIDATOR: /^1[3-9]\d{9}$/,
         * zh-HK:
         *      TELEPHONE_VALIDATOR: /^[23]\d{7}$/,
         *      CELLPHONE_VALIDATOR: /^[5689]\d{7}$/,
         * th:
         *      TELEPHONE_VALIDATOR: /^0[23]\d{7}$/,
         *      CELLPHONE_VALIDATOR: /^0[689]\d{8}$/,
         */
        // locale phone validation
        TELEPHONE_VALIDATOR: '', // 固话校验
        CELLPHONE_VALIDATOR: '', // 手机校验

        // max money tier
        MAX_AMOUNT_TIER_1: 9999999999, // 第一档最大金额（菜品）
        MAX_AMOUNT_TIER_2: 9999999999, // 第二档最大金额(外卖渠道)
        MAX_AMOUNT_TIER_3: 999999999, // 第三档最大金额（做法、小料）

        DECIMAL_PLACES: 2,

        /**
         * some regular expressions 
         */
        // DELIVERY_CHANNEL_MONEY_REGULAR: /^(?!$)(?=[0-9]{1,7}(?:\.[0-9]{0,2})?$)^\d{1,7}(?:\.\d{0,2})?$/, // 外卖渠道金额正则
        // POS_MENU_MONEY_REGULAR: /^(?!$)(?=[0-9]{1,8}(?:\.[0-9]{0,2})?$)^\d{1,8}(?:\.\d{0,2})?$/, // pos 菜品金额正则
        DELIVERY_CHANNEL_MONEY_REGULAR: /^\d{1,10}$/, // 外卖渠道金额正则
        POS_MENU_MONEY_REGULAR: /^\d{1,10}$/, // pos 菜品金额正则

        // whether enable Takeout module 是否启用外卖
        TAKEOUT_ENABLE: true,

        // whether enable tax module 是否启用税费
        TAX_ENABLE: true,
        // tax list 税目列表
        TAX_LIST: [],
        // fee list 增值费列表
        FEE_LIST: [],
        // product price include tax 商品价格含税
        PRODUCT_PRICE_INCLUDE_TAX_ENABLE: false,
        // tax tag 税目 标识
        TAX_TAG: "VAT",
        // 菜单佣金
        MENU_FEE_LIST: [],
        // 菜单佣金税费
        MENU_TAX_LIST: [],
        // taxation mode 计税模式
        TAXATION_MODE: "TAX_INCLUDED", // TAX_INCLUDED(默认：商品价格含税) ｜ BEFORE_DISCOUNT(折前计税) ｜ AFTER_DISCOUNT(折后计税)

        // [local] default voice language
        AIVOICE_DEFAULT_LANG: max.envVar.getValue('SYS_AIVOICE_DEFAULT_LANG'),
        // [local] default voice language is used by default when language is not supported
        AIVOICE_DEFAULT_LANG_EFFECT_AUTOLY: true,
        // [local] remedy voice assets 兜底语音资源定义(只有平台语音不支持的才进这里)
        REMEDY_VOICE_ASSETS: {
            id: {
                dir: "https://cdn.sunmi.com/public/generalfile/max_audio_raw/id/",
                extType: "mp3", // 语音文件后缀，请保证所有文件使用统一的后缀格式
                charFiles: Array.from("0123456789abcdefghijklmnopqrstuvwxyz"), // 字符语音文件名称
                phraseFiles: [
                    // 请{num}到前台，准备就餐
                    "queue_called_prefix", // 排队叫号到号：请
                    "queue_called_suffix", // 排队叫号到号：到前台，准备就餐
                    // 请{num}到取餐口取餐
                    "pickup_called_prefix", // 叫号取餐到号：请
                    "pickup_called_suffix", // 叫号取餐到号：到取餐口取餐
                    // 您有新的收款
                    "receive_money", // 收款提示
                    // 您有新的扫码点餐订单
                    "receive_pos_order", // pos接单提示
                    // 您有新的外卖订单
                    "receive_takeout_order", // 外卖接单提示
                ], // 短语语音文件名称，以自定义语音形态使用
            },
            km: {
                dir: "https://cdn.sunmi.com/public/generalfile/max_audio_raw/km/",
                extType: "mp3",
                charFiles: Array.from("0123456789abcdefghijklmnopqrstuvwxyz"),
                phraseFiles: [
                    "queue_called_prefix",
                    "queue_called_suffix",
                    "pickup_called_prefix",
                    "pickup_called_suffix",
                    "receive_money",
                    "receive_pos_order",
                    "receive_takeout_order",
                ],
            },
        },
        // [local] custom voice assets 应用通用的自定义语音
        CUSTOM_VOICE_ASSETS: [
            {
                key: "paymentReminder",
                assets: {
                    'zh-CN': {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/paymentReminder.mp3",
                        name: "paymentReminder.mp3"
                    },
                    'en-US': {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/paymentReminder.mp3",
                        name: "paymentReminder.mp3"
                    },
                    th: {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/paymentReminder.mp3",
                        name: "paymentReminder.mp3"
                    },
                    my: {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/paymentReminder.mp3",
                        name: "paymentReminder.mp3"
                    },
                    id: {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/paymentReminder.mp3",
                        name: "paymentReminder.mp3"
                    },
                    km: {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/paymentReminder.mp3",
                        name: "paymentReminder.mp3"
                    }
                }
            },
            {
                key: "takeawayReminder",
                assets: {
                    'zh-CN': {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/grab-sonic-logo.mp3",
                        name: "takeawayReminder_grab.mp3"
                    },
                    'en-US': {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/grab-sonic-logo.mp3",
                        name: "takeawayReminder_grab.mp3"
                    },
                    th: {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/grab-sonic-logo.mp3",
                        name: "takeawayReminder_grab.mp3"
                    },
                    my: {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/grab-sonic-logo.mp3",
                        name: "takeawayReminder_grab.mp3"
                    },
                    id: {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/grab-sonic-logo.mp3",
                        name: "takeawayReminder_grab.mp3"
                    },
                    km: {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/grab-sonic-logo.mp3",
                        name: "takeawayReminder_grab.mp3"
                    },
                }
            }
        ],

        /**
         * [cloud] voice for payment result 扫码支付语音
         */
        // enable 是否启用
        SCAN_PAYMENT_ENABLE: true,
        // unable beep 是否启用蜂鸣
        SCAN_PAYMENT_BEEP_ENABLE: true,
        // unable text 是否播报文字内容
        SCAN_PAYMENT_TEXT_ENABLE: true,

        /**
         * [cloud] voice for new takeout order 外卖接单语音
         */
        // enable 是否启用
        TACKOUT_ORDER_ENABLE: true,
        // unable beep 是否启用蜂鸣
        TACKOUT_ORDER_BEEP_ENABLE: true,
        // unable text 是否播报文字内容
        TACKOUT_ORDER_TEXT_ENABLE: true,

        /**
         * [cloud] voice for new qr order 扫码点餐语音
         */
        // enable 是否启用
        SCAN_ORDER_ENABLE: true,
        // unable beep 是否启用蜂鸣
        SCAN_ORDER_BEEP_ENABLE: true,
        // unable text 是否播报文字内容
        SCAN_ORDER_TEXT_ENABLE: true,

        /**
         * [cloud] voice for new channel qr order 渠道扫码点餐语音
        */
        // enable 是否启用
        CHANNEL_SCAN_ORDER_ENABLE: true,
        // unable beep 是否启用蜂鸣
        CHANNEL_SCAN_ORDER_BEEP_ENABLE: true,
        // unable text 是否播报文字内容
        CHANNEL_SCAN_ORDER_TEXT_ENABLE: true,

        // /**
        // * [cloud] voice for new channel qr order 自助点餐语音
        // */
        // // enable 是否启用
        // KIOSK_ORDER_ENABLE: true,
        // // unable beep 是否启用蜂鸣
        // KIOSK_ORDER_BEEP_ENABLE: true,
        // // unable text 是否播报文字内容
        // KIOSK_ORDER_TEXT_ENABLE: true,
    }
}