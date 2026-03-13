# 配置中心

## 参考

- 设计说明（背景、现状问题、方案要点、API、Conf_x/Handler_x、使用原则、同步接口）
  - [钉钉文档 - 配置中心设计_V1](https://alidocs.dingtalk.com/i/nodes/dpYLaezmVNLNqyp6HagglmAl8rMqPxX6)（刘文沣 2024-12-24）
- 云端接口：yapi - getSoftSettings/setSoftSettings

## 特性

- **统一入口**：所有配置经 ConfigCenter 存取，一处 set、多处 get，避免改错、漏改和配置互相影响
- **分层清晰**：`UNIVERSAL`（跨设备/多店共用）与 `LOCAL`（端配置）分离，为连锁多店扩展打基础
- **模块化定义**：按模块注册 Conf_x + Handler_x，定义与消费成对，便于维护和云端同步
- **命名规范**：`<模块>.<KEY>` 模式，与端/域/页面体系对齐，支持权限与功能点管理

---

## 示例

命名规范 `<模块>.<KEY>`，仅 fullKey 一种写法：

```javascript
// TODO:模块开关，影响模块关联的所有页面，模块与页面关联，参考下方功能清单
ConfigCenter.enable('TAX');
ConfigCenter.enable(['TAKEOUT', 'QUEUE']); // 批量开启
ConfigCenter.disable('TAKEOUT');
ConfigCenter.disable(['TAKEOUT', 'QUEUE']); // 批量关闭

// DONE
ConfigCenter.set('CHECKOUT.PRODUCT_ITEM_AUTO_MERGE_ENABLE', true); // 设置配置项
ConfigCenter.get('CHECKOUT.PRODUCT_ITEM_AUTO_MERGE_ENABLE'); // 获取配置项
ConfigCenter.pull('CHECKOUT.PRODUCT_ITEM_AUTO_MERGE_ENABLE'); // 从云端拉取配置项
ConfigCenter.push('CHECKOUT.PRODUCT_ITEM_AUTO_MERGE_ENABLE', true); // 从云端推送配置项
ConfigCenter.batchPull(['CHECKOUT.PRODUCT_ITEM_AUTO_MERGE_ENABLE', 'CHECKOUT.PRODUCT_ITEM_AUTO_MERGE_ENABLE']); // 批量从云端拉取配置项
ConfigCenter.batchPush([{ key: 'CHECKOUT.PRODUCT_ITEM_AUTO_MERGE_ENABLE', value: true }]); // 批量从云端推送配置项

```

## 模块

- 系统配置 SYS
- 点餐 CHECKOUT
- 结算 SETTLEMENT
- 叫号 CALL
- 接单 ACCEPT
- 外卖 TAKEOUT
- 排队 QUEUE
- 订单 ORDER
- 商品 GOOD
- 菜单 MENU
- 库存 INVENTORY
- 桌台 TABLE
- 报表 REPORT
- 税 TAX
- 会员 MEMBER
- 设备 IOT
- 支付 PAYMENT
- 经营设置 SETTING
- 语音 VOICE
- 账号 ACCOUNT
- 国际化 I18N

## 配置一览

| 功能键                                                | 台式 | 手持 | 自助 | Web后台 | 扫码点餐 | 管家App |
| ----------------------------------------------------- | ---- | ---- | ---- | ------- | -------- | ------- |
| SYS.APP_LOGO                                          | √    | √    | √    | √       | √        | √       |
| SYS.APP_LOGO_DARK                                     | √    | √    | √    |         |          |         |
| SYS.THEME                                             | √    | √    | √    |         |          |         |
| SYS.DECIMAL_PLACES                                    | √    |      |      | √       |          |         |
| SYS.EMAIL_REGEX                                       |      |      |      | √       |          |         |
| SYS.LOCALE_LANGUAGE_MAP                               | √    | √    |      | √       | √        | √       |
| SYS.CELLPHONE_VALIDATOR                               | √    | √    |      |         |          |         |
| SYS.TELEPHONE_VALIDATOR                               | √    | √    |      |         |          |         |
| SYS.MAX_AMOUNT_TIER_1                                 | √    | √    |      | √       |          | √       |
| SYS.MAX_AMOUNT_TIER_2                                 | √    |      |      | √       |          |         |
| SYS.MAX_AMOUNT_TIER_3                                 |      |      |      | √       |          | √       |
| SYS.WATER_DROP_OFFSET                                 |      | √    | √    |         |          |         |
| SYS.CALCULATOR_VERSION                                |      |      |      |         | √        |         |
| SYS.CURRENT_LANGUAGE                                  |      |      |      |         | √        |         |
| SYS.FUN_FEE                                           |      |      |      |         | √        |         |
| SYS.FUN_GOOD_DISCOUNT                                 |      |      |      |         | √        |         |
| SYS.FUN_SHARING_TABLE                                 |      |      |      |         | √        |         |
| SYS.FUN_TAX                                           |      |      |      |         | √        |         |
| SYS.FUN_ACTIVITIES                                    |      |      |      |         |          |         |
| SYS.FUN_CALLING_SERVICE                               |      |      |      |         |          |         |
| SYS.FUN_ONLINE_PAY                                    |      |      |      |         |          |         |
| SYS.RANKING_TOP3_ICONS                                |      |      |      |         |          | √       |
| SYS.TAB_BARS                                          |      |      |      |         |          | √       |
| SYS.MAX_STOCK_AMOUNT                                  |      |      |      |         |          | √       |
| SYS.MAX_STOCK_WEIGHT                                  |      |      |      |         |          | √       |
| I18N.FORMAT_DATE                                      | √    | √    | √    | √       |          |         |
| I18N.FORMAT_DATE_SHORT                                | √    | √    | √    | √       |          |         |
| I18N.FORMAT_DATE_TIME                                 | √    | √    | √    | √       |          |         |
| I18N.FORMAT_DATE_TIME_SHORT                           | √    | √    | √    | √       |          |         |
| I18N.FORMAT_TIME                                      | √    | √    | √    | √       |          |         |
| I18N.FORMAT_TIME_SHORT                                | √    | √    | √    | √       |          |         |
| I18N.FORMAT_DATE_SHORT_TIME_SHORT                     | √    | √    | √    | √       |          |         |
| STORE.STORE_AVATAR_BASE64                             | √    | √    | √    |         |          |         |
| STORE.STORE_AVATAR                                    |      |      |      |         |          |         |
| STORE.STORE_LOGIN_AD_IMG                              | √    |      |      | √       |          |         |
| STORE.APP_NAME                                        | √    | √    |      |         |          |         |
| STORE.APP_ONLINE_PAYMENT                              | √    | √    |      |         |          |         |
| STORE.DEFAULT_BACKGROUND                              |      |      |      |         | √        |         |
| STORE.STORE_BUSINESS_TYPE_REQUIRED                    |      |      |      |         |          |         |
| STORE.STORE_CASCADE_ADDRESS_ENABLE                    |      |      |      |         |          |         |
| STORE.STORE_CASCADE_ADDRESS_REQUIRED                  |      |      |      |         |          |         |
| STORE.STORE_QR_ORDER_ENABLE                           |      |      |      |         |          |         |
| STORE.STORE_QR_ORDER_AUTO_ACCEPT_ENABLE               |      |      |      |         |          |         |
| STORE.STORE_SUBSCREEN_AD_IMG                          |      |      |      |         |          |         |
| STORE.STORE_SUBSCREEN_PAY_AD_IMG                      |      |      |      |         |          |         |
| STORE.D3MINI_SUBSCREEN_PAY_AD_IMG                     |      |      |      |         |          |         |
| STORE.D_STORE_ORDER_AUTO_ACCEPT_ENABLE                |      |      |      |         |          |         |
| STORE.D_STORE_QR_ORDER_ENABLE                         |      |      |      |         |          |         |
| CHECKOUT.AD_SELF_DINING_METHOD                        |      |      | √    |         |          |         |
| CHECKOUT.AD_SELF_PAYMENT_METHOD                       |      |      | √    |         |          |         |
| CHECKOUT.AD_SELF_PLAY_SWITCH                          |      |      | √    |         |          |         |
| CHECKOUT.AD_SELF_PLAY_TYPE                            |      |      | √    |         |          |         |
| CHECKOUT.AD_SELF_SECONDARY                            |      |      | √    |         |          |         |
| CHECKOUT.BUSINESS_TYPE                                | √    | √    | √    | √       |          |         |
| CHECKOUT.UI_CATEGORY_COUNT_SHOW                       |      |      | √    |         |          |         |
| CHECKOUT.UI_LAYOUT_TYPE                               | √    | √    | √    |         |          |         |
| CHECKOUT.POS_QR_ORDER_ENABLE                          | √    | √    |      |         |          |         |
| CHECKOUT.POS_QR_ORDER_AUTO_ACCEPT_ENABLE              | √    | √    |      |         |          |         |
| CHECKOUT.POS_SCAN_ORDER_ENABLE                        |      |      |      |         |          |         |
| CHECKOUT.POS_MENU_MONEY_REGULAR                       |      |      |      |         |          |         |
| CHECKOUT.CUSTOM_PRICE_SUPPORT                         |      |      |      |         |          |         |
| CHECKOUT.TEMPORARY_GOODS_SUPPORT                      |      |      |      |         |          |         |
| CHECKOUT.PRODUCT_ITEM_AUTO_MERGE_ENABLE               |      |      |      |         |          |         |
| CHECKOUT.LOW_INVENTORY_WARNING_ENABLE                 |      |      |      |         |          |         |
| CHECKOUT.SPLIT_ORDER_ENABLE                           | √    | √    |      |         |          |         |
| CHECKOUT.SETTLEMENT_AUTO_PRINT_BILL_TICKET_ENABLE     |      |      |      |         |          |         |
| CHECKOUT.SETTLEMENT_CASH_AMOUNT_COVERAGE_ENABLE       |      |      |      |         |          |         |
| CHECKOUT.SETTLEMENT_MANUAL_PRINT_MAKING_TICKET_ENABLE |      |      |      |         |          |         |
| CHECKOUT.SETTLEMENT_SPLIT_PAY_ENABLE                  |      |      |      |         |          |         |
| CHECKOUT.SECONDARY_SCREEN_AD_ENABLE                   |      |      |      |         |          |         |
| CHECKOUT.DELIVERY_CHANNEL_MONEY_REGULAR               |      |      |      |         |          |         |
| CHECKOUT.PRE_PRINT_NO_REFUND_CAT_ENABLE               |      |      |      |         |          |         |
| GOOD.ITEM_BG_MAP                                      | √    |      | √    |         |          |         |
| GOOD.ITEM_COLOR_MAP                                   | √    |      |      |         |          |         |
| GOOD.ITEM_SHAPE_MAP                                   | √    |      |      |         |          |         |
| GOOD.MAX_AMOUNT_TIER_1                                | √    |      |      | √       |          |         |
| GOOD.MAX_AMOUNT_TIER_2                                | √    |      |      | √       |          |         |
| GOOD.MAX_AMOUNT_TIER_3                                |      |      |      | √       |          |         |
| GOOD.EXTERNAL_CHANNEL_MENU_ENABLE                     |      |      |      |         |          |         |
| IOT.LABEL_PRINTER_PAPER_SIZE                          | √    | √    |      |         |          |         |
| IOT.SUPPORT_PRINTER_MODEL                             | √    | √    |      |         |          |         |
| MEMBER.MEMBER_ENABLE                                  | √    | √    | √    |         |          |         |
| MEMBER.MEMBER_PHONE_PREFIX                            |      |      | √    |         |          |         |
| MEMBER.MEMBER_DEPOSIT_OFFLINE_SUPPORT                 |      |      |      |         |          |         |
| MEMBER.MEMBER_DEPOSIT_SUPPORT                         |      |      |      |         |          |         |
| MEMBER.MEMBER_PROMOTION_SUPPORT                       |      |      |      |         |          |         |
| PAYMENT.ECR_PAY_MERCHANT_ID                           |      |      | √    |         |          |         |
| PAYMENT.PAY_METHOD_RANDOM_ICON                        |      |      |      |         |          |         |
| PAYMENT.ONLINEPAYMETHOD_NAMES                         |      |      | √    |         |          |         |
| PAYMENT.ONLINEPAY_ICON_MAP                            |      |      | √    |         |          |         |
| PAYMENT.ONLINE_PAYMENT_TYPE                           | √    |      |      |         |          |         |
| PAYMENT.PAY_ECR_CONFIG                                |      |      | √    |         |          |         |
| PAYMENT.PAY_ECR_CONFIG_IP                             |      |      | √    |         |          |         |
| PAYMENT.PAY_ECR_CONFIG_PORT                           |      |      | √    |         |          |         |
| PAYMENT.PAY_METHOD_LIST                               | √    | √    | √    |         |          |         |
| PAYMENT.ROUNDING_PARAM_CONFIG                         |      |      | √    |         |          |         |
| PAYMENT.ROUNDING_RULES                                | √    | √    | √    | √       |          |         |
| PAYMENT.ROUNDING_RULE_DESC                            | √    | √    | √    | √       |          |         |
| PAYMENT.RoundingRuleType                              | √    | √    | √    | √       |          |         |
| PAYMENT.TIP_ENABLE                                    | √    | √    |      |         |          |         |
| PAYMENT.TIP_SHORTCUT_INFO                             | √    | √    |      |         |          |         |
| PICKUP.MAX_SERIAL_NUMBER                              | √    | √    |      |         |          |         |
| PICKUP.MIN_SERIAL_NUMBER                              | √    | √    |      |         |          |         |
| PICKUP.PICKUP_ENABLE                                  |      |      |      |         |          |         |
| TAKEOUT.TAKEOUT_ENABLE                                | √    | √    |      | √       |          | √       |
| TAKEOUT.AUTO_MEALDELIVERY_ENABLE                      |      |      |      |         |          |         |
| QUEUE.QUEUE_ENABLE                                    |      |      |      |         |          |         |
| QUEUE.QUEUE_TABLE_LIST                                |      |      |      |         |          |         |
| CALL.NUMBER_CALLING_ORDERCHANNELS                     |      |      |      |         |          |         |
| TAX.TAXATION_MODE                                     | √    | √    | √    |         | √        |         |
| TAX.FEE_LIST                                          | √    |      |      |         |          |         |
| TAX.MENU_FEE_LIST                                     | √    | √    |      |         |          |         |
| TAX.MENU_TAX_LIST                                     | √    | √    |      |         |          |         |
| TAX.CURRENT_LANGUAGE                                  |      |      |      |         | √        |         |
| TAX.TAXATION_MODE                                     | √    | √    | √    |         | √        |         |
| TAX.TAX_TAG                                           | √    | √    |      |         |          |         |
| TAX.TAX_ENABLE                                        |      |      |      |         |          |         |
| TAX.TAX_LIST                                          |      |      |      |         |          |         |
| TAX.PRODUCT_PRICE_INCLUDE_TAX_ENABLE                  |      |      |      |         |          |         |
| VOICE.AIVOICE_DEFAULT_LANG                            | √    | √    | √    |         |          |         |
| VOICE.AIVOICE_DEFAULT_LANG_EFFECT_AUTOLY              | √    | √    | √    |         |          |         |
| VOICE.CHANNEL_SCAN_ORDER_ENABLE                       |      |      | √    |         |          |         |
| VOICE.CUSTOM_VOICE_ASSETS                             | √    | √    | √    |         |          |         |
| VOICE.KIOSK_ORDER_ENABLE                              | √    |      |      |         |          |         |
| VOICE.REMEDY_VOICE_ASSETS                             | √    | √    | √    |         |          |         |
| VOICE.SCAN_ORDER_BEEP_ENABLE                          | √    | √    | √    |         |          |         |
| VOICE.SCAN_ORDER_ENABLE                               | √    | √    | √    |         |          |         |
| VOICE.SCAN_ORDER_TEXT_ENABLE                          | √    | √    | √    |         |          |         |
| VOICE.SCAN_PAYMENT_BEEP_ENABLE                        |      |      | √    |         |          |         |
| VOICE.SCAN_PAYMENT_ENABLE                             | √    | √    | √    |         |          |         |
| VOICE.SCAN_PAYMENT_TEXT_ENABLE                        |      |      | √    |         |          |         |
| VOICE.TACKOUT_ORDER_BEEP_ENABLE                       |      |      | √    |         |          |         |
| VOICE.TACKOUT_ORDER_ENABLE                            | √    | √    | √    |         |          |         |
| VOICE.TACKOUT_ORDER_TEXT_ENABLE                       |      |      | √    |         |          |         |


## 功能清单

> [全部功能清单AI表格，](https://alidocs.dingtalk.com/i/nodes/EpGBa2Lm8azoq94yCD3A96xlWgN7R35y?iframeQuery=entrance%3Ddata%26sheetId%3DhERWDMS%26viewId%3DqvGDAH2) 表格 ID：`EpGBa2Lm8azoq94yCD3A96xlWgN7R35y`


| 字段     | 类型 | 说明                                                                                               |
| -------- | ---- | -------------------------------------------------------------------------------------------------- |
| 端       | 单选 | 台式、手持、自助、扫码点餐、Web后台、TV、TV登录、H5上传、管家App                                   |
| 域       | 单选 | 点餐与收银、接单与叫号、会员与营销、商品与库存、经营与报表、设备与输出、门店与组织、系统配置、其他 |
| 一级     | 文本 | 一级分类/页面                                                                                      |
| 二级     | 文本 | 二级分类/页面                                                                                      |
| 三级     | 文本 | 三级/功能点                                                                                        |
| 模块     | 单选 | 点餐、结算、叫号、接单、外卖、排队、订单、商品、菜单、库存、桌台、报表、税、国际化等               |
| Key      | 文本 | 配置项 key                                                                                         |
| 可选值   | 单选 | bool / enum / array / string / number / object                                                     |
| 是否完成 | 单选 | 是 / 否 / 待定                                                                                     |
| 备注     | 文本 | 说明或未使用等                                                                                     |
|          | 人员 | 钉钉用户                                                                                           |

