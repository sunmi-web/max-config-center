function HandlerEntry() {
    // register module config handler 注册各模块配置处理函数
    return {
        ...max.globalFn.Handler_Universal(),
        ...max.globalFn.Handler_Local()
    }
}