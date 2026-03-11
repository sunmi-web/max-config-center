function ConfEntry() {
    return {
        // 考虑从远端格式化，而不用现行列举出来
        ...max.globalFn.Conf_Universal(),
        ...max.globalFn.Conf_Local(),
    }
}