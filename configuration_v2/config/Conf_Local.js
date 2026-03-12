/**
 * Config for Local (Device, Terminal) Modules 本地（设备、终端）模块配置
 * 
 * Name rules 命名规范:
 * 例如 `<二级域>.<前缀>_<名词>_<状态词>`
 * 
 * 支持模块列表（Module List）:
 * - 系统配置 SYSTEM (SYS)
 * - 点餐 CHECKOUT (POS)
 * - 结算 SETTLEMENT
 * - 叫号 CALL
 * - 接单 ACCEPT
 * - 外卖 TAKEOUT
 * - 排队 QUEUE
 * - 订单 ORDER
 * - 商品 GOOD
 * - 菜单 MENU
 * - 库存 INVENTORY
 * - 桌台 TABLE
 * - 报表 REPORT
 * - 税 TAX
 * - 会员 MEMBER
 * - 设备 IOT
 * - 支付 PAYMENT
 * - 经营设置 SETTING
 * - 语音 VOICE
 * - 账号 ACCOUNT
 * - 国际化 I18N
 */
function Conf_Local() {
    return {
        /**** Cashier UI  ****/
        // layout display type of cashier 收银台布局形式
        "CHECKOUT.UI_LAYOUT_TYPE": 'GRAPH',  // GRAPH（卡片）LIST（列表）
        // layout type of dining table selection 桌台选择视图 v2.4.0
        "CHECKOUT.UI_DINING_LAYOUT_TYPE": 'LIST', // LIST（列表模式） CANVAS（画布模式）

        // show product name in product card 是否显示商品卡片商品名称
        "CHECKOUT.UI_PRODUCT_CARD_NAME_SHOW": true,
        // show product pirce in product card 是否显示商品卡片商品价格
        "CHECKOUT.UI_PRODUCT_CARD_PRICE_SHOW": true,
        // show product picture in product card 是否显示商品卡片商品图片
        "CHECKOUT.UI_PRODUCT_CARD_PICTURE_SHOW": true,
        // show product code in product card 是否显示商品卡片商品码
        "CHECKOUT.UI_PRODUCT_CARD_CODE_SHOW": false,
        // show product count in product card 是否显示商品卡片商品数量
        "CHECKOUT.UI_PRODUCT_CARD_COUNT_SHOW": true,
        // show package tag in product card 是否显示商品卡片套餐标记
        "CHECKOUT.UI_PRODUCT_CARD_PACKAGE_SHOW": true,

        /**** Cashier cart ****/
        // business type 营业方式（正快餐设置）
        "CHECKOUT.BUSINESS_TYPE": 'ALL',  // SETTLE_FIRST(先结账后用餐) | ORDER_FIRST(先用餐后结账) | ALL(全部)
        // auto merge same product to one item in cart 是否菜品自动合并
        "CHECKOUT.PRODUCT_ITEM_AUTO_MERGE_ENABLE": false,
        // support custom price input 是否支持商品改价
        "CHECKOUT.CUSTOM_PRICE_SUPPORT": true,
        // support temporary goods 是否支持临时商品
        "CHECKOUT.TEMPORARY_GOODS_SUPPORT": true,

        /**** Cashier settlement ****/
        // enable split order settlement 是否启用拆分支付
        "CHECKOUT.SETTLEMENT_SPLIT_ORDER_ENABLE": false,
        // auto print ticket after settlement 是否结账后默认打印结账单
        "CHECKOUT.SETTLEMENT_AUTO_PRINT_BILL_TICKET_ENABLE": true,
        // print making ticket manually under SETTLE_FIRST business type 是否快餐手动打印制作单
        "CHECKOUT.SETTLEMENT_MANUAL_PRINT_MAKING_TICKET_ENABLE": false,
        // whether auto fill amount on pay method of cash 是否现金支付默认回填输入框
        "CHECKOUT.SETTLEMENT_CASH_AUTO_FILL_ENABLE": true,
        // quick amount input trigger full coverage 是否现金常用支付金额覆盖模式
        "CHECKOUT.SETTLEMENT_CASH_AMOUNT_COVERAGE_ENABLE": true,

        /**** Cashier order accept ****/
        // enable POS qr order 是否启用POS扫码点餐
        "CHECKOUT.POS_QR_ORDER_ENABLE": true,
        // enable POS qr order auto accept 是否启用POS扫码点餐自动接单
        "CHECKOUT.POS_QR_ORDER_AUTO_ACCEPT_ENABLE": true,

        /** inventory */
        // enable POS warning when lack of inventory 负库存量警告，当启用此功能时，Pos和扫码点餐超卖时，需要二次确认并再次下单或结账
        "CHECKOUT.LOW_INVENTORY_WARNING_ENABLE": false,

        /** Scan to order **/
        // whether enable POS scan to order 是否启用POS扫码点餐 (注意不是外部渠道扫码点餐!)
        "CHECKOUT.POS_SCAN_ORDER_ENABLE": true,

        "CHECKOUT.UI_CATEGORY_NAME_SHOW": true,//是否显示分类名称
        "CHECKOUT.UI_CATEGORY_COUNT_SHOW": true,//是否显示分类数量
        "CHECKOUT.UI_CATEGORY_PICTURE_SHOW": true, //是否显示分类图片

        // background image of goods 商品背景图定义
        "GOOD.ITEM_BG_MAP": {
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

        // whether enable member module 是否启用会员
        "MEMBER.MEMBER_ENABLE": false,
        // whether support member deposit whene offline 离线是否支持会员充值 crm_deposit_config
        "MEMBER.MEMBER_DEPOSIT_OFFLINE_SUPPORT": false,


        "PAYMENT.ONLINE_PAYMENT_TYPE": ["CARD", "QR", "ONLINE"],
        "PAYMENT.ECR_PAY_METHOD_NAME_LIST": ["CARD", "EWALLET", "DUIT_NOW"],
        "PAYMENT.ECR_PAY_MERCHANT_ID": "",
        "PAYMENT.PAY_ECR_CONFIG": "",
        "PAYMENT.CASH": "CASH",
        "PAYMENT.PAY_METHOD_LIST": [],
        "PAYMENT.TIP_ENABLE": false,
        "PAYMENT.TIP_SHORTCUT_INFO": {},
        "PAYMENT.ONLINEPAYMETHOD_ENUM": {
            "CARD": "CARD",
            "EWALLET": "EWALLET",
            "DUIT_NOW": "DUIT_NOW"
        },
        "PAYMENT.ONLINEPAYMETHOD_KEYS": ["CARD", "EWALLET", "DUIT_NOW"],
        "PAYMENT.ONLINEPAYMETHOD_NAMES": ["CARD", "EWALLET", "DUIT_NOW"],
        "PAYMENT.ONLINEPAY_ICON_MAP": {
            "CARD": "https://cdn.biot-apps.com/resource/357f14e8f45f4c6980d6c14515ffee9c/rec250306awaqpq9j26kxfwy3vtqhwp8gq.png",
            "EWALLET": "https://cdn.biot-apps.com/resource/357f14e8f45f4c6980d6c14515ffee9c/rec250306t1dgudzsjzcf92hqdwyv4ykmh.jpeg",
            "DUIT_NOW": "https://cdn.biot-apps.com/resource/357f14e8f45f4c6980d6c14515ffee9c/rec250306my50mytlqpw14ne95gp85tk5f.png"
        },
        "PAYMENT.ONLINEPAY_LOGO_MAP": {
            "CARD": "https://cdn.biot-apps.com/resource/357f14e8f45f4c6980d6c14515ffee9c/rec250306rnjczqpyukxvj46d7arhujlea.png",
            "EWALLET": "https://cdn.biot-apps.com/resource/357f14e8f45f4c6980d6c14515ffee9c/rec250306kfyh73lmzyua1wb9peblv3170.png",
            "DUIT_NOW": "https://cdn.biot-apps.com/resource/357f14e8f45f4c6980d6c14515ffee9c/rec250306c7suvrv4asam5t0rfh83b9az5.png"
        },
        "PAYMENT.PAY_METHOD_RANDOM_ICON": [
            "https://cdn.biot-apps.com/resource/74564fa1f4e344ca9765bd381f3daabb/rec230221idf2463tb1r085zt8umn0sgzh.png",
            "https://cdn.biot-apps.com/resource/74564fa1f4e344ca9765bd381f3daabb/rec2302213v4suv9hdyjqnx0klwjkjxnvr.png",
            "https://cdn.biot-apps.com/resource/74564fa1f4e344ca9765bd381f3daabb/rec230221839m5rgx4dquj8lxsugdtsxb0.png",
            "https://cdn.biot-apps.com/resource/74564fa1f4e344ca9765bd381f3daabb/rec23022182alt37medripmakvsprsb0uk.png"
        ],
        "PAYMENT.RoundingRuleType": {
            "NO_ROUNDING": "NO_ROUNDING",
            "UP": "ROUND_UP",
            "DOWN": "ROUND_DOWN",
            "MID_UP": "ROUND_NEAREST_UP",
            "MID_DOWN": "ROUND_NEAREST_DOWN",
            "NEAREST": "ROUND_NEAREST"
        },
        "PAYMENT.ROUNDING_RULES": [],
        "PAYMENT.ROUNDING_RULE_DESC": {
            "0.01": {
                "NO_ROUNDING": []
            },
            "0.05": {
                "ROUND_NEAREST": [
                    { "from": "0.01", "to": "0.02", "round": "0.00" },
                    { "from": "0.03", "to": "0.07", "round": "0.05" },
                    { "from": "0.08", "to": "0.09", "round": "0.10" }
                ],
                "ROUND_UP": [
                    { "from": "0.01", "to": "0.04", "round": "0.05" },
                    { "from": "0.06", "to": "0.09", "round": "0.10" }
                ],
                "ROUND_DOWN": [
                    { "from": "0.01", "to": "0.04", "round": "0.00" },
                    { "from": "0.06", "to": "0.09", "round": "0.50" }
                ]
            },
            "0.10": {
                "ROUND_NEAREST_UP": [
                    { "from": "0.01", "to": "0.04", "round": "0.00" },
                    { "from": "0.05", "to": "0.09", "round": "0.10" }
                ],
                "ROUND_NEAREST_DOWN": [
                    { "from": "0.01", "to": "0.05", "round": "0.00" },
                    { "from": "0.06", "to": "0.09", "round": "0.10" }
                ],
                "ROUND_UP": [
                    { "from": "0.01", "to": "0.09", "round": "0.10" }
                ],
                "ROUND_DOWN": [
                    { "from": "0.01", "to": "0.09", "round": "0.00" }
                ]
            },
            "0.50": {
                "ROUND_NEAREST_UP": [
                    { "from": "0.01", "to": "0.24", "round": "0.00" },
                    { "from": "0.25", "to": "0.74", "round": "0.50" },
                    { "from": "0.75", "to": "0.99", "round": "1.00" }
                ],
                "ROUND_NEAREST_DOWN": [
                    { "from": "0.01", "to": "0.25", "round": "0.00" },
                    { "from": "0.26", "to": "0.75", "round": "0.50" },
                    { "from": "0.76", "to": "0.99", "round": "1.00" }
                ],
                "ROUND_UP": [
                    { "from": "0.01", "to": "0.49", "round": "0.50" },
                    { "from": "0.51", "to": "0.99", "round": "1.00" }
                ],
                "ROUND_DOWN": [
                    { "from": "0.01", "to": "0.49", "round": "0.00" },
                    { "from": "0.51", "to": "0.99", "round": "0.50" }
                ]
            },
            "1.00": {
                "ROUND_NEAREST_UP": [
                    { "from": "0.01", "to": "0.49", "round": "0.00" },
                    { "from": "0.50", "to": "0.99", "round": "1.00" }
                ],
                "ROUND_NEAREST_DOWN": [
                    { "from": "0.01", "to": "0.50", "round": "0.00" },
                    { "from": "0.51", "to": "0.99", "round": "1.00" }
                ],
                "ROUND_UP": [
                    { "from": "0.01", "to": "0.99", "round": "1.00" }
                ],
                "ROUND_DOWN": [
                    { "from": "0.01", "to": "0.99", "round": "0.00" }
                ]
            },
            "1": {
                "NO_ROUNDING": []
            },
            "5": {
                "ROUND_NEAREST": [
                    { "from": "1", "to": "2", "round": "0" },
                    { "from": "3", "to": "7", "round": "5" },
                    { "from": "8", "to": "9", "round": "10" }
                ],
                "ROUND_UP": [
                    { "from": "1", "to": "4", "round": "5" },
                    { "from": "6", "to": "9", "round": "10" }
                ],
                "ROUND_DOWN": [
                    { "from": "1", "to": "4", "round": "0" },
                    { "from": "6", "to": "9", "round": "5" }
                ]
            },
            "10": {
                "ROUND_NEAREST_UP": [
                    { "from": "1", "to": "4", "round": "0" },
                    { "from": "5", "to": "9", "round": "10" }
                ],
                "ROUND_NEAREST_DOWN": [
                    { "from": "1", "to": "5", "round": "0" },
                    { "from": "6", "to": "9", "round": "10" }
                ],
                "ROUND_UP": [
                    { "from": "1", "to": "9", "round": "10" }
                ],
                "ROUND_DOWN": [
                    { "from": "1", "to": "9", "round": "0" }
                ]
            },
            "50": {
                "ROUND_NEAREST_UP": [
                    { "from": "1", "to": "24", "round": "0" },
                    { "from": "25", "to": "74", "round": "50" },
                    { "from": "75", "to": "99", "round": "100" }
                ],
                "ROUND_NEAREST_DOWN": [
                    { "from": "1", "to": "25", "round": "0" },
                    { "from": "26", "to": "75", "round": "50" },
                    { "from": "76", "to": "99", "round": "100" }
                ],
                "ROUND_UP": [
                    { "from": "1", "to": "49", "round": "50" },
                    { "from": "51", "to": "99", "round": "100" }
                ],
                "ROUND_DOWN": [
                    { "from": "1", "to": "49", "round": "0" },
                    { "from": "50", "to": "99", "round": "50" }
                ]
            },
            "100": {
                "ROUND_NEAREST_UP": [
                    { "from": "1", "to": "49", "round": "0" },
                    { "from": "50", "to": "99", "round": "100" }
                ],
                "ROUND_NEAREST_DOWN": [
                    { "from": "1", "to": "50", "round": "0" },
                    { "from": "51", "to": "99", "round": "100" }
                ],
                "ROUND_UP": [
                    { "from": "1", "to": "99", "round": "100" }
                ],
                "ROUND_DOWN": [
                    { "from": "1", "to": "99", "round": "0" }
                ]
            },
            "1000": {
                "ROUND_NEAREST_UP": [
                    { "from": "1", "to": "499", "round": "0" },
                    { "from": "500", "to": "999", "round": "1000" }
                ],
                "ROUND_NEAREST_DOWN": [
                    { "from": "1", "to": "500", "round": "0" },
                    { "from": "501", "to": "999", "round": "1000" }
                ],
                "ROUND_UP": [
                    { "from": "1", "to": "999", "round": "1000" }
                ],
                "ROUND_DOWN": [
                    { "from": "1", "to": "999", "round": "0" }
                ]
            }
        },
        "PAYMENT.ROUNDING_PARAM_CONFIG": {
            "CNY": {
                "0.01": { "NO_ROUNDING": {} },
                "0.05": {
                    "ROUND_NEAREST": { "mode": "auto", "offset": 1, "interval": "half_unit" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "half_unit" }
                },
                "0.10": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 1, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 1, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "unit" }
                },
                "0.50": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "half_unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "half_unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "half_unit" }
                },
                "1.00": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "unit" }
                }
            },
            "THB": {
                "0.01": { "NO_ROUNDING": {} },
                "0.05": {
                    "ROUND_NEAREST": { "mode": "auto", "offset": 1, "interval": "half_unit" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "half_unit" }
                },
                "0.10": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 1, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 1, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "unit" }
                },
                "0.50": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "half_unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "half_unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "half_unit" }
                },
                "1.00": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "unit" }
                }
            },
            "USD": {
                "0.01": { "NO_ROUNDING": {} },
                "0.05": {
                    "ROUND_NEAREST": { "mode": "auto", "offset": 1, "interval": "half_unit" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "half_unit" }
                },
                "0.10": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 1, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 1, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "unit" }
                },
                "0.50": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "half_unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "half_unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "half_unit" }
                },
                "1.00": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "unit" }
                }
            },
            "KHR": {
                "0.01": { "NO_ROUNDING": {} },
                "0.05": {
                    "ROUND_NEAREST": { "mode": "auto", "offset": 1, "interval": "half_unit" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "half_unit" }
                },
                "0.10": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 1, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 1, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "unit" }
                },
                "0.50": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "half_unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "half_unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "half_unit" }
                },
                "1.00": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "unit" }
                }
            },
            "HKD": {
                "0.01": { "NO_ROUNDING": {} },
                "0.05": {
                    "ROUND_NEAREST": { "mode": "auto", "offset": 1, "interval": "half_unit" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "half_unit" }
                },
                "0.10": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 1, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 1, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "unit" }
                },
                "0.50": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "half_unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "half_unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "half_unit" }
                },
                "1.00": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "unit" }
                }
            },
            "MYR": {
                "0.01": { "NO_ROUNDING": {} },
                "0.05": {
                    "ROUND_NEAREST": { "mode": "auto", "offset": 1, "interval": "half_unit" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "half_unit" }
                },
                "0.10": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 1, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 1, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "unit" }
                },
                "0.50": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "half_unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "half_unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "half_unit" }
                },
                "1.00": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "unit" }
                }
            },
            "PHP": {
                "0.01": { "NO_ROUNDING": {} },
                "0.05": {
                    "ROUND_NEAREST": { "mode": "auto", "offset": 1, "interval": "half_unit" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "half_unit" }
                },
                "0.10": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 1, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 1, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 1, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 1, "interval": "unit" }
                },
                "0.50": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "half_unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "half_unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "half_unit" }
                },
                "1.00": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 2, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 2, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 2, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 2, "interval": "unit" }
                }
            },
            "IDR": {
                "1": { "NO_ROUNDING": {} },
                "5": {
                    "ROUND_NEAREST": { "mode": "auto", "offset": 3, "interval": "half_unit" },
                    "ROUND_UP": { "mode": "ceil", "offset": 3, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 3, "interval": "half_unit" }
                },
                "10": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 3, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 3, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 3, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 3, "interval": "unit" }
                },
                "50": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 4, "interval": "half_unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 4, "interval": "half_unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 4, "interval": "half_unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 4, "interval": "half_unit" }
                },
                "100": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 4, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 4, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 4, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 4, "interval": "unit" }
                },
                "1000": {
                    "ROUND_NEAREST_UP": { "mode": "auto", "offset": 5, "interval": "unit" },
                    "ROUND_NEAREST_DOWN": { "mode": "auto", "offset": 5, "interval": "unit", "strategy": "half_down" },
                    "ROUND_UP": { "mode": "ceil", "offset": 5, "interval": "unit" },
                    "ROUND_DOWN": { "mode": "floor", "offset": 5, "interval": "unit" }
                }
            }
        },

        // ----
        // store avatar using for ticket 店铺头像
        "STORE.STORE_AVATAR": "",
        "STORE.STORE_AVATAR_BASE64": "",

        // app logo using for brand（size limit <= 256*256） 应用logo，尺寸不大于256*256
        "SYS.APP_LOGO": max.envVar.getValue('SYS_APP_LOGO'),
        "SYS.APP_LOGO_DARK": max.envVar.getValue('SYS_APP_LOGO_OFFLINE'),

        // whether enable tax module 是否启用税费
        "TAX.TAX_ENABLE": true,
        // tax list 税目列表
        "TAX.TAX_LIST": [],
        // fee list 增值费列表
        "TAX.FEE_LIST": [],
        // product price include tax 商品价格含税
        "TAX.PRODUCT_PRICE_INCLUDE_TAX_ENABLE": false,
        // tax tag 税目标识
        "TAX.TAX_TAG": "SST",
        // taxation mode 计税模式
        "TAX.TAXATION_MODE": "TAX_INCLUDED", // TAX_INCLUDED(默认：商品价格含税) ｜ BEFORE_DISCOUNT(折前计税) ｜ AFTER_DISCOUNT(折后计税)

        // [local] default voice language
        "VOICE.AIVOICE_DEFAULT_LANG": max.envVar.getValue('SYS_AIVOICE_DEFAULT_LANG'),
        // [local] default voice language is used by default when language is not supported
        "VOICE.AIVOICE_DEFAULT_LANG_EFFECT_AUTOLY": true,
        // [local] remedy voice assets 兜底语音资源定义(只有平台语音不支持的才进这里)
        "VOICE.REMEDY_VOICE_ASSETS": {
            id: {
                dir: "https://cdn.sunmi.com/public/generalfile/max_audio_raw/id/",
                extType: "mp3", // 语音文件后缀，请保证所有文件使用统一的后缀格式
                charFiles: Array.from("0123456789abcdefghijklmnopqrstuvwxyz"), // 字符语音文件名称
                phraseFiles: [
                    "queue_called_prefix", // 排队叫号到号
                    "queue_called_suffix", // 排队叫号到号
                    "pickup_called_prefix", // 叫号取餐到号
                    "pickup_called_suffix", // 叫号取餐到号
                    "receive_money", // 收款提示
                    "receive_pos_order", // pos接单提示
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
        "VOICE.CUSTOM_VOICE_ASSETS": [
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
                    },
                    ms: {
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
                    ms: {
                        url: "https://file.cdn.sunmi.com/max/bank/assets/grab-sonic-logo.mp3",
                        name: "takeawayReminder_grab.mp3"
                    }
                }
            }
        ],

        /**
         * [cloud] voice for payment result 扫码支付语音
         */
        // enable 是否启用
        "VOICE.SCAN_PAYMENT_ENABLE": true,
        // unable beep 是否启用蜂鸣
        "VOICE.SCAN_PAYMENT_BEEP_ENABLE": true,
        // unable text 是否播报文字内容
        "VOICE.SCAN_PAYMENT_TEXT_ENABLE": true,

        /**
         * [cloud] voice for new takeout order 外卖接单语音
         */
        // enable 是否启用
        "VOICE.TACKOUT_ORDER_ENABLE": true,
        // unable beep 是否启用蜂鸣
        "VOICE.TACKOUT_ORDER_BEEP_ENABLE": true,
        // unable text 是否播报文字内容
        "VOICE.TACKOUT_ORDER_TEXT_ENABLE": true,

        /**
         * [cloud] voice for new qr order 扫码点餐语音
         */
        // enable 是否启用
        "VOICE.SCAN_ORDER_ENABLE": true,
        // unable beep 是否启用蜂鸣
        "VOICE.SCAN_ORDER_BEEP_ENABLE": true,
        // unable text 是否播报文字内容
        "VOICE.SCAN_ORDER_TEXT_ENABLE": true,

        /**
         * [cloud] voice for new channel scan order 渠道扫码点餐
         */
        // enable 是否启用
        "VOICE.CHANNEL_SCAN_ORDER_ENABLE": true,
        // unable beep 是否启用蜂鸣
        "VOICE.CHANNEL_SCAN_ORDER_BEEP_ENABLE": true,
        // unable text 是否播报文字内容
        "VOICE.CHANNEL_SCAN_ORDER_TEXT_ENABLE": true,
    }
}