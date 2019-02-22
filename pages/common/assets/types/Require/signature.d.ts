declare namespace api.Require {
    interface TRequire {
        'signature': signature
    }
    interface signature {
        /**
         * 将字符串进行 MD5 签名（本过程为同步）
         */
        md5Sync(params: {
            /**要签名的字符串 */
            data: string,
            /**（可选项）签名后返回的字符串为大写 默认：true */
            uppercase?: boolean
        }): string

        /**
         * 将字符串进行 AES 加密（加密模式和填充模式分别为：CBC/PKCS7Padding；加密等级位数：aes-128-cbc）
         * 注意：本接口加密后会把字符串十六进制转换输出
         */
        aesCBCSync(params: signature.aes128): string

        /**
         * 将字符串进行 AES 解密（加密模式和填充模式分别为：CBC/PKCS7Padding；加密等级位数：aes-128-cbc）
         * 注意：本接口会首先将字符串十六进制解析成二进制数据流
         */
        aesDecodeCBCSync(params: signature.aes128): string
    }
    namespace signature {
        interface aes128 {
            /**要加密 或 解密的字符串   解密必须是十六进制字符串*/
            data: string

            /**aes 加密算法使用的 key */
            key: string

            /**aes 加密算法使用的偏移量 */
            iv: string
        }
    }
}