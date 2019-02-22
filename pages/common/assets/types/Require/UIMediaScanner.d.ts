declare namespace api.Require {
    interface TRequire {
        'UIMediaScanner': UIMediaScanner
    }
    interface UIMediaScanner {
        /** 打开多媒体资源选择器，打开后会全屏显示*/
        open(params: UIMediaScanner.open, callback: (ret: UIMediaScanner.ret, err: void) => void): void

        /**扫描系统多媒体资源，可以通过 Web 代码自定义多选界面。
         * 注意：页面展示的图片建议使用缩略图，一次显示的图片不宜过多（1至2屏）*/
        scan(params: UIMediaScanner.scan, callback: (ret: UIMediaScanner.ret, err: void) => void): void

        /**获取指定数量的多媒体资源，没有更多资源则返回空数组，必须配合 scan 接口的 count 参数一起使用。*/
        fetch(callback: (ret: UIMediaScanner.ret) => void): void

        /**
         * 将系统相册媒体资源地址转换为可以直接使用的本地路径地址（临时文件夹的绝对路径），媒体资源会被拷贝到临时文件夹，调用 api.clearCache 接口可清除该临时图片文件
         * 注意：本接口只对 iOS 平台有效，在 android 平台上不做任何处理，会把原路径返回
         */
        transPath(params: UIMediaScanner.transPath, callback: (ret: {
            /**相册内图片被拷贝到临时文件夹，返回已拷贝图片的绝对路径 */
            path: string
        }, err: void) => void): void

        /**视频持续时间*/
        getVideoDuration(params: {
            /**视频资源路径（在相册库的绝对路径,另外支持 fs:// widget://路径） */
            path: string
        }, callback: (ret: {
            /**视频时长 */
            duration: number
        }, err: void) => void): void
    }
    namespace UIMediaScanner {
        interface open extends commen {
            /**
             *描述：（可选项）图片显示的列数，须大于1 
             * 默认值：4
             *  */
            column?: number

            /**
             * 描述：（可选项）是否将图片分类显示（为 true 时，会首先跳转到相册分类列表页面）
             * 默认值：false
             */
            classify?: boolean

            /**
             * 最多选择几张图片
             * 默认值：5
             */
            max?: number

            /**
             * 描述：（可选项）模块各部分的文字内容
             */
            texts?: UIMediaScanner.texts

            /**
             * 描述：（可选项）模块各部分的样式
             * 
             */
            styles?: UIMediaScanner.styles

            /**
             * 描述：（可选项）打开媒体资源界面后间隔一段时间开始自动滚动到底部设置
             * 默认值：见内部字段
             */
            scrollToBottom?: {
                /**
                 * 打开媒体资源界面后间隔的时间开始自动滚动到底部，单位秒（s），小于零的数表示不滚动到底部
                 * 默认：-1
                 */
                intervalTime?: number

                /**
                 * 滚动时是否添加动画，android 平台不支持动画效果
                 * 默认true
                 */
                anim?: number
            }

            /**
             * 描述：是否交换‘确定’和‘取消’按钮的位置（默认‘取消’按钮在右边，‘确定’按钮在左边）
             * 默认值：false
             * 
             */
            exchange?: boolean


            /**
            * 描述：屏幕是否旋转（横屏），为 true 时可以横竖屏旋转，false 时禁止横屏
            * 默认值：false
            */
            rotation?: boolean

            /**
             * 描述：是否支持返回预览事件 
             * 默认值：false
             * 注意：当本参数为 true 时，styles-》mark-》position 参数恒为 top_right，切此时模块会为 mark 提供一个未选中时的图标。
             * 当用户点击缩略图右上角时，触发选中/取消事件。当用户点击已选中的缩略图其它区域时，触发预览事件，并且模块会把当前所选中的所有图片信息回调给前端。
             */
            showPreview?: boolean

            /**
            * 描述：是否支持打开已选图片预览效果
            * 默认值：false
            * 注意：当本参数为 true 时，styles->mark->position 参数恒为 top_right，切此时模块会为 mark 提供一个未选中时的图标。
            * 当用户点击缩略图右上角时，触发选中/取消事件。当用户点击已选中的缩略图其它区域时，触发已选图片预览事件，并且模块自动跳转到图片预览界面。预览界面完成按钮事件同本接口回调函数里的confirm
            */
            showBrowser?: boolean
        }


        interface commen {
            /**返回的资源种类；
             * 默认：'all' 
             * all->全部 |picture->图片 |video->视频 
             * */
            type: 'all' | 'picture' | 'video'



            /**
            * 描述：（可选项）图片排序方式
            */
            sort?: UIMediaScanner.sort
        }
        interface sort {
            /**
             * 可选项）字符串类型；排序方式
             * 默认：'time' 
             * 取值范围time（按图片创建时间排序）
             * 
             * */
            key?: string

            /** 
             * 默认：'desc'
             * 取值范围:asc:（旧->新）|desc:（新->旧）
            */
            order?: "asc" | "desc"
        }

        interface texts {
            /**
             * 描述：状态文字内容
             *  默认：'已选择*项'
             * *->会被替换为已选择个数；
             */
            stateText?: string

            /**
             * 描述：取消按钮文字内容；
             * 默认：'取消' 
             */
            cancelText?: string

            /**
             * 描述：完成按钮文字内容；
             * 默认：'完成' 
             */
            finishText?: string

            /**
             * 描述：最多显示提示语
             * 默认：'最多显示*个资源'
             * *->会被替换为已选择个数; 
             */
            selectedMaxText?: string

            /**
             * 描述：确认按钮显示文本
             * 默认：'我知道了'
             * （仅支持ios，Android弹出Toast，无需确定按钮）
             */
            okBtnText?: string

            /**
             * 描述：分类列表的标题文字
             * 默认：相簿
             * 仅当 classify 为true时本参数有效
             */
            classifyTitle?: string
        }

        interface styles {
            /**
             * 资源选择器背景，支持 rgb，rgba，#
             *默认：'#FFFFFF' 
             */
            bg?: string

            /**
             * 选中图标的样式 
             */
            mark?: UIMediaScanner.mark

            /**
             * 导航栏样式
             */
            nav?: UIMediaScanner.nav
        }

        interface mark {
            /**
             * 图标路径（本地路径，支持fs://、widget://）；
             * 默认：对勾图标
             */
            icon?: string

            /**
             *图标的位置；
             * 默认：对勾图标
             * top_left->左上角 |bottom_left->左下角 |top_right->右上角 |bottom_right->右下角 |
             */
            position?: "top_left" | "bottom_left" | "top_right" | "bottom_right"

            /**
             * 图标的大小
             * 默认：显示的缩略图的宽度的三分之一
             */
            size?: number
        }

        interface nav {
            /**
            * 导航栏背景，支持 rgb，rgba，#；
            *默认：'#eee' 
            */
            bg?: string

            /**
            * 状态文字颜色，支持 rgb，rgba，#
            *默认：'#000' 
            */
            stateColor?: string

            /**
            * 状态文字大小
            *默认：18
            */
            stateSize?: number

            /**
            * 取消按钮背景，支持 rgb，rgba，#
            *默认：rgba(0,0,0,0) 
            */
            cancelBg?: string

            /**
            * 取消按钮的文字颜色，支持 rgb，rgba，#
            *默认：'#000' 
            */
            cancelColor?: string

            /**
            * 取消按钮的文字大小
            *默认：18
            */
            cancelSize?: number

            /**
            * 完成按钮的背景，支持 rgb，rgba，#
            *默认：rgba(0,0,0,0) 
            */
            finishBg?: string

            /**
            * 完成按钮的文字颜色，支持 rgb，rgba，#
            *默认：rgba(0,0,0,0)
            */
            finishColor?: string

            /**
            * 完成按钮的文字大小，支持 rgb，rgba，#
            *默认：18
            */
            finishSize?: number
        }


        interface scan extends commen {
            /** 
             * 描述：（可选项）每次返回的资源数量；
             * 默认：全部资源数量
            */
            count: number

            /**
             * 描述：（可选项）返回的缩略图配置，建议本图片不要设置过大 若已有缩略图，则使用已有的缩略图。若要重新生成缩略图，可先调用清除缓存接口api.clearCache()。
             */
            thumbnail?: {
                /**
                 * 返回的缩略图的宽
                 * 默认：100
                 */
                w?: number

                /**
                 * 返回的缩略图的高
                 * 默认：100
                 */
                h?: number

            }


            /**
             * 描述：（可选项）是否返回图片所在分组名，本参数对 android 平台无效
             * 默认：false（在 android 平台上本参数始终为 true）
             * 注意：
             *  由于系统平台差异，iOS 上和 android 上相册分组策略有所不同。
             * iOS 上系统相册分组策略如下：
             *  相机胶卷（All组）:  a,b,c,d,e,f,g
             *  A组：a
             * B组：b,c
             *  C组：f,g
             * android 上系统相册分组策略如下：
             *  A组：a
             *  B组：b,c
             * C组：d,e,f,g
             * 因此，若要在 android 平台上显示 All 组，开发者需自行组合。
             */
            showGroup?: boolean
        }

        interface transPath {

            /**描述：要转换的图片路径（在相册库的绝对路径） */
            path: string

            /**描述：（可选项）从本地相册拷贝图片到缓存目录时对图片的压缩处理，若不传则取内部字段中的默认值 */
            scale?: {
                /**
                 * 是否获取原图，若获取原图可能有图片旋转的问题； 
                 * 默认：false
                 * */
                untreated?: boolean

                /**
                 * 压缩图片后的质量，只针对jpg格式图片有效 
                 * 默认：50
                 * 取值范围：0-100
                 * */
                quality?: boolean

                /**
                 * 压缩后的图片宽度，图片会按比例适配此宽度； 
                 * 默认：原图宽度
                 * */
                width?: number

                /**
                 * 压缩后的图片高度，图片会按比例适配此高度； 
                 * 默认：原图高度
                 * */
                height?: number
            }
        }

        interface ret {
            /**
             *按钮点击事件 
             * confirm:点击确定按钮
             * cancel:点击取消按钮 
             * preview:用户点击缩略图触发的预览事件，仅当 showPreview 为 true 时有效
             * albumError:访问相册失败
             */
            eventType: "confirm" | "cancel" | "preview" | "albumError"

            /**
             * 
             *返回选定的资源信息数组 
             * 
             */
            list: Array<list>
        }
        interface list {
            /**
           * 资源路径，返回资源在本地的绝对路径，
           * 注意：iOS 平台上需要用 transPath 接口转换之后才可读取原图
           *  */
            path: string

            /**
             *  缩略图路径，返回资源缩略图在本地的绝对路径
             */
            thumbPath: string

            /**
             *文件后缀名，如：png，jpg, mp4  
             */
            suffix: string

            /**
             * 资源大小，单位（Bytes） 
             */
            size: number

            /**
             * 资源创建时间，格式：yyyy-MM-dd HH:mm:ss
             */
            time: string

            /**
             * 资源为视频时，则返回其视频时长，若为图片时本次参数为-1，暂仅支持 iOS 平台 
             */
            duration: number
        }
    }
}
