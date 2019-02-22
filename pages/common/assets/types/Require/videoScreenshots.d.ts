declare namespace api.Require {
    interface TRequire {
        'videoScreenshots': videoScreenshots
    }
    interface videoScreenshots {
        /**视频截图 */
        screenshots(paramsparams: {
            /** 描述：视频地址，支持本地(widget://和fs://)和网络视频*/
            videoUrl: string

            /**描述：指定位置(单位为秒) */
            time: number

            /**描述：图片名 */
            name: string

            /**
             * 描述：（可选项）是否顺时针90°旋转
             * 默认：false
             */
            isRotation?: boolean

            /**
             * 描述：（可选项）是否保存相册
             * 默认：false
             *  */
            isAblum?: boolean
        }, callback: (ret: {
            /**是否转换成功 */
            status: boolean

            /**；转换的图片在本地保存的路径（绝对路径） */
            path: string
        }, err: void) => void): void

        /**当 screenshots 接口内 未传 path 值，则模块会将转换后的 图片保存在缓存目录。调用本接口，可清除本模块产生的所有图片。调用 api 对象下的 clearCache 接口会清除缓存目录下所有文件（不仅本模块产生的图片文件） */
        clearCache(): void
    }


}