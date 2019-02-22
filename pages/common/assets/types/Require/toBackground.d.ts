declare namespace api.Require {
    interface TRequire {
        'toBackground': toBackground
    }
    /**一键进入后台运行  */
    interface toBackground {
        /**一键进入后台运行 */
        runBackground(Fun?: (ret: { status: boolean }, err: any) => void): void
    }
}