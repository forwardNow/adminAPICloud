declare namespace api.Require {
    interface TRequire {
        'videoPlayer': videoPlayer
    }
    interface videoPlayer {
        /**打开一个自带界面的视频播放器，本播放器为全屏横屏显示，支持屏幕随设备自动旋转。用户单击播放器时，会弹出 foot 和 head 导航条，再次单击则关闭之。仅 setPath 接口对本接口打开的播放器有效 */
        play(params: videoPlayer.play, callback: (ret: videoPlayer.eventType, err: void) => void): void

        /**打开一个视频播放器 */
        open(params: videoPlayer.open, callback: (ret: videoPlayer.openRet, err: void) => void): void

        /**设置音/视频的文件路径 */
        setPath(params: videoPlayer.setPath, callback: (ret: videoPlayer.statusDuration, err: void) => void): void

        /**开始播放 */
        start(): void

        /**暂停播放 */
        pause(): void

        /**关闭播放器 */
        close(): void

        /**显示视频播放视图 */
        show(): void

        /**隐藏视频播放视图 */
        hide(): void

        /**全屏播放（横屏模式） */
        fullScreen(): void

        /**取消全屏播放 */
        cancelFullScreen(): void

        /**快进 */
        forward(params: {
            /**描述：快退的秒数 */
            seconds: number
        }): void

        /**快退*/
        rewind(params: {
            /**描述：快退的秒数 */
            seconds: number
        }): void

        /**跳转*/
        seekTo(params: {
            /**描述：快退的秒数 */
            seconds: number
        }): void

        /**设置屏幕亮度*/
        setBrightness(params: {
            /**
             * 描述：（可选项）设置的屏幕的亮度，取值范围：0-100，在 iOS 平台上设置的是系统屏幕亮度。Android 平台上设置的本应用内的屏幕亮度
             * 默认值：80
             *  */
            brightness?: number
        }): void

        /**获取当前屏幕亮度值 */
        getBrightness(callback: (ret: {
            /**当前屏幕亮度值 */
            brightness: number, err: void
        }) => void): void

        /**设置音量*/
        setVolume(params: {
            /**
             * 描述：（可选项）音量大小，取值范围：0-1
             * 默认值：0
             *  */
            volume?: number
        }): void

        /**获取当前播放音量 */
        getVolume(callback: (ret: {
            /**当前音量值 */
            volume: number, err: void
        }) => void): void

        /**添加动作监听(当全屏或者fixed为true且页面不能被左右滑动时有效) */
        addEventListener(params: videoPlayer.addEventListener, callback: (
            ret: {
                eventType: videoPlayer.eventType

                /**当前播放位置，单位为s，仅当 name 为 play，eventType 为 playing 时有值 */
                current: number
            }, err: void) => void): void

        /**移除动作监听 */
        removeEventListener(params: videoPlayer.addEventListener): void

        /**设置视频播放器位置、尺寸，以及是否全屏 */
        setRect(params: videoPlayer.setRect, callback: (ret: void, err: void) => void): void

        /**打开一个自带界面的视频播放器，本播放器为全屏横屏显示，支持屏幕随设备自动旋转。用户单击播放器时，会弹出 foot 和 head 导航条，再次单击则关闭之。 */
        openPlay(params: videoPlayer.openPlay, callback: (ret: videoPlayer.openPlayRet, err: void) => void): void

        /**该方法需要在监听到物理按键时调用（只对openPlay接口有效，暂仅支持android） */
        onBack(): void

        /**判断当前窗口是否全屏（只对openPlay接口有效） */
        isFullscreen(callback: (ret: {
            // 布尔类型，是否全屏
            isFullscreen: boolean
        }) => void): void

        /**该方法需要在pause事件中调用（只对openPlay接口有效，暂仅支持android） */
        onPause(): void

        /**该方法需要在resume事件中调用（只对openPlay接口有效，暂仅支持android） */
        onResume(): void

        /**判断自定义按钮是否被选中 注意:只对openPlay接口开放 */
        customBtnIsSelected(params: videoPlayer.index, callback: (ret: {
            isSelected: boolean // 布尔类型，是否选中
        }, err: void) => void): void

        /**设置自定义按钮被选中 注意:只对openPlay接口开放 */
        setCustomBtnSelected(params: videoPlayer.index): void

        /**设置自定义按钮被取消 注意:只对openPlay接口开放 */
        setCustomBtnCancelSelected(params: videoPlayer.index): void
    }

    namespace videoPlayer {
        interface play extends openPlayCommen {
            /**描述：（可选项）模块的样式设置 */
            styles?: {

                head?: videoPlayer.palyHead
                /**播放器底部导航条样式  */
                foot?: videoPlayer.playFoot
            }

            /**
             * 描述：可选项）视频播放页面是否支持自动旋转（横竖屏），若为 false 则手动点击右下角按钮旋转
             * 默认值：true（根据设备当前方向自动适配旋转）
             * */
            autorotation?: boolean
            /**
             *描述：（可选项）缩放模式 该参数仅支持ios
             * 默认值：'scaleAspectFit'
             * 取值范围:scaleNone->scalingModeNone|scaleToFill->填充|scaleAspectFit->适应|scaleModeFill->scalingModeFill|
             */
            scalingMode?: "scaleNone" | "scaleToFill" | "scaleAspectFit" | "scaleModeFill"
        }

        interface palyHead extends head {
            /**
         * 描述：顶部右边设置按钮大小
         * 默认：44
         */
            setSize?: number

            /**
           * 描述：顶部右边设置按钮背景图片，要求本地路径（widget://、fs://）；
           * 默认：设置小图标
           */
            setImg?: string

        }

        interface openPlayHead extends head {
            /**
             * 距离模块顶部的距离
             * 默认：20(仅支持iOS)
             */
            y?: number

            customButtons: [videoPlayer.customButtons, videoPlayer.customButtons]
        }

        interface customButtons {
            /**
             * 描述：顶部右边设置按钮大小
             * 默认：30(仅支持iOS)
             */
            w?: number,

            /**
             * 描述：顶部右边设置按钮大小
             * 默认：30(仅支持iOS)
             */
            h?: number,

            /** * 描述：顶部右边设置自定义按钮(未选中状态)，要求本地路径（widget://、fs://）*/
            img?: string

            /** * 描述：顶部右边设置自定义按钮(选中状态)，要求本地路径（widget://、fs://）；*/
            imgSelected?: string

            /**
             * 描述:顶部右边设置自定义按钮是否被选中，
             * 默认：false； */
            isSelected?: boolean
        }

        /**播放器顶部导航条样式 */
        interface head {
            /**
             * 描述：顶部导航条背景，支持#、rgb、rgba、img
             * 默认：rgba(161,161,161,0.5)
             */
            bg?: string

            /**
           *描述：顶部导航条的高 
           * 默认：44
           */
            height?: number

            /**
           *描述：顶部标题字体大小
           * 默认：20
           */
            titleSize?: number

            /**
           * 描述：顶部标题字体颜色，支持#、rgb、rgba 
           * 默认：#fff
           */
            titleColor?: string

            /**
           * 描述：顶部返回按钮大小 
           * 默认：44
           */
            backSize?: number

            /**
           * 描述：顶部返回按钮的背景图片，要求本地路径（widget://、fs://）；
           * 默认：返回小箭头图标
           */
            backImg?: string
        }

        interface playFoot extends footCommen {
            /**
                 * 描述：底部下一集按钮大小
                 * 默认：44
                 */
            nextSize?: number

            /**
            * 描述：底部下一集按钮的背景图片，要求本地路径（widget://、fs://）；
            * 默认：下一集按钮图标
            */
            nextImg?: string
        }
        interface OpenPlayFoot extends footCommen {
            /**
             *描述：底部横屏/竖屏按钮大小 
             * 默认：foot的高度
             */
            rotationSize: number                   //（可选项）数字类型；；
        }

        /**播放器底部导航条样式 */
        interface footCommen {
            /**
            *描述：底部导航条背景，支持#、rgb、rgba、img 
            * 默认：rgba(161,161,161,0.5)
            */
            bg?: string

            /**
           *描述：底部导航条的高
           * 默认：44
           */
            height?: number

            /**
          * 描述：底部播放/暂停按钮大小
          * 默认：44
          */
            playSize?: number

            /**
           * 描述：底部播放按钮的背景图片，要求本地路径（widget://、fs://）；
           * 默认：播放按钮图标
           */
            playImg?: string

            /**
            * 描述：底部暂停按钮的背景图片，要求本地路径（widget://、fs://）；
            * 默认：暂停按钮图标
            */
            pauseImg?: string

            /**
           * 描述：底部时间标签大小
           * 默认：14
           */
            timeSize?: number

            /**
            * 描述：底部时间标签颜色，支持#、rgba、rgb
            * 默认：#fff
            */
            timeColor?: string

            /**
            * 描述：底部进度条滑块背景图片，要求本地路径（widget://、fs://）；
            * 默认：滑块小图标((在iOS上需要添加二倍图或者三倍图,否则会出现毛边))
            */
            sliderImg?: string

            /**
             * 描述：进度条背景色，支持#、rgba、rgb
             * 默认：#96969
             */
            progressColor?: string

            /**
            * 描述：滑动后的进度条背景色，支持#、rgba、rgb
            * 默认：#76EE00
            */
            progressSelected?: string

            /**
             * 描述：底部竖屏按钮的背景图片，要求本地路径（widget://、fs://）；
             * 默认：竖屏按钮图标
             */
            verticalImg?: string

            /**
            * 描述：底部横屏按钮的背景图片，要求本地路径（widget://、fs://）；
            * 默认：横屏按钮图标
            */
            horizontalImg?: string
        }

        interface open extends fixedOnFixed {
            /**模块的位置及尺寸 */
            rect?: videoPlayer.rect

            /**
            *描述：顶部导航条背景，支持#、rgb、rgba、img 
            * 默认：rgba(161,161,161,0.5)
            */
            bg?: string

            /**描述：（可选项）文档的路径，支持网络和本地（fs://）路径，在 android 平台上不支持 widget */
            path?: string

            /**
             * 描述：（可选项）打开时是否自动播放
             * 默认值：true（自动播放）
             *  */
            autoPlay?: boolean

            /**
             *描述：（可选项）缩放模式 该参数仅支持ios
             * 默认值：'scaleAspectFit'
             * 取值范围:scaleNone->scalingModeNone|scaleToFill->填充|scaleAspectFit->适应|scaleModeFill->scalingModeFill|
             */
            scalingMode?: "scaleNone" | "scaleToFill" | "scaleAspectFit" | "scaleModeFill"

            /**（可选项）封面图路径，播放器打开尚未播放时的封面图，要求本地路径（widget://、fs://） */
            coverImg?: boolean

            /**
             * 描述：（可选项）是否循环播放 该参数仅支持ios
             * 默认值：false
             *  */
            loop?: boolean
        }

        interface openRet extends eventType, statusDuration { }
        interface statusDuration {
            /**
            * 是否打开播放组件并显示，true|false；Will be deprecated in ther future
            */
            status: boolean

            /**
             * 视频总时长，单位为s，仅当 status 为 true并且eventType=playing 时有值  限Android
             */
            duration: number
        }

        interface openPlayRet extends eventType, statusDuration {

            /**( true代表横屏，false代表竖屏当前是横屏还是竖屏，仅字段为back时有效) */
            value: boolean

            /**用户自定义按钮的点击index，从右到左排列 */
            btnIndex: number

            /**用户自定义按钮是否被选中 */
            isSelected: boolean
        }

        interface setPath {
            /**描述：（可选项）文档的路径，支持网络和本地（fs://）路径，在 android 平台上不支持 widget */
            path: string

            /**
            *描述：（可选项）字符串类型；视频背景颜色，支持#、rgb、rgba (在切换视屏为了防止闪屏,请根据自己的视频调节颜色)
            * 默认：#fff
            */
            bg?: string

            /**（可选项）封面图路径，播放器打开尚未播放时的封面图，要求本地路径（widget://、fs://） */
            coverImg?: boolean

            /**
             * 描述：（可选项）当设置 play 接口打开的视频时，本参数表示设置该视频的标题，本参数仅对 play 接口有效
             * 默认值：原标题
             */
            title?: string
        }

        /**回调事件类型 show（打开成功并显示）|back（返回）|play（播放）|pause（暂停）| next （下一集）|failed（播放失败）*/
        interface eventType {
            eventType: "show" | "back" | "play" | "pause" | "next " | "failed"
        }

        /** 所要移除 | 监听的动作名称*/
        interface addEventListener {
            /**
             *描述：（可选项）所要监听的动作名称 
             * leftUp'：播放器靠左的二分之一内的上滑事件，每滑动5（百分比）回调执行一次
             * 'leftDown'：播放器靠左的二分之一内的下滑事件，每滑动5（百分比）回调执行一次
             * 'rightUp'：播放器靠右的二分之一内的上滑事件，每滑动5（百分比）回调执行一次
             * 'rightDown'：播放器靠右的二分之一内的下滑事件，每滑动5（百分比）回调执行一次
             * 'swipeLeft'：播放器上的左滑事件，每滑动5（百分比）回调执行一次
             * 'swipeRight'：播放器上的右滑事件，每滑动5（百分比）回调执行一次
             * 'click'：点击播放器事件（单击手势）
             * 'doubleClick'：双击播放器事件（单击手势）
             * 'play'：播放事件，包括开始播放（start）、正在播放（playing）、暂停（pause）、停止（stop）、播放完成（complete），在回调里用 eventType 区分。播放事件为 playing 时，回调函数每秒执行四次
             */
            name?: "leftUp" | "leftDown" | "rightUp" | "rightDown" | "swipeLeft" | "swipeRight" | "click" | "doubleClick" | "play"
        }

        interface openPlay extends openPlayCommen, fixedOnFixed {
            rect?: videoPlayer.rect

            /**描述：（可选项）模块的样式设置 */
            styles?: {
                head?: videoPlayer.openPlayHead
                /**播放器底部导航条样式  */
                foot?: videoPlayer.OpenPlayFoot
            }

            /**描述：（可选项）视频未播放或者视频暂停时在视频播放器中间显示（不传不显示） */
            centerPlayBtn?: {
                /**
                 * 按钮大小；
                 * 默认：30
                 *  */
                size: number,

                /**图标路径 */
                iconPath: string
            }

            /**
             * 描述：可选项）视频播放页面是否支持自动旋转（横竖屏），若为 false 则手动点击右下角按钮旋转
             * 默认值：true（根据设备当前方向自动适配旋转）
             * */
            autorotation?: boolean
        }

        interface openPlayCommen {
            /**描述：（可选项）聊天输入框模块可配置的文本 */
            texts?: {
                /**顶部文字 */
                head?: {
                    /**顶部标题文字 */
                    title?: string
                }
            }

            /**描述：（可选项）文档的路径，支持网络和本地（fs://）路径，在 android 平台上不支持 widget */
            path?: string

            /**
             * 描述：（可选项）打开时是否自动播放
             * 默认值：true（自动播放）
             */
            autoPlay?: boolean

            /**（可选项）封面图路径，播放器打开尚未播放时的封面图，要求本地路径（widget://、fs://） */
            coverImg?: boolean

            /**
            * 描述：（可选项）播放的资源是否是音频文件，若是则开始播放后不移除封面图 coverImg
            *默认值：false 
            */
            audio?: boolean
        }

        /**模块的位置及尺寸 */
        interface rect {
            /**
             * 描述：模块左上角的 x 坐标（相对于所属的 Window 或 Frame）
             *  默认：0
             */
            x?: number

            /**
             * 描述：模块左上角的 y 坐标（相对于所属的 Window 或 Frame）
             * 默认：0
             */
            y?: number

            /**
             * 描述：模块的宽度
             * 默认：所属的 Window 或 Frame 的宽度
             */
            w?: number

            /**
             * 描述：模块的高度
             * 默认：w的3/4
             */
            h?: number
        }

        interface fixedOnFixed {
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

        interface index {

            /**
            * 描述：（可选项）用户自定义按钮的点击index，从右到左排列
            *默认值：1
            */
            index?: number
        }

        interface setRect extends rect {
            /**
            * 描述：（可选项）模块的位置及尺寸是否全屏（true不显示状态栏，false显示状态栏）
            * 默认值：false（不随全屏） */
            fullscreen?: boolean
        }



    }

}