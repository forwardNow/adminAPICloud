declare namespace api.Require {
    interface TRequire {
        'aliPayPlus': aliPayPlus
    }
    interface aliPayPlus {
        payOrder(config: { orderInfo: string }, callback: (ret: aliPayPlus.ret, err: void) => void): void
    }
    export namespace aliPayPlus {
        interface ret {
            /**
             *   9000：支付成功
             *   8000：正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
             *   4000：订单支付失败
             *   5000：重复请求
             *   6001：用户中途取消支付操作
             *   6002：网络连接出错
             *   6004：支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
             */
            code: 9000 | 8000 | 4000 | 5000 | 6001 | 6002 | 6004
        }
    }
}