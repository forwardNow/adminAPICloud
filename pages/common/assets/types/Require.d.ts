declare namespace api {
    /**
     * 引入模块
     * @param moduleName 模块名称
     */
    function require<T extends keyof api.Require.TRequire>(moduleName: T): api.Require.TRequire[T];
}