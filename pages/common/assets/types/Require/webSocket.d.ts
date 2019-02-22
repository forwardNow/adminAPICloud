declare namespace api.Require {
    interface TRequire {
        'webSocket': webSocket
    }
    interface webSocket {
        /**添加监听 */
        addEventListener: (callback: (
            ret: { status: boolean, evenType: "Connected" | "ReturnData" | "Closed", data: string },
            err: { code: number, msg: string }) => void
        ) => void
        /**建立连接 */
        open: (
            url: { url: string },
            callback?: (
                ret: { status: boolean },
                err: { code: number, msg: string }) => void
        ) => void
        /**发送文本消息 */
        send: (
            ext: {
                data: string
            },
            callback?: (
                ret: { status: boolean },
                err: { code: number, msg: string }) => void
        ) => void
        /**关闭连接 */
        close: (callback?: (
            ret: { status: boolean },
            err: { code: number, msg: string }) => void
        ) => void
    }
}