declare namespace api.Require {
    interface TRequire {
        'FNImageClip': FNImageClip
    }
    /**FNImageClip 同时只能运行一个实例，当重复调用 open 时，会将已存在的 FNImageClip 实例弹出到当前窗口的最上层 */
    interface FNImageClip {
        /**打开图片裁剪 */
        open(params: FNImageClip.open, callback?: (ret: { status: boolean }, err: any) => void): void

        /**保存截图*/
        save(params: FNImageClip.save, callback: (ret: {
            /**图片保存到指定路径后的绝对路径，若保存失败则为该参数为 undefined */
            destPath: string

            /**图片保存到相册后的绝对路径，若保存失败则该参数为 undefined */
            albumPath: string
        }, err: any) => void): void

        /**关闭截图器 */
        close(): void

        /**重置裁剪区域，恢复到初始打开时的状态 */
        reset(): void
    }
    namespace FNImageClip {
        /**打开图片裁剪 */
        interface open {
            /**模块的位置及尺寸 */
            rect?: {
                /**模块左上角的 x 坐标（相对于所属的 Window 或 Frame）；默认值：0 */
                x?: number

                /**模块左上角的 y 坐标（相对于所属的 Window 或 Frame）；默认值：0 */
                y?: number

                /**模块的宽度；默认值：所属的 Window 或 Frame 的宽度 */
                w?: number

                /**模块的高度；默认值：所属的 Window 或 Frame 的高度 */
                h?: number
            }

            /**源图片路径，要求本地路径（fs://、widget://） */
            srcPath: string

            /**截图时是否截取与原图分辨率一致的图 */
            highDefinition?: boolean

            /**图片裁剪的样式设置 */
            style?: {
                /**图片裁剪控件遮罩层背景，支持 rgb，rgba，#；默认：#888 */
                mask?: string
                clip?: {
                    /**裁剪区域的宽度，当 appearance 为 circular 时，w 为半径；默认：rect.w / 2 */
                    w?: number

                    /**裁剪区域的高度，当 appearance 为 circular 时，h 无效；默认：w */
                    h?: number

                    /**裁剪区域左侧相对于裁剪控件左侧的距离；默认：(rect.w - w) / 2 */
                    x?: number

                    /**裁剪区域顶部相对于裁剪控件顶部的距离；默认：(rect.h - h) / 2 */
                    y?: number

                    /**裁剪区域边线颜色，支持 rgb，rgba，#；默认：透明 */
                    borderColor?: string

                    /**裁剪区域边线；默认：0 */
                    borderWidth?: number

                    /**裁剪区域的形状，支持 circular | rectangle；默认：rectangle */
                    appearance?: 'circular' | 'rectangle'
                }
            }

            /**裁剪模式 默认：all
             * clip：裁剪框可移动或缩放，图片固定位置和大小，当 appearance 值为 circular 时，无法改变大小
             * image：图片可以移动或缩放，裁剪框固定位置和大小
             * all：裁剪框可移动或缩放，图片可移动或缩放，该模式下用户的放大操作只对图片有效，裁剪框只能通过拖动改变大小，当 appearance 值为 circular 时，无法改变大小
            */
            mode?: 'all' | 'image' | 'clip'

            /**模块视图添加到指定 frame 的名字（只指 frame，传 window 无效） 模块依附于当前 window*/
            fixedOn?: string
        }

        /**保存截图*/
        interface save {
            /**保存图片路径，要求本地路径（fs://） */
            destPath: string

            /**是否将结果同时保存到系统相册 */
            copyToAlbum?: boolean

            /**保存图片的质量，取值范围 0 - 1，【注】只针对jpg格式图片有效 */
            quality?: number
        }
    }
}