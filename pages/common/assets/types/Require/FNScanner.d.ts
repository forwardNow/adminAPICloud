declare namespace api.Require {
    interface TRequire {
        "FNScanner": FNScanner
    }

    interface FNScanner {
        /**打开自带默认 UI 效果的二维码/条形码扫描页面，本界面相当于打开一个 window 窗口，其界面内容不支持自定义 */
        open(callback: (ret: FNScanner.openRet, err: any) => void): void
        open(params: FNScanner.open, callback: (ret: FNScanner.openRet, err: any) => void): void

        /**打开二维码/条码扫描器 */
        openScanner(callback: (ret: FNScanner.openRet, err: any) => void): void

        openScanner(params: FNScanner.openScanner, callback: (ret: FNScanner.openRet, err: any) => void): void

        /**打开可自定义的二维码/条形码扫描器 【注】：该接口需要在apiready中做生命周期处理，详情见接口onpause，onresume */
        openView(params: FNScanner.openView, callback: (ret: FNScanner.openRet, err: any) => void): void

        /**通知当前本模块app进入回到前台。此时模块会进行一些资源的恢复操作，防止照相机回来之后黑屏
         * 【注】：该方法需要在apiready中调用
         */
        onResume(): void

        /**通知当前本模块app进入后台。此时模块会进行一些资源的暂停存储操作，防止照相机回来之后黑屏
        * 【注】：该方法需要在apiready中调用
        */
        onPause(): void

        /**重设可自定义的二维码/条形码扫描器的大小和位置 */
        setFrame(params: FNScanner.xywh): void

        /**关闭自定义大小的二维码/条码扫描器 */
        closeView(): void

        /**二维码/条形码图片解码 */
        decodeImg(params: {
            /**描述：（可选项）扫描结束后的提示音文件路径，要求本地路径（fs://、widget://），为保证兼容性，推荐使用 wav 格式的短音频文件 */
            sound?: string

            /**描述：（可选项）要识别的图片路径，要求本地路径（fs://、widget://），若不传则打开系统相册 */
            path?: string
        }, callback: (ret: {
            /**是否解码成功 */
            status: boolean

            /**扫描的二维码/条形码信息 */
            content: string
        }, err: {
            /**
             * 错误码
             * 1：cameraError（访问摄像头失败）
             * 2：albumError（访问相册失败）
             * 3：图片识别失败，请检查图片是否正确
             * -100：图片识别失败，编码格式不支持
             *  */
            code: number
        }) => void): void

        /**将字符串生成二维码/条形码图片 */
        encodeImg(params: {
            /**
             * （可选项）生成图片的类型，
             * 默认值：'qr_image',
             * bar_image（生成条形码图片）
             * qr_image（生成二维码图片）
             *  */
            type?: "bar_image" | "qr_image"

            /**所要生成的二维码/条形码字符串，当 type 为 bar_image 时，该值只能为数字字符串 */
            content: string

            /**
             * 描述：（可选项）扫描的二维码/条形码图片是否自动保存到相册
             * 默认值：false
             */
            saveToAlbum?: boolean

            /**（可选项）扫描的二维码/条形码图片保存所需要的参数，若不传则不保存 */
            saveImg?: FNScanner.saveImg

        }, callback: (ret: FNScanner.encodeImgRet, err: {
            /**错误码
             * 2：albumError（访问相册失败）
             */
            code: number
        }) => void): void

        /**打开/关闭闪光灯（在Android上，已打开扫码视图时有效） */
        switchLight(params: {
            /**描述：（可选项）打开/关闭闪光灯
             * 默认值：'off'
             * on（打开）|off（关闭）
             */
            status: "on" | "off"
        }): void



    }

    namespace FNScanner {
        interface open extends openCommn {
            /**（可选项）文字样式 */
            font?: FNScanner.font
        }

        interface openScanner extends openCommn {
            /**（可选项）文字样式 */
            font?: FNScanner.openScannerFont
        }

        interface openCommn {
            /**描述：（可选项）扫描结束后的提示音文件路径，要求本地路径（fs://、widget://），为保证兼容性，推荐使用 wav 格式的短音频文件 */
            sound?: string

            /**
             * 描述：（可选项）扫描页面是否自动旋转（横竖屏）
             * 默认值：false
             */
            autorotation?: boolean

            /**
             * 描述：(可选项) 字符串类型；竖屏时扫描线的颜色,支持支持rgb、rgba、#；
             * 默认值：模块自带图片颜色
             */
            verticalLineColor?: string

            /**
             * 描述：（可选项）扫描的二维码/条形码图片是否自动保存到相册
             * 默认值：false
             */
            saveToAlbum?: boolean

            /**
             * 描述：(可选项) 字符串类型；横屏时扫描线的颜色,支持支持rgb、rgba、#； (android不支持，android的横竖屏是一个颜色)
             * 默认值：模块自带图片颜色
             */
            landscapeLineColor?: string

            /**
             * 描述：(可选项) 字符串类型；二维码/条形码界面扫码界面底下的文字
             * 默认值：'对准条形码/二维码，即可自动扫描'
             */
            hintText?: string

            /**
             * 描述：(可选项) 相册按钮文字
             * 默认值：'相册'
             */
            albumText?: string

            /**
             * 描述：(可选项) 灯光开启文字
             * 默认值：'轻触照亮'
             */
            lightText?: string

            /**
             * 描述：(可选项) 灯光关闭文字
             * 默认值：'轻触关闭'
             */
            closeText?: string

            /**
             * 描述：(可选项) 是否隐藏相册按钮
             * 默认值：false
             */
            isAlbum?: boolean

            /**（可选项）扫描的二维码/条形码图片保存所需要的参数，若不传则不保存 */
            saveImg?: FNScanner.saveImg
        }

        interface saveImg {
            /**保存的文件路径；若路径不存在，则创建此路径，只支持fs://协议 */
            path: string

            /**生成图片的宽度，默认：200 */
            w?: number

            /**生成图片的高度，默认：200 */
            h?: number
        }

        interface font extends openScannerFont {
            /**相册按钮文字大小、颜色 */
            albumText: FNScanner.sizeColor
            /**灯光开启/关闭文字大小、颜色 */
            lightText: FNScanner.sizeColor
        }

        interface openScannerFont {
            /**二维码/条形码界面扫码界面底下的文字大小、颜色 */
            hintText: FNScanner.sizeColor
        }

        interface sizeColor {
            /**
             * hintText:二维码/条形码界面扫码界面底下的文字大小
             * albumText:相册按钮文字大小
             * lightText:灯光开启/关闭文字大小*/
            size: number

            /**
             * hintText:二维码/条形码界面扫码界面底下的文字颜色
             * albumText:相册按钮文字颜色，
             * lightText:灯光开启/关闭文字颜色
             * 支持#、rgb、rgba；默认：#FFFFFF 
             * 默认：#FFFFFF*/
            color: string
        }

        interface openRet extends imgAlbumPath {
            /**
             * 扫码事件类型
             * show（模块显示）
             * cameraError（访问摄像头失败）
             * albumError（访问相册失败）
             * cancel（用户取消扫码）
             * selectImage（用户从系统相册选取二维码图片）
             * success（识别二维码/条码图片成功）
             * fail（扫码失败）
             */
            eventType: "show" | "cameraError" | "albumError" | "cancel" | "selectImage" | "success" | "fail"

            /**扫描的二维码/条形码信息 */
            content: string
        }

        interface imgAlbumPath {
            /**需要保存的二维码图片绝对路径（自定义路径） */
            imgPath: string

            /**需要保存的二维码图片绝对路径（相册路径） */
            albumPath: string
        }

        interface encodeImgRet extends imgAlbumPath {
            /**是否解码成功 */
            status: boolean
        }

        interface xywh {
            /**
             * 描述：openView:模块|rectOfInterest:扫码识别区域左上角的 x 坐标（相对于所属的 Window 或 Frame）
             *  默认：0 |0|原值
             */
            x?: number

            /**
             * 描述：模块|rectOfInterest:扫码识别区域左上角的 y 坐标（相对于所属的 Window 或 Frame）
             * 默认：0 |0|原值
             */
            y?: number

            /**
             * 描述：模块|rectOfInterest:扫码识别区域的宽度
             * 默认：所属的 Window 或 Frame 的宽度 |rectOfInterest:扫码区rect的宽度 |原值
             */
            w?: number

            /**
             * 描述：模块|rectOfInterest:扫码识别区域的高度
             * 默认：所属的 Window 或 Frame 的高度|rectOfInterest:扫码区rect的高度|原值
             */
            h?: number
        }

        interface openView extends open {
            /**（可选项）扫描器的位置及尺寸，在安卓平台宽高比须跟屏幕宽高比一致，否则摄像头可视区域的图像可能出现少许变形；w和h属性最好使用api.winWidth和api.winHeight,这样不会导致变形，也不会出现手机必须要在一定的距离上才能扫描出来的现象 */
            rect?: FNScanner.xywh

            /**（可选项）在扫码区域上的扫码识别区域，仅在iOS平台有效 */
            rectOfInterest?: FNScanner.xywh

            /**
             * 描述：（可选项）连续扫描间隔；
             * 默认值：3
             */
            interval?: number

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
    }

}