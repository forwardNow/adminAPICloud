declare namespace api.Require {
    interface TRequire {
        "apsaraShortVideoBase": apsaraShortVideoBase
    }

    interface apsaraShortVideoBase {
        /**打开视频录制页面 */
        openRecordView(params: apsaraShortVideoBase.openRecordView, callback: (ret: apsaraShortVideoBase.ret, err: any) => void): void

        /**打开视频编辑页面 */
        openEditorView(params: apsaraShortVideoBase.openEditorView, callback: (ret: apsaraShortVideoBase.ret, err: any) => void): void
    }

    namespace apsaraShortVideoBase {
        interface openRecordView {
            /**录制视频参数 */
            recordConfig: apsaraShortVideoBase.recordConfig

            /**UI配置 */
            UIConfig: apsaraShortVideoBase.UIConfig
        }

        interface recordConfig {
            /**
             * 摄像头方向；0：前摄像头，1：后摄像头；
             * 默认：0 */
            position: 0 | 1

            /**
             * 闪光灯模式；0：关闭，1：开启，2：自动；
             * 默认：2 
             */
            torchMode: 0 | 1 | 2

            /**
             * 美颜状态；
             * 默认：tr
             ue */
            beautifyStatus: boolean

            /**
             * 美颜度；取值范围：0-100；
             * 默认：60
              */
            beautifyValue: number

            /**
             * 输出路径；仅支持fs；注意输出路径不含文件及后缀名称；
             * 默认：'f
             s://apsaraShortVideoBase/video.mp4' */
            outputPath: string

            /**
             * 视频分辨率；0：360P，1：480P，2：540P，3：720P；
             * 默认：3 
             */
            size: 0 | 1 | 2 | 3

            /**
             * 视频比例；0：3:4，1：9:16，2：1:1；
             * 默认：0 
             */
            ratio: 0 | 1 | 2

            /**
             * 最小时长；
             * 默认：5 
             */
            minDuration: number

            /**
             * 最大时长；
             * 默认：30
              */
            maxDuration: number

            /**
             * 视频质量；0：极高，1：高，2：中等，3：低，4：较低，5：极低；
             * 默认：0 
             */
            videoQuality: 0 | 1 | 2 | 3 | 4 | 5

            /**
             * 编码方式；0：软编，1：硬编；
             * 默认：0 
             */
            encodeMode: 0 | 1

            /**
             * 帧率；
             * 默认：20
              */
            fps: number

            /**
             * 关键帧间隔；
             * 默认：5 
             */
            gop: number
        }

        interface UIConfig {
            /**
             * 背景颜色，支持rgb、rgba、#；
             * 默认：'#232A42'
             */
            backgroundColor: string

            /**
             * 录制进度条 已录制颜色，支持rgb、rgba、#；
             * 默认：'#EF4B81'
             */
            timelineTintColor: string

            /**
             * 录制进度条 背景颜色，支持rgb、rgba、#；
             * 默认：'#232A42'
             */
            timelineBackgroundColor: string


            /**
             *录制进度条 视频删除部分选中颜色，支持rgb、rgba、#；
             * 默认：'#FF0000'
             */
            timelineDeleteColor: string

            /**
             * 裁剪页裁剪条下边框颜色，支持rgb、rgba、#；
             * 默认：'#FF0000'(ios)
             */
            durationLabelTextColor: string

            /**
             * 裁剪页裁剪条上边框颜色，支持rgb、rgba、#；
             * 默认：'#FF0000'(ios)
             */
            cutBottomLineColor: string

            /**
             * 裁剪页裁剪条边框颜色，支持rgb、rgba、#；
             * 默认：'#FF0000'(android)
             */
            cutTopLineColor: string

            /**
             * 隐藏已录制时间提示框；
             * 默认：false 
             */
            hiddenDurationLabel: boolean

            /**
             * 隐藏美颜按钮
             * 默认：false 
             */
            hiddenBeautyButton: boolean

            /**
             * 隐藏切换摄像头按钮；
             * 默认：false 
             */
            hiddenCameraButton: boolean

            /**
             * 隐藏闪光灯按钮；
             * 默认：false 
             */
            hiddenFlashButton: boolean

            /**
             * 隐藏相册导入按钮；
             * 默认：false 
             */
            hiddenImportButton: boolean

            /**
             * 隐藏删除视频片段按钮；
             * 默认：false 
             */
            hiddenDeleteButton: boolean

            /**
             * 隐藏录制完成按钮；
             * 默认：false 
             */
            hiddenFinishButton: boolean

            /**
             * 是否录制单段视频；
             * 默认：false(IOS) 
             */
            recordOnePart: boolean

            /**
             * 相册界面是否显示跳转相机按钮；
             * 默认：true(IOS)
             */
            showCameraButton: boolean

            /**
             * 录制模式
             * 默认：0(IOS)
             * 0：混合模式（短按自动录制，再次短按停止录制+长按录制，松开停止录制）
             * 1：短按模式（短按自动录制，再次短按停止录制）
             * 2：长按模式（长按录制，松开停止录制）
             */
            recordType: 0 | 1 | 2

            /**
             * 录制切换为无滤镜选项时提示文字；
             * 默认：'无滤镜' (IOS)  
             */
            noneFilterText: string
        }

        interface openEditorView {
            /**
             * （可选项）视频输出路径
             * 默认：'fs://apsaraShortVideoBase/video.mp4'
             */
            outputPath?: string

            /**输出大小 :(IOS)*/
            outputSize?: {

                /**
                 * 描述：编辑视频宽
                 * 默认：屏幕宽度
                 */
                w?: number

                /**
                 * 描述：编辑视频高
                 * 默认：屏幕高度
                 */
                h?: number
            }

            /**
             * 描述：（可选项）过滤相册视频最小时长
             * 默认：0
             */
            minDuration?: number

            /**
             * 描述：（可选项）过滤相册视频最大时长
             * 默认：0
             */
            maxDuration?: number

            /**
             * 描述：（可选项）裁剪模式；0：填充，1：裁剪
             * 默认：0
             */
            cutMode?: 0 | 1

            /**
             * 描述：（可选项）视频质量；；0：极高，1：高，2：中等，3：低，4：较低，5：极低；
             * 默认：0
             */
            videoQuality?: 0 | 1 | 2 | 3 | 4 | 5

            /**
             * 描述：（可选项）编码方式；0：软编，1：硬编；
             * 默认：0
             */
            encodeMode?: 0 | 1

            /**
             * 描述：（可选项）帧率
             * 默认：20
              */
            fps?: number

            /**
             * 描述：（可选项）关键帧间隔
             * 默认：5 
             */
            gop?: number

            /**
             * 描述：（可选项） 裁剪码率
             * 默认：10 
             */
            bitrate?: number

            /**
             * 描述：（可选项）是否仅展示视频
             * 默认：true 
             */
            videoOnly?: boolean

            /**
             * 描述：（可选项）填充的背景颜色：(IOS)
             * 默认：5 
             */
            fillBackgroundColor?: string

            /**
             * 描述：（可选项）是否使用gpu裁剪
             * 默认：false 
             */
            gpuCrop?: boolean




        }

        interface ret {
            /**是否录制成功 */
            status: boolean,

            /**视频保存路径 */
            path: string,

            /**图片保存路径 */
            imagePath: string

            /**失败原因 */
            msg: string
        }


    }
}