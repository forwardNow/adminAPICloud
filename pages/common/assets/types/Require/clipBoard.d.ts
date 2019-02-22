declare namespace api.Require {
    interface TRequire {
        'clipBoard': clipBoard
    }
    interface clipBoard {
        /**设置剪切板内容 */
        set(
            /**要复制到剪切板的字符串，可为空，若为空则清空剪切板 */
            params: { value: string },
            callback: (
                ret: {
                    /**操作成功状态值 */
                    status: boolean
                },
                err: {
                    /**错误描述 */
                    msg: string
                }
            ) => void): void

        /**获取剪切板中的数据 */
        get(callback: (
            ret: {
                /**从剪切板获取的字符串 */
                value: string

                /**数据类型，取值范围见数据类型 */
                type: Dictionary<any>
            },
            err: Dictionary<any>
        ) => void): void

        /**设置剪切板监听 */
        setListener(callback: (
            ret: {
                /**从剪切板获取的字符串 */
                value: string

                /**数据类型，取值范围见数据类型 */
                type: Dictionary<any>
            },
            err: Dictionary<any>
        ) => void): void

        /**移除剪切板监听 */
        removeListener(): void
    }
}