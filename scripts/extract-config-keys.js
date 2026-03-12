#!/usr/bin/env node
/**
 * 从 JSON 中提取 ConfigCenter 使用的 key 列表，支持 v1 和 v2 用法。
 *
 * 用法:
 *   node scripts/extract-config-keys.js              # 默认使用项目根目录 kiosk.json
 *   node scripts/extract-config-keys.js <json路径>   # 指定 JSON 文件
 *
 * 识别：
 *   v2: get('MODULE.KEY') / get("MODULE.KEY")、高亮片段 (</span>'MODULE.KEY'
 *   v1: get('module', 'KEY') / get("module", "KEY")、高亮片段 (</span>'module', 'KEY'
 * 统一输出为 MODULE.KEY 格式（v1 的 module 会转成大写），去重排序。
 */

const fs = require("fs");
const path = require("path");

const defaultPath = path.join(__dirname, "..", "kiosk.json");
const jsonPath = process.argv[2] || defaultPath;

// v2：单参数 fullKey，(</span>'KEY' 或 get('KEY')
const V2_PATTERNS = [
    /\(<\/span>['"]([^'"]+)['"]/g,
    /ConfigCenter\.get\s*\(\s*['"]([^'"]+)['"]/g,
    /\.get\s*\(\s*['"]([^'"]+)['"]/g,
];

// v1：双参数 (module, key)，两种片段格式
// 高亮片段1：(</span>'module', 'KEY'（kiosk 等）
const V1_TWO_ARG_HIGHLIGHT = /\(<\/span>['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/g;
// 高亮片段2：get</span>('module', 'KEY')（web 等，括号与 get 被 span 隔开）
const V1_TWO_ARG_PLAIN = /\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/g;
// 方法调用：ConfigCenter.get('module', 'KEY') 或 .set("module", "KEY")（源码中连续写法）
const V1_TWO_ARG_CALL = /(?:ConfigCenter\.|\.)(get|set|pull|push|parse|raw)\s*\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/gi;

// 只保留符合 MODULE.KEY 的 key（排除明显噪音）
function isValidFullKey(key) {
    if (!key || typeof key !== "string") return false;
    const s = key.trim();
    if (s.length < 3) return false;
    if (!/^[A-Z][A-Z0-9_]*\.[A-Z0-9a-z_]+$/i.test(s)) return false;
    if (s === "moduleName" || /^modulename\./i.test(s) || /^[a-z]/.test(s)) return false;
    return true;
}

// v1 的 key 部分通常是大写+下划线
function isValidV1Key(key) {
    if (!key || typeof key !== "string") return false;
    const s = key.trim();
    return s.length >= 2 && /^[A-Z0-9_]+$/i.test(s);
}

function toFullKey(module, key) {
    const m = (module || "").trim().toUpperCase();
    const k = (key || "").trim();
    if (!m || !k) return null;
    return m + "." + k;
}

function collectStrings(obj, out = new Set()) {
    if (obj == null) return out;
    if (typeof obj === "string") {
        out.add(obj);
        return out;
    }
    if (Array.isArray(obj)) {
        obj.forEach((item) => collectStrings(item, out));
        return out;
    }
    if (typeof obj === "object") {
        Object.values(obj).forEach((v) => collectStrings(v, out));
        return out;
    }
    return out;
}

function extractKeysFromString(str) {
    const keys = new Set();

    // v2 单参数
    for (const re of V2_PATTERNS) {
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(str)) !== null) {
            const k = m[1].trim();
            if (isValidFullKey(k)) keys.add(k);
        }
    }

    // v1 双参数：高亮片段 (</span>'module', 'KEY'
    let m;
    V1_TWO_ARG_HIGHLIGHT.lastIndex = 0;
    while ((m = V1_TWO_ARG_HIGHLIGHT.exec(str)) !== null) {
        if ((m[1] || "").trim().toLowerCase() === "modulename") continue;
        const full = toFullKey(m[1], m[2]);
        if (full && isValidV1Key(m[2])) keys.add(full);
    }
    // v1 双参数：高亮片段 get</span>('module', 'KEY')（无 (</span> 前缀）
    if (/ConfigCenter|\.get\s*<|get<\/span>|\.set\s*</.test(str)) {
        V1_TWO_ARG_PLAIN.lastIndex = 0;
        while ((m = V1_TWO_ARG_PLAIN.exec(str)) !== null) {
            const mod = (m[1] || "").trim().toLowerCase();
            if (mod !== "modulename" && !m[1].includes(".") && isValidV1Key(m[2])) {
                const full = toFullKey(m[1], m[2]);
                if (full) keys.add(full);
            }
        }
    }
    // v1 双参数：方法调用 get('module', 'KEY')（源码中连续写法）
    V1_TWO_ARG_CALL.lastIndex = 0;
    while ((m = V1_TWO_ARG_CALL.exec(str)) !== null) {
        if ((m[2] || "").trim().toLowerCase() === "modulename") continue;
        const full = toFullKey(m[2], m[3]);
        if (full && isValidV1Key(m[3])) keys.add(full);
    }
    return keys;
}

function main() {
    if (!fs.existsSync(jsonPath)) {
        console.error("文件不存在:", jsonPath);
        process.exit(1);
    }
    const raw = fs.readFileSync(jsonPath, "utf8");
    let data;
    try {
        data = JSON.parse(raw);
    } catch (e) {
        console.error("JSON 解析失败:", e.message);
        process.exit(1);
    }

    const allStrings = collectStrings(data);
    const keySet = new Set();
    for (const s of allStrings) {
        extractKeysFromString(s).forEach((k) => keySet.add(k));
    }

    const keys = Array.from(keySet).sort();
    console.log("# 从", path.basename(jsonPath), "提取的 ConfigCenter key，共", keys.length, "个\n");
    keys.forEach((k) => console.log(k));
}

main();
