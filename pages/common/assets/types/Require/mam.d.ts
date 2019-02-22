declare namespace api.Require {
    interface TRequire {
        'mam': mam
    }
    interface mam {
        /**检测当前版本是否有更新或者被强制关闭 */
        checkUpdate(callback: (ret: mam.checkUpdate, err: { msg: string }) => void): void

        /**检测是否有云修复更新，只在config.xml里面配置smartUpdate为false有效 */
        checkSmartUpdate(callback: (ret: mam.checkSmartUpdate, err: any) => void): void

        /**开始云修复更新，更新完成后建议调用api.rebootApp方法热重启。只在config.xml里面配置smartUpdate为false有效 */
        startSmartUpdate(callback: (ret: mam.startSmartUpdate, err: any) => void): void

        /**添加自定义事件，用于后端统计 */
        addEvent(params: { name: string }): void
    }
    namespace mam {
        interface checkUpdate {
            /**操作成功状态值 */
            status: boolean

            result: {
                /**是否有更新 */
                update: boolean

                /**设备上当前版本是否被强行关闭 */
                closed: boolean

                /**新版本版本号 */
                version: string

                /**新版本更新描述 */
                versionDes: string

                /**提示用户应用版本被强行关闭时弹框的提示语 */
                closeTip: string

                /**提示用户有更新时弹框的提示语 */
                updateTip: string

                /**新版本安装包的下载地址 */
                source: string

                /**新版本的发布时间 */
                time: string
            }
        }
        interface checkSmartUpdate {
            packages: Array<{
                /**云修复包序号 */
                incNo: string

                /**是否是静默更新，布尔类型 */
                silent: boolean

                /**更新备注，字符串类型 */
                extra: string
            }>
        }
        interface startSmartUpdate {
            /**更新状态，0-准备中 1-下载中 2-解压中 3-全部更新完成 4-失败，数字类型 */
            state: 0 | 1 | 2 | 3 | 4

            /**修复包总数 */
            total: number

            /**当前正在下载或解压第几个修复包，数字类型，从1开始 */
            current: number

            /**当前状态（包括准备、下载、解压）下的进度，数字类型，取值范围0-100 */
            progress: number
        }
    }
}