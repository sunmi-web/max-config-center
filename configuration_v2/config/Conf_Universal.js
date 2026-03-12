/**
 * Config for Universal (Cloud, Cross-device) Modules 通用（云端、跨端）模块配置
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
function Conf_Universal() {
    return {
        // "SYS.APP_NAME": 'App Name',
        // "SYS.APP_LOGO": 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        // "SYS.APP_LOGO_DARK": 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',

        // theme 主题
        "SYS.THEME": max.envVar.getValue('SYS_THEME') || {
            // Colors 主色调
            primaryColor: "#ff6000",            // primary-50
            primaryDisabledColor: "#ffbf99",    // primary-80
            primaryBoundaryColor: "#ffdfcc",    // primary-90
            primaryOutlineColor: "#ffa066",     // primary-70
            primaryBorderColor: "#ff9f66",
            // Colors 辅助色调
            neutralColor: "#4d545f",            // background-1
            neutralDisabledColor: "#c3cad2",    // neutral-80
            neutralPressedColor: "#3e4855",     // neutral-30
            neutralFocusedColor: "#536172",     // neutral-40
            neutralBoundaryColor: "#e1e4e8",    // neutral-90
            neutralOutlineColor: "#c3cad2",     // neutral-80
            neutralPlaceholder: "#a4aebb",      // neutral-70
            onNeutralColor: "#ffffff",          // neutral-100
            // Colors 成功
            successColor: "#39ad43",                    // success-50
            successDisabledColor: "#abe3b0",            // success-80
            successFocusedColor: "#2e8a36",             // success-40
            successBoundaryColor: "#d5f1d7",            // success-90
            successOutlineColor: "#80d588",             // success-70
            // Colors 失败
            errorColor: "#f53f3f",                      // error-50
            errorDisabledColor: "#fbb1b1",              // error-80
            errorFocusedColor: "#e90c0c",               // error-40
            errorBoundaryColor: "#f98b8b",              // error-70
            errorOutlineColor: "#f98b8b",               // error-70
            // Colors 警告
            warningColor: "#ffb800",                    // warning-50
            warningDisabledColor: "#ffe299",            // warning-80
            warningFocusedColor: "#cc9300",             // warning-40
            warningBoundaryColor: "#fff1cc",            // warning-90
            warningOutlineColor: "#ffd466",             // warning-70

            // Layout 布局
            layoutBackgroundColor: "#4d545f",            // background-1
            layoutBackgroundColorPressed: "#68798e",     // neutral-50

            // Text 文本
            textColor: "#2a3139",                   // neutral-20
            textSecondaryColor: "#536172",          // neutral-40
            textInfoColor: "#68798e",               // neutral-50
            textDisabledColor: "#c3cad2",           // neutral-80
            textPlaceholderColor: "#a4aebb",        // neutral-70
            textHeadlineSize: "36px",
            textTitleLargeSize: "32px",
            textTitleSize: "28px",
            textBodySize: "24px",
            textLabelSize: "20px",
            textInfoSize: "18px",

            // Border 圆角
            borderWidth: "1px",
            radiusTag: "4px",
            radiusBtn: "8px",
            radiusTitle: "16px",
        },

        // international 国际化
        "I18N.LANGUAGE_MAP": {
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
        "I18N.FORMAT_DATE": "YYYY-MM-DD",
        "I18N.FORMAT_DATE_SHORT": "MM-DD",
        "I18N.FORMAT_TIME": "HH:mm:ss",
        "I18N.FORMAT_TIME_SHORT": "HH:mm",
        "I18N.FORMAT_DATE_TIME": "YYYY-MM-DD HH:mm:ss",
        "I18N.FORMAT_DATE_TIME_SHORT": "YYYY-MM-DD HH:mm",
        "I18N.FORMAT_DATE_SHORT_TIME_SHORT": "MM-DD HH:mm",
    }
}