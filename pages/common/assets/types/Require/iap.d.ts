declare namespace api.Require {
    interface TRequire {
        'iap': iap
    }

    interface iap {
        /**获取有效商品列表 */
        getProducts(
            params: {
                /**
                 * 描述：商品id列表
                 * 默认值：无
                 */
                productIds: Array<string>

            }, callback: (
                ret: {
                    /**无效的商品id列表 */
                    invalidProductIds: Array<string>
                    products: Array<iap.products>
                },
                err: {
                    /**错误描述 */
                    msg: string
                }) => void): void

        /**购买商品 */
        purchase(
            params: {
                /**有效的商品id */
                productId: string

                /**（可选项）用户信息，回调里面将会返回该字段 */
                applicationUsername?: string
            },callback: (
                ret: {
                    /**交易状态，详见交易状态常量 */
                    state: number

                    /**商品id */
                    productId: string

                    /**用户信息 */
                    applicationUsername: string

                    /**交易id */
                    transactionId: string

                    /**原始交易id，只在state为恢复购买时有效 */
                    originalTransactionId: string

                    /**交易凭证，经过base64编码，用于验证交易是否合法和有效，避免因越狱破解内购后造成损失，只在state为购买成功时有效 */
                    receipt: string

                    /**交易失败时的错误码，详见错误码常量 */
                    errorCode: string

                    /**有下载内容时的下载信息列表 */
                    downloads: Array<iap.downloads>


                }, err: {
                    /**其它错误，如参数错误、如当前用户不能使用应用内购买等 */
                    msg: string
                }) => void): void
    }
    namespace iap {
        /**有效商品列表 */
        interface products {
            /**商品id */
            productId: string

            /**商品标题 */
            title: string

            /**商品描述 */
            description: string

            /**商品价格 */
            price: number

            /**商品格式化后的价格 如￥6.00 */
            formattedPrice: string

            /**是否有下载内容 */
            downloadable: boolean

            /**下载内容长度 */
            downloadContentLengths: Array<number>

            /**下载内容的版本 */
            downloadContentVersion: string
        }

        interface downloads {
            /**下载内容所属交易id */
            transactionId: string

            /**下载内容id */
            contentId: string

            /**下载状态，详见下载状态常量 */
            downloadState: number

            /**下载进度，取值范围0~1 */
            progress: number

            /**文件内容大小 */
            contentLength: number

            /**下载剩余时间，-1时表示未知 */
            timeRemaining: number

            /** 下载内容的版本*/
            contentVersion: string

            /**下载成功后文件路径 */
            contentURL: string

            /**下载失败时的错误码 */
            errorCode: number

            /**下载失败时的错误描述 */
            errorMsg: string
        }
    }
}