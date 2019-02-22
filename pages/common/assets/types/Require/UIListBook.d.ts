declare namespace api.Require {
    interface TRequire {
        'UIListBook': UIListBook
    }
    interface UIListBook {
        open(params: UIListBook.open, callback: (ret: UIListBook.openCallBack) => void): void

        /**关闭数据列表模块 */
        close(): void

        /**显示 UIListBook 模块 */
        show(): void

        /**隐藏 UIListBook 模块 */
        hide(): void

        /** 设置列表的纵坐标和高度*/
        setAttr(callback: (ret: { status: boolean }) => void): void
        setAttr(params: {
            /**模块的纵坐标 */
            y?: number

            /**模块的高度 */
            h?: number
        }, callback: (ret: { status: boolean }) => void): void

        /**根据开发者自定义的唯一标识（open 接口的 data 参数中自定义的唯一标识）查找列表项对应的数据（此接口仅支持iOS） */
        getIndex(params: {
            /**调用 open 接口时，data 参数传入的开发者自定义的唯一标识的 key*/
            key: string

            /**调用 open 接口时，data 参数传入的开发者自定义的唯一标识的 value */
            value: string
        }, callback: (ret: {
            /**当前列表项的索引 */
            index: number

            /**当前列表项的数据，内部字段与 open 时的 data 参数一致 */
            data: Array<UIListBook.dataInfo>
        }) => void): void

        /**根据列表项的索引获取对应的数据 */
        getDataByIndex(callback: (ret: UIListBook.dataInfo) => void): void
        getDataByIndex(params: {
            /**列表项的索引 */
            index: number
        }, callback: (ret: UIListBook.dataInfo) => void): void

        /**设置侧滑显示出来的按钮 */
        setSwipeBtns(callback: (ret: { status: boolean }) => void): void
        setSwipeBtns(params: {
            /**列表项的索引 */
            index?: number

            /**列表项侧滑露出的按钮组 */
            btns?: Array<UIListBook.rightBtns>
        }, callback: (ret: { status: boolean }) => void): void

        /**刷新列表数据 */
        reloadData(callback: (ret: { status: boolean }) => void): void
        reloadData(params: UIListBook.dataInfo, callback: (ret: { status: boolean }) => void): void

        /**根据索引删除某一条列表的数据 */
        deleteItem(callback: (ret: { status: boolean }) => void): void
        deleteItem(params: { index: number }, callback: (ret: { status: boolean }) => void): void

        /**根据索引更新某一条列表的数据 */
        updateItem(params: {
            /**数据列表的索引 */
            index?: number

            /**列表的数据源 */
            data: UIListBook.dataInfo
        }, callback: (ret: { status: boolean }) => void): void

        /**向列表追加数据 若不传或传空，仅收起下拉刷新组件 */
        appendData(callback: (ret: { status: boolean }) => void): void
        appendData(params: { data?: UIListBook.dataInfo }, callback: (ret: { status: boolean }) => void): void

        /**获取当前列表的总数据量 */
        getCount(callback: (ret: { count: number }) => void): void

        /**设置下拉刷新，通过 reloadData 收起下拉刷新组件 */
        setRefreshHeader(params: UIListBook.setRefreshHeader, callback: (ret: any, err: any) => void): void

        /**设置上拉加载，通过 appendData 收起上拉加载组件 */
        setRefreshFooter(params: UIListBook.setRefreshHeader, callback: (ret: any, err: any) => void): void
    }
    namespace UIListBook {
        interface open {
            /**模块的位置及尺寸  Android 必须传此参数。*/
            rect?: {
                x?: number
                y?: number
                w?: number
                h?: number
            }

            /**列表的数据源，开发者可以自定义唯一的键值对信息（如：uid: '1001'），供 getIndex 使用 */
            data: Array<dataInfo>

            /**列表项向左滑动露出的按钮组，建议：配置列表每项的通用按钮，用此参数；配置某一项的特定按钮，可在 data 数组的指定项传入 rightBtns 参数 */
            rightBtns?: Array<rightBtns>

            /**是否开启弹动，android 平台不支持本参数 */
            bounces?: boolean

            /**模块各部分的样式 */
            styles?: styles

            /**列表右边按钮相关设置，设置后点击将会弹出扇形页面，不传将不会弹出 */
            rightButtonInfo?: Array<{
                /**图片地址，仅支持本地图片（支持widget、fs） */
                image: string
            }>

            /**模块视图添加到指定 frame 的名字（只指 frame，传 window 无效） 默认：模块依附于当前 window*/
            fixedOn?: string

            /**是否显示滚动条 默认：true*/
            showScrollBar?: boolean
        }
        interface dataInfo {
            /**自定义唯一的键值对信息（如：uid: '1001'），供 getIndex 使用 */
            uid?: string

            /**列表项的配图路径，支持http://、https://、widget://、fs://等协议，网络图片会被缓存到本地 */
            imgPath?: string

            /** 标题*/
            title?: string

            /**子标题 */
            subTitle?: string

            /**标签 */
            label?: string

            /**子标签 */
            subLabel?: string

            /**右侧按钮图标路径（本地路径，支持fs://、widget://） */
            icon?: string

            /**右侧按钮弹出扇形页面图标情况下路径，图片时扇形一部分，扇形消失，图片就消失，不需要扇形时不要设置此路径（本地路径，支持fs://、widget://）；默认：icon设置路径 */
            chooseIcon?: string

            /**列表项向左滑动露出的按钮组，配置某一项的特定按钮组，若不传则显示通用按钮，内部字段同下方 rightBtns 参数 */
            rightBtns?: Array<rightBtns>
        }
        interface rightBtns {
            /**按钮背景色，支持 rgb、rgba、#；默认：'#388e8e' */
            bgColor?: string

            /**按钮的宽度；默认：w / 4 */
            width?: number

            /**按钮标题，水平、垂直居中 */
            title?: string

            /**按钮标题文字大小；默认：12 */
            titleSize?: number

            /**按钮标题文字颜色，支持 rgb、rgba、#；默认：'#ffffff' */
            titleColor?: string

            /**按钮标题前的图标路径（本地路径，支持fs://、widget://），水平、垂直居中，图标为正方形 */
            icon?: string

            /**按钮标题前的图标宽度，图标为正方形；默认：20 */
            iconWidth?: number
        }
        interface styles {
            /**列表分割线的颜色，支持 rgb、rgba、#；默认：'#EEEEEE' */
            borderColor?: string

            /**列表分割线的高度；默认：1 */
            borderHigh?: number

            /**列表分割线的左边距；默认：列表项的配图的最左边 */
            borderLeftMargin?: number

            /**列表分割线的右边距；默认：索引的最左边 */
            borderRightMargin?: number

            /**列表项的样式 */
            item?: {
                /**列表项的背景色，支持 rgb、rgba、#；默认：'#FFFFFF' */
                bgColor?: string

                /**列表项按下时的背景色，支持 rgb、rgba、#；默认：'#F5F5F5' */
                activeBgColor?: string

                /**列表的高度；默认：113 */
                height?: number

                /**列表项配图的宽度；默认：90 */
                imgWidth?: number

                /**列表项配图的高度；默认：51 */
                imgHeight?: number

                /**列表项配图的圆角大小；默认：0 */
                imgCorner?: number

                /**列表项配图的占位图路径（本地路径，fs://、widget://） */
                placeholderImg?: string

                /**列表项索引文字大小；默认：16 */
                indexSize?: number

                /**列表项索引文字颜色，支持 rgb、rgba、#；默认：'#000000' */
                indexColor?: string

                /**列表项标题文字大小；默认：16 */
                titleSize?: number

                /**列表项标题文字颜色，支持 rgb，rgba，#；默认：'#000000' */
                titleColor?: number

                /**（仅ios支持）数字类型；列表项标题字间距；默认：0 */
                titleWordSpace?: number

                /**列表项子标题文字大小；默认：14 */
                subTitleSize?: number

                /**列表项子标题文字颜色，支持 rgb、rgba、#；默认：'##999999' */
                subTitleColor?: string

                /**（仅ios支持）数字类型；列表项子标题字间距；默认：0 */
                subTitleWordSpace?: number

                /**列表项子标题行间距（距离标题位置）；默认：8 */
                subTitleLineSpace?: number

                /**列表项标签文字大小；默认：11 */
                labelSize?: number

                /**列表项标签文字颜色，支持 rgb，rgba，#；默认：'#97A0DC' */
                labelColor?: string

                /**列表标签边框宽度；默认：1 */
                labelBorderWide?: number

                /**列表项标签边框颜色，支持 rgb，rgba，#；默认：'#000000' */
                labelBorderColor?: string

                /**列表标签边框圆角；默认：1 */
                labelBorderCorners?: number

                /**（仅ios支持）数字类型；列表项标签字间距；默认：0 */
                labelWordSpace?: number

                /**列表项子标签文字大小；默认：12 */
                subLabelSize?: number

                /**列表项子标签文字颜色，支持 rgb、rgba、#；默认：'##999999' */
                subLabelColor?: string

                /**（仅ios支持）数字类型；列表项子标签字间距；默认：0 */
                subLabelWordSpace?: number

                /**列表项子标签行间距（距离子标题位置）；默认：8 */
                subLabelLineSpace?: number
            }
        }
        interface openCallBack {
            /**交互事件类型 
             * show             模块加载成功
             * clickRightBtn    点击侧滑出现的右侧按钮
             * clickContent     点击列表项
             * clickPopupBtn    点击弹窗按钮
            */
            eventType: "show" | "clickRightBtn" | "clickContent" | "clickPopupBtn"

            /**列表项的索引 */
            index: number

            /**列表项侧滑出现的按钮的索引 */
            btnIndex: number

            /**列表项右边按钮弹窗索引 */
            infoIndex: number
        }
        interface setRefreshHeader {
            /**下拉刷新时显示的小箭头图标的本地路径，要求本地路径（fs://、widget://） */
            loadingImg: string

            /**下拉刷新区域的背景色，支持 rgb、rgba、# */
            bgColor?: string

            /**提示文字颜色，支持 rgb、rgba、# */
            textColor?: string

            /**下拉提示文字 */
            textDown?: string

            /**松开提示文字 */
            textUp?: string

            /**提示文字 */
            loadingText?: string
        }
    }
}