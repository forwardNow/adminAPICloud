declare namespace api.Require {
    interface TRequire {
        'wxPay': wxPay
    }
    interface wxPay {
        /**info 订单信息签名后的字符串 */
        getOrderId(config: { info: string }, callback: (ret: wxPay.ret, err: void) => void): void
        /**code
         * 1  (apiKey值非法)
         * -1（未知错误，可能的原因：签名错误、未注册APPID、项目设置APPID不正确、注册的APPID与设置的不匹配、其他异常等）
         * -2（用户取消，发生场景：用户不支付了，点击取消，返回APP）
         */
        payOrder(config: wxPay.payOrderConfig, callback: (ret: { status: boolean }, err: { code: 1 | -1 | -2 }) => void): void
    }
    export namespace wxPay {
        interface ret {
            /**返回的状态码，SUCCESS/FAIL，此字段是通信标识，非交易标识，交易是否成功需要查看result_code来判断 */
            return_code: "SUCCESS" | "FAIL"
            /**返回信息，如非空，为错误原因，如：签名失败、参数格式校验错误... */
            return_msg?: string
            //以下字段在return_code为SUCCESS的时候有返回
            /**公众账号ID，调用接口提交的公众账号ID */
            appid: string
            /** 商户号，调用接口提交的商户号*/
            mch_id: string
            /**设备号，调用接口提交的终端设备号 */
            device_info?: string
            /**随机字符串，微信返回的随机字符串 */
            nonce_str: string
            /**签名，微信返回的签名，详见上文链接（安全规范-签名算法）。用于验签（将本 ret JSON 对象按照签名算法签名后得到字符串跟本字符串比较，若相同则读取预支付订单，若不同则有可能是仿冒订单号） */
            sign: string
            /**业务结果，SUCCESS/FAIL */
            result_code: "SUCCESS" | "FAIL"
            /**错误代码，详细参见统一支付订单-错误码（https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=9_1） */
            err_code?: string
            /**错误代码描述，错误返回的信息描述 */
            err_code_des?: string
            //以下字段在return_code 和result_code都为SUCCESS的时候有返回
            /**交易类型，调用接口提交的交易类型，取值如下：JSAPI，NATIVE，APP，详细说明见参数规定（https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=4 */
            trad_type: "JSAPI" | "NATIVE" | "APP"
            /**预支付交易会话标识即订单号，微信生成的预支付回话标识，用于后续接口(payOrder)调用中使用，该值有效期为2小时 */
            prepay_id: string
            /**二维码链接，trade_type为NATIVE是有返回，可将该参数值生成二维码展示出来进行扫码支付 */
            code_url?: string
        }
        interface payOrderConfig {
            /**
             * 默认值：无
             * 描述：从微信开放平台获取的 appid，若不传则从当前 widget 的 config.xml 中读取。 */
            apiKey?: string
            /**
             * 默认值：无
             * 描述： getOrderId 获取的订单号 （prepay_id）*/
            orderId: string
            /**
             * 默认值：无
             * 描述：商家和微信合作的 id 号，审核通过后微信服务器会发送到商家邮箱 */
            mchId: string
            /**
             * 默认值：无
             * 描述：随机字符串，防重发 */
            nonceStr: string
            /**
             * 默认值：无
             * 描述：时间戳，防重发 */
            timeStamp: string
            /** 
             * 默认值：Sign=WXPay
             * 描述：扩展字段，暂填写固定值Sign=WXPay*/
            package?: string
            /**
             * 默认值：无
             * 描述：商家根据微信开放平台文档对数据做的签名，详见：安全规范-签名算法 */
            sign: string
        }
    }
}