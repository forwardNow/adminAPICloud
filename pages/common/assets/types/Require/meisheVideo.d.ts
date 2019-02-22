declare namespace api.Require {
    interface TRequire {
        "meisheVideo": meisheVideo
    }
    interface meisheVideo {
        /**打开视频录制页面 */
        open(callback: (ret: meisheVideo.ret, err: meisheVideo.err) => void): void
        open(params: meisheVideo.open, callback: (ret: meisheVideo.ret, err: meisheVideo.err) => void): void

        /**关闭录制页面 */
        close(): void

        /**打开视频编辑页面 */
        openClipView(params: meisheVideo.openClipView, callback: (ret: meisheVideo.ret, err: meisheVideo.err) => void): void

        /**关闭编辑视频页面 */
        closeClipView(): void

        /**打开视频预览页面 */
        openPreviewView(params: meisheVideo.openPreviewView, callback: (ret: meisheVideo.ret, err: meisheVideo.err) => void): void

        /**关闭视频预览页面 */
        closePreviewView(): void

        /**打开手电筒 */
        flashOn(): void

        /**关闭手电筒 */
        flashOff(): void

        /**设置背景音乐 */
        setMusic(params: meisheVideo.setMusic, callback: (ret: meisheVideo.ret, err: meisheVideo.err) => void): void

        /**设置背景音乐音量和原声音量 */
        setVolumn(params: meisheVideo.setVolumn, callback: (ret: meisheVideo.ret, err: any) => void): void

        /**生成视频 */
        generateVideo(params: meisheVideo.generateVideo, callback: (ret: meisheVideo.retErr, err: any) => void): void

        /**添加监听 */
        addEventListener(callback: (ret: {
            /**
              * 事件类型
              * showShoot 拍摄页面显示
              * closeShoot 拍摄页面关闭
              * showPreview 预览页面显示
              * closePreview 预览页面关闭
              * startRecord 开始刻录
              * nextStep 下一步
              * chooseMusic 选择音乐
              * chooseVideo 选择视频
              * showEdit 预览页面显示   
              * closeEdit 预览页面关闭
              * confirmClick 编辑页面确定按钮
              */
            eventType: "showShoot" | "closeShoot" | "showPreview" | "closePreview" | "startRecord" | "nextStep" | "chooseMusic" | "chooseVideo" | "showEdit" | "closeEdit" | "confirmClick"
        }, err: any) => void): void

        /**视频转换（仅支持iOS） */
        conversion(params: {
            /**描述：视频文件在相册中的标识符 */
            localIdentifier: string

            /**
           * 描述：码率级别（码率越高视频越清晰，视频文件也越大）
           * 默认：high
           */
            bitrateGrade?: "high" | "medium" | "low"
        }, callback: (ret: meisheVideo.conversionRet, err: any) => void): void

    }
    namespace meisheVideo {

        interface open extends fixedOnfixed, defaultMusic {
            rect: rect
            /**
             * 描述：（可选项）视频时间最大限制
             * 默认：30（秒）
             */
            timeMax?: number

            /**
             * 描述：（可选项）视频时间最小限制
             * 默认：10（秒）
             */
            timeMin?: number
        }

        interface openClipView extends fixedOnfixed, defaultMusic {
            rect: rect
            /**描述：相册视频路径；iOS传入视频文件在相册中的标识符即可 */
            path: string
        }

        interface openPreviewView extends fixedOnfixed {
            rect: rect

            /**描述：视频路径；支持fs:// widget:// 以及系统本地路径；如果是相册标识符（示例：7BCE6D33-70D0-4EDD-942E-D381C7B6179F/L0/001），需调用conversion接口进行转换 */
            lstRecFiles: Array<string>

            /**描述：（可选项）背景音乐出点（defaultMusic有值是为必选项） */
            trimOut?: number
        }

        /** */
        interface setMusic {
            /**描述：默认音频路径（支持fs:// widget:// 以及系统本地路径） */
            musicPath: string

            /**描述：背景音乐入点（单位：秒） */
            trimIn: number

            /**描述：背景音乐出点（单位：秒） */
            trimOut: number
        }

        interface setVolumn {
            /**
             * 描述：背景音乐音量
             * 取值范围：0~100
             */
            BGMVolume: number

            /**
             * 描述：原声音量
             * 取值范围：0~100
             */
            originalSoundVolume: number
        }

        /** */
        interface generateVideo {
            /**
             * 描述：保存路径(仅支持fs:// 和 Android本地路径)
             * 示例路径：‘fs://123.mp4’
             */
            savePath: string

            /**
             * 描述：分辨率
             * 默认：720
             */
            resolution: 360 | 480 | 720 | 1080

            /**
            * 描述：码率级别（码率越高视频越清晰，视频文件也越大）
            * 默认：high
            */
            bitrateGrade: "high" | "medium" | "low"
        }

        interface retErr extends ret, err { }

        interface conversionRet extends ret {
            /**沙盒路径 */
            path: string
        }

        interface rect {
            /**
             * 描述：地图左上角的 x 坐标（相对于所属的 Window 或 Frame）
             *  默认：0
             */
            x?: number

            /**
             * 描述：地图左上角的 y 坐标（相对于所属的 Window 或 Frame）
             * 默认：0
             */
            y?: number

            /**
             * 描述：地图的宽度
             * 默认：所属的 Window 或 Frame 的宽度(300)
             */
            w?: number

            /**
             * 描述：地图的高度
             * 默认：所属的 Window 或 Frame 的高度(300)
             */
            h?: number
        }

        interface defaultMusic {
            /**描述：默认视频路径（支持fs:// widget:// 以及系统本地路径)不传没有背景音乐 */
            defaultMusic?: string
        }

        interface fixedOnfixed {
            /**
           * 描述：（可选项）模块视图添加到指定 frame 的名字（只指 frame，传 window 无效）
           * 默认值：模块依附于当前 window
           *  */
            fixedOn?: string

            /**
             * 描述：（可选项）模块是否随所属 window 或 frame 滚动
             * 默认值：true（不随之滚动）
             *  */
            fixed?: boolean
        }
        /**返回值 */
        interface ret {
            /**是否打开|生成成功 */
            status: boolean,
        }

        interface err {
            /**错误信息 */
            msg: string
        }
    }
}