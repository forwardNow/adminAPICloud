declare namespace api.Require {
    interface TRequire {
        'photoBrowser': photoBrowser
    }
    interface photoBrowser {
        /**
         * 打开图片浏览器
         * @param config 
         * @param callback 
         */
        open(config: photoBrowser.openConfig, callback: (ret: {
            /**
             * show：          打开浏览器并显示
             * change：        用户切换图片
             * click：         用户单击图片浏览器
             * loadImgSuccess：网络图片下载成功的回调事件
             * loadImgFail：   网络图片下载失败的回调事件
             * longPress：     用户长按图片事件
             */
            eventType: 'show' | 'change' | 'click' | 'loadImgSuccess' | 'loadImgFail' | 'longPress'
            index: number
        }, err: any) => void): void

        /**关闭图片浏览器 */
        close(): void

        /**隐藏图片浏览器 */
        hide(): void

        /**显示图片浏览器 */
        show(): void

        /**设置当前显示图片 */
        setIndex(config: { index: number }): void

        /**获取当前图片在图片路径数组内的索引 */
        getIndex(callback: (ret: { index: number }) => void): void

        /**获取指定图片在本地的绝对路径 */
        getImage(config: {
            /**默认值:当前图片;指定图片在图片数组中的索引 */
            index?: number
        },
            callback: (ret: { path: string }) => void
        ): void

        /**设置指定位置的图片，若设置的是网络图片加载成功或失败会给 open 接口回调该加载事件 */
        setImage(config: {
            /**默认值:当前图片;（可选项）指定图片在图片数组中的索引 */
            index?: number,
            /**要设置的图片路径，支持本地和网络路径（fs://、http://） */
            image: string
        }): void

        /**往已打开的图片浏览器里添加图片（拼接在最后） */
        appendImage(config: {
            /**要拼接的图片路径组成的数组，图片路径支持 fs://、http:// 协议 */
            images: Array<string>
        }): void

        /**删除指定位置的图片 */
        deleteImage(config: {
            /**默认值:当前图片;（可选项）删除的指定图片在图片数组中的索引 */
            index?: number
        }): void
        /**清除缓存到本地的网络图片，本接口只清除本模块缓存的数据，若要清除本 app 缓存的所有数据则调用 api.clearCache */
        clearCache(): void
    }
    namespace photoBrowser {
        interface openConfig {
            /**要读取的图片路径组成的数组，图片路径支持 fs://、http:// 协议 */
            images: Array<string>

            /**（可选项）当前要显示的图片在图片路径数组中的索引 */
            activeIndex?: number

            /**（可选项）当加载网络图片时显示的占位图路径，要求本地图片路径（widget://、fs://） */
            placeholderImg?: string

            /**（可选项）图片浏览器背景色，支持 rgb、rgba、# */
            bgColor?: string

            /**（可选项）是否打开缩放手势识别功能（随手势放大缩小图片） */
            zoomEnabled?: boolean

            /**（可选项）默认值1
             * 图片的现实模式；1：为图片原本大小 2：图片宽度等比例放大到宽等于屏幕款;android不支持此参数 */
            mode?: number
        }

    }
}