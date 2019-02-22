declare namespace api.Require {
    interface TRequire {
        'aliPush': aliPush
    }
    interface TRequire {
        'aliPushNoUtdId': aliPush
    }
    interface aliPush {
        /**
         * 获取是否注册阿里移动推送成功 
         * iOS、Android系统
         * 可提供的1.0.0及更高版本
        */
        isRegister(callback: (ret: aliPush.Status, err: aliPush.ErrCode) => void): void

        /** 
         * app启动时，进行启动信息统计
         * Android系统
         * 可提供的1.0.0及更高版本
        */
        onAppStart(callback: (ret: aliPush.Status, err: aliPush.ErrMsg) => void): void

        /**
         * 客户端自定义标签
         * iOS、Android系统
         * 可提供的1.0.0及更高版本
         */
        addTag(params: aliPush.Tag, callback: (ret: Response, err: aliPush.ErrCode) => void): void

        /**
         * 移除客户端自定义标签
         * iOS、Android系统
         * 可提供的1.0.0及更高版本
         */
        removeTag(params: aliPush.Tag, callback: (ret: Response, err: aliPush.ErrCode) => void): void

        /**
         * 查询目标绑定标签，当前仅支持查询设备标签；
         * iOS、Android系统
         * 可提供的1.0.0及更高版本
         */
        listTags(callback: (ret: Response, err: aliPush.ErrMsg) => void): void

        /**
         * 添加别名
         * iOS、Android系统
         * 可提供的1.0.0及更高版本
         */
        addAlias(params: {
            /**别名 */
            alias: string
        }, callback: (ret: Response, err: aliPush.ErrCode) => void): void

        /**
         * 删除设备别名；
         * iOS、Android系统
         * 可提供的1.0.0及更高版本
         */
        removeAlias(params: {
            /**别名 */
            alias?: string
        }, callback: (ret: Response, err: aliPush.ErrCode) => void): void

        /**
         * 查询设备别名
         * iOS、Android系统
         * 可提供的1.0.0及更高版本
         */
        listAliases(callback: (ret: Response, err: aliPush.ErrMsg) => void): void

        /**
         * 将本设备和指定账号做绑定
         * iOS、Android系统
         * 可提供的1.0.0及更高版本
         */
        bindAccount(params: {
            /**账号名称 */
            account: string
        }, callback: (ret: Response, err: aliPush.ErrCode) => void): void

        /**
        * 解绑和指定账号的本设备的绑定 
        * iOS、Android系统
        * 可提供的1.0.0及更高版本
        */
        unbindAccount(callback: (ret: Response, err: aliPush.ErrMsg) => void): void

        /**
         * 设置免打扰时间段
         * Android系统
         * 可提供的1.0.0及更高版本
         */
        setDoNotDisturb(params: aliPush.DoNotDisturb, callback: (ret: Response, err: aliPush.ErrCode) => void): void

        /** 
         * 拦截通知，接收消息，获取推送中的扩展字段
         * iOS、Android系统
         * 可提供的1.0.0及更高版本
        */
        addEventListener(params: aliPush.Msg, callback: (ret: aliPush.MsgResponse, err: Dictionary<any>) => void): void

        /**
         * 获取设备DeviceId
         * iOS、Android系统
         * iOS、Android系统
         */
        getDeviceId(callback: (ret: {
            /**状态 */
            status: boolean
            /**设备ID */
            DeviceId: string
        }, err: Dictionary<any>) => void): void

        /**
         * 绑定电话号码（多个设备可以绑定同一电话，一个设备只能绑定一个号码，多次绑定不同号码，以最后一次绑定号码为准。）
         * Android系统
         * 可提供的1.0.0及更高版本
         */
        bindPhoneNumber(params: { phoneNumber: string }, callback: (ret: Response, err: aliPush.ErrCode) => void): void

        /**
         *  解绑电话号码
         * Android系统
         * 可提供的1.0.0及更高版本
         */
        unbindPhoneNumber(callback: (ret: Response, err: aliPush.ErrCode) => void): void

        /**
         * 设置推送通知声音文件路径（若不调用本接口，默认获取资源id为R.raw.alicloud_notification_sound的资源文件；若没有获取到指定声音文件，取设备设置的消息声音）
         * Android系统
         * 可提供的1.0.0及更高版本
         */
        setNotificationSoundFilePath(params: { filePath: string }, callback: (ret: aliPush.Status, err: aliPush.ErrCode) => void): void

        /**
         * 关闭免打扰功能(关闭后，先前设置的免打扰时段失效)
         * Android系统
         * 可提供的1.0.0及更高版本
         */
        closeDoNotDisturbMode(callback: (ret: aliPush.Status) => void): void

        /**
         * 删除推送SDK创建的所有通知
         * Android系统
         * 可提供的1.0.0及更高版本
         */
        clearNotifications(callback: (ret: aliPush.Status) => void): void

        /**
        * 同步角标数到服务端
        * iOS系统
        * 可提供的1.0.0及更高版本
        */
        syncBadgeNum(callback: (ret: Response) => void): void
    }
    namespace aliPush {
        /**拦截通知，接收消息 */
        interface Msg {
            /**
             * onMessage                用于接收服务端推送的消息（控制台选择推送消息，则不会触发弹窗，而会回调该方法。反之，推送通知不会触发该方法。） message 消息内容
             * onNotification           用于在接收通知后，用户需要自定义操作的场景，或者用于获取扩展字段。 ios和安卓返回消息体请分别处理。
             * onNotificationOpened     在用户打开（某个）notification的时候，会回调该方法。ios和安卓返回消息体请分别处理。
             * onNotificationRemoved    在用户删除（某个）notification的时候，会回调该方法。 messageId 消息id，删除的消息的Id。
             */
            name: 'onMessage' | 'onNotification' | 'onNotificationOpened' | 'onNotificationRemoved'
        }
        interface MsgResponse extends Status {
            /** 标题 (仅onMessage,onNotification,onNotificationOpened监听有值)*/
            title: string

            /**内容  (仅onMessage,onNotification,onNotificationOpened监听有值) */
            summary: string

            /**扩展字段，以json字段形式表示  (仅onNotification,onNotificationOpened监听有值) */
            extraMap: any

            /**删除的消息的Id (仅onMessage,onNotificationRemoved监听有值) */
            messageId: string
        }
        /**免打扰 */
        interface DoNotDisturb {
            /** 免打扰的起始时间（小时），24小时制，取值范围：0-23*/
            startHour?: number

            /**免打扰起始时间（分钟），取值范围：0-59。 */
            startMinute?: number

            /**免打扰的结束时间（小时），24小时制，取值范围：0-23 */
            endHour?: number

            /**免打扰结束时间（分钟），取值范围：0-59。 */
            endMinute?: number
        }
        interface Tag {
            /**目标类型，1：本设备； 2：本设备绑定账号； 3：别名。默认值：3 */
            target?: 1 | 2 | 3

            /**标签名，支持多个标签，用空格隔开。 */
            tar?: string

            /**别名（仅当target = 3时生效）。 */
            alias?: string
        }
        interface Status {
            /**操作状态 */
            status: boolean
        }
        interface Response extends Status {
            /**响应 */
            response: Dictionary<any>
        }
        interface ErrCode {
            /**错误状态码 */
            errorCode: string,

            /**错误信息 */
            errorMessage: string
        }
        interface ErrMsg {
            /**错误信息 */
            msg: string
        }
    }

}