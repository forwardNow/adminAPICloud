declare namespace api.Require {
    interface TRequire {
        'iflyRecognition': iflyrecognition
    }
    interface iflyrecognition {
        /**创建科大讯飞引擎 */
        createUtility(
            params: {
                /**从科大讯飞开放平台得到的 appid（android端） */
                android_appid: string

                /**从科大讯飞开放平台得到的 appid（iOS端） */
                ios_appid: string
            }, callback: (ret: iflyrecognition.status, err: any) => void): void

        /**识别语音返回文字*/
        record(
            params: {
                /**
                 * 描述：（可选项）前断点时间（静音时间，即用户多长时间不说话做超时处理），范围是0-10000单位ms
                 * 默认值：5000
                 */
                vadbos?: number

                /**
                 * 描述：可选项）后断点时间（静音时间，即用户多长时间不说话做超时处理），单位ms，范围是0-10000
                 * 默认值：16000
                 */
                vadeos?: number

                /**
                 * 描述：（可选项）采样率（支持16000，8000）
                 * 默认值：5000
                 */
                rate?: number

                /**
                * 描述：（可选项）返回的语句是否有标点符号，取值范围：0-无，1-有
                * 默认值：1
                */
                asrptt?: number

                /**
               * 描述：（可选项）录制的音频文件保存路径（如fs://123.pcm,一定要加后缀名），不支持widget 协议。注意：在 iOS 平台上由于科大讯飞 SDK 限制，只支持 pcm 格式音频保存
               * 备注：若不传则不保存
               */
                audioPath?: string

            }, callback: (
                ret: {
                    status: iflyrecognition.status,

                    /**识别语音后的文字 */
                    wordStr: string
                }, err: iflyrecognition.msg) => void): void

        /**停止录音 */
        stopRecord(): void

        /**取消语音识别 */
        cancelRecord(): void

        /**添加录音音量显示器 */
        addRecordHUD(
            params: {
                /** 
                 * 描述：（可选项）录音音量标识的圆心坐标
                 * 默认值：当前设备屏幕的宽的一半 
                 * */
                centerX?: number

                /** 
                 * 描述：（可选项）录音音量标识的圆心坐标
                 * 默认值：100
                 * */
                centerY?: number

                /** 
                 * 描述：（可选项）录音音量标识的圆心半径
                 * 默认值：60 
                 * */
                radius?: number

                /**
                 * 描述：（可选项）中间透明区域的半径
                 * 默认值：radius的1/2
                 *  */
                transparentR?: number

                /**
               * 描述：（可选项）录音标识的背景色，支持 rgb，rgba，#
               * 默认值：#AAAAAA
               *  */
                bg?: string

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
            }, callback: (
                ret: {
                    /**录音音量大小 */
                    volume: number
                }, err: iflyrecognition.msg) => void): void

        /**显示录音音量显示器*/
        showRecordHUD(): void

        /**隐藏录音音量显示器*/
        hideRecordHUD(): void

        /**用语音读取文字信息，最大的字节数为1k */
        readFile(
            params: {
                /**要读取的文字信息 */
                readStr: string

                /**
                 * 描述：（可选项）朗读的语速，范围是0-100
                 * 默认值：60
                 */
                speed?: number

                /**
                 * 描述：（可选项）朗读的声音大小，范围是0-100
                 * 默认值：60
                 */
                volume?: number

                /**（可选项）朗读人（兼容旧版本：0-xiaoyan；1-xiaoyu；） */
                voice: 'xiaoyan' | 'xiaoyu' | 'catherine' | 'henry' | 'vimary' | 'vixy' | 'vixq' | 'vixf' | 'vixl' | 'vixq' | 'vixr' | 'vixyun' | 'vixk' | 'vixqa' | 'vixying' | 'vixx' | 'vinn' | 'vils'

                /**
                 * 描述：（可选项）采样率(支持16000，8000)
                 * 默认值：16000
                 */
                rate?: number

                /**
                 * 描述：（可选项）朗读的音频保存路径（如fs://123.pcm，一定要加后缀名），不支持widget 协议。注意：在 iOS 平台上由于科大讯飞 SDK 限制，只支持 pcm 格式音频保存
                 * 备注：若不传则不保存
                 */
                audioPath?: string

                /**
                 * 描述：（可选项）是否禁用讯飞 SDK 默认设置。禁用后可避免与音视频录制模块冲突问题
                 * 默认：false
                 */
                disableDefaultSettings?: boolean
            }, callback: (
                ret: {
                    status: iflyrecognition.status

                    /**朗读的进度 */
                    speakProgress: number
                }, err: iflyrecognition.msg) => void): void

        /**停止朗读 */
        stopRead(): void

        /**暂停朗读（用 resumeRead 接口恢复朗读） */
        pauseRead(): void

        /**恢复朗读*/
        resumeRead(): void
    }

    namespace iflyrecognition {
        /**操作成功状态值 */
        interface status {
            status: boolean
        }

        /**返回的错误信息 */
        interface msg {
            msg: string
        }
    }
}