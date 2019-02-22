/**系统和自定义事件 */
interface TSystemEventFunction {
	/* tslint:disable-next-line:callable-types */
	'appintent': api.EventType.appintent
	'keyback': api.EventType.keyback
	'appidle': api.EventType.appidle
	'batterylow': api.EventType.batterylow
	'batterystatus': api.EventType.batterystatus
	'keyboardhide': api.EventType.keyboardhide
	'keyboardshow': api.EventType.keyboardshow
	'keymenu': api.EventType.keymenu
	'launchviewclicked': api.EventType.launchviewclicked
	'longpress': api.EventType.longpress
	'noticeclicked': api.EventType.noticeclicked
	'offline': api.EventType.offline
	'online': api.EventType.online
	'pause': api.EventType.pause
	'resume': api.EventType.resume
	'safeareachanged': api.EventType.safeareachanged
	'scrolltobottom': api.EventType.scrolltobottom
	'shake': api.EventType.shake
	'smartupdatefinish': api.EventType.smartupdatefinish
	'swipedown': api.EventType.swipedown
	'swipeleft': api.EventType.swipeleft
	'swiperight': api.EventType.swiperight
	'swipeup': api.EventType.swipeup
	'takescreenshot': api.EventType.takescreenshot
	'tap': api.EventType.tap
	'viewappear': api.EventType.viewappear
	'viewdisappear': api.EventType.viewdisappear
	'volumedown': api.EventType.volumedown
	'volumeup': api.EventType.volumeup
}
/**自定义事件 空接口 目的便于扩展 自定义事件要写在APICloud的声明文件外 */
interface TDiyEventFunction {

}
declare namespace api {
	/** 
     * 监听事件，支持系统事件和自定义事件
	 * iOS系统，Android系统
    */
	function addEventListener<T extends keyof TSystemEventFunction>(
		Params: {
			name: T,
			extra?: any
		},
		CallBack: (ret: TSystemEventFunction[T], err: Dictionary<any>) => void
	): void;
	function addEventListener<T extends keyof TDiyEventFunction>(
		Params: {
			name: T;
		},
		CallBack: (ret: { value: TDiyEventFunction[T] }, err: Dictionary<any>) => void
	): void;
	/** 
     * 将任意一个自定义事件广播出去，该事件可在任意页面通过 addEventListener 监听收到。
	 * iOS系统，Android系统
    */
	function sendEvent<T extends keyof TDiyEventFunction>(Params: {
		name: T,
		extra?: TDiyEventFunction[T]
	}): void;
	namespace EventType {
		interface ApiEventBase { }

		/**
		 * 电池电量事件 
		 * iOS系统，Android系统
		*/
		interface batteryBase {
			/**电池电量（0-100） */
			level: number;

			/**是否连接电源 */
			isPlugged: boolean;
		}

		/*** 设备电池电量低事件，字符串类型 */
		interface batterylow extends ApiEventBase, batteryBase { }

		/** * 设备电池状态改变事件，如电量变化或正在充电，字符串类型*/
		interface batterystatus extends ApiEventBase, batteryBase { }

		/** 
		 * 设备按键事件
		 * 该事件必须在 Window 中注册才有效，Frame 中注册无效，并且只在当前屏幕上的 window 才能收到回调。
		 * Android系统
		*/
		interface keyBase {
			/**被点击的按键 */
			keyCode: number;

			/**是否是长按 */
			longPress: boolean;
		}

		/** * 设备 back 键被点击事件，仅 Android 平台有效，字符串类型*/
		interface keyback extends ApiEventBase, keyBase { }

		/** * 设备 menu 键被点击事件，仅 Android 平台有效*/
		interface keymenu extends ApiEventBase, keyBase { }

		/** 设备音量加键被点击事件，仅 Android 平台有效*/
		interface volumeup extends ApiEventBase, keyBase { }

		/** * 设备音量减键被点击事件，仅 Android 平台有效*/
		interface volumedown extends ApiEventBase, keyBase { }

		/**
		 * 监听设备断开网络的事件，字符串类型 
		 * iOS系统，Android系统
		*/
		interface offline extends ApiEventBase { }

		/**
		 * 监听设备连接到网络的事件，字符串类型 
		 * iOS系统，Android系统
		*/
		interface online extends ApiEventBase { }

		/**
		 * 应用进入后台事件，字符串类型 
		 * iOS系统，Android系统
		*/
		interface pause extends ApiEventBase { }

		/** 
		 * 应用从后台回到前台事件，字符串类型
		 * iOS系统，Android系统
		*/
		interface resume extends ApiEventBase { }

		/** 
		 * Window 或者 Frame 页面滑动到底部事件，字符串类型
		 * 可用于实现滚动到底部，加载更多功能
		 * iOS系统，Android系统
		*/
		interface scrolltobottom extends ApiEventBase { }

		/** 
		 * 设备摇动事件，字符串类型。设置该监听后，当前 APP 将立即开启摇动检测功能。
		 * 可用于实现摇一摇功能
		 * iOS系统，Android系统
		*/
		interface shake extends ApiEventBase { }

		/** 
		 * 应用在前台运行期间，用户屏幕截图事件（比如同时按下了 home 键和电源键），只支持 iOS。
		 * iOS系统
		*/
		interface takescreenshot extends ApiEventBase { }

		/** 
		 * 应用多长时间不操作屏幕后触发的事件，字符串类型
		 * iOS系统，Android系统
		*/
		interface appidle extends ApiEventBase {
			extra: {
				timeout: number            //设置经过多长时间不操作屏幕时触发，单位秒，数字类型
			}
		}

		/** 
		 * Window 或者 Frame 的页面全局向下轻扫事件，字符串类型
		 * iOS系统，Android系统
		*/
		interface swipedown extends ApiEventBase { }

		/** 
		 * Window 或者 Frame 的页面全局向左轻扫事件，字符串类型
		 * iOS系统，Android系统
		*/
		interface swipeleft extends ApiEventBase { }

		/** 
		 * Window 或者 Frame 的页面全局向右轻扫事件，字符串类型
		 * iOS系统，Android系统
		*/
		interface swiperight extends ApiEventBase { }

		/** 
		 * Window 或者 Frame 的页面全局向上轻扫事件，字符串类型
		 * iOS系统，Android系统
		*/
		interface swipeup extends ApiEventBase { }

		/** 
		 * Window 或者 Frame 的页面全局单击事件，字符串类型。监听该事件后，点击 window 或者 frame 的任意位置，都将收到 tap 回调。
		 * iOS系统，Android系统
		*/
		interface tap extends ApiEventBase { }

		/** 
		 * Window 或者 Frame 的页面全局长按事件，字符串类型。
		 * iOS系统，Android系统
		*/
		interface longpress extends ApiEventBase { }

		/** 
		 * Window 显示到屏幕的事件，字符串类型。收到 viewappear 事件回调，即标识当前 Window 已经动画结束，并且完全显示到屏幕上。
		 * 该事件的作用对象为 Window，Frame 的显示不会收到事件
		 * iOS系统，Android系统
		*/
		interface viewappear extends ApiEventBase { }

		/** 
		 * Window 离开屏幕的事件，字符串类型。收到 viewdisappear 事件回调，即标识当前 Window 已经动画结束，并且完全从屏幕上移除。
		 * 该事件的作用对象为 Window，Frame 的隐藏不会收到事件
		 * 若是 Window 被关闭，此事件不会再回调
		 * iOS系统，Android系统
		*/
		interface viewdisappear extends ApiEventBase { }

		/** 
		 * 状态栏通知被用户点击后的回调，字符串类型
		 * iOS系统，Android系统
		*/
		interface noticeclicked extends ApiEventBase {
			/**内容来源类型。取值范围：0-APICloud 收到的推送内容，1-开发者自定义的 */
			type: 0 | 1;

			/**内容，收到的推送内容或者由开发者发送通知时自行传入的，见notification接口中extra */
			value: Dictionary<any>;
		}

		/** 
		 * 本应用被其他应用调起来时（Android 平台也可以通过 Activity 打开），收到相关数据的回调，字符串类型
		 * 在任意页面中注册该监听后，如果本应用被其他应用调起，将触发该监听函数，同时将传给该应用的数据回调给网页
		 * iOS系统，Android系统
		*/
		interface appintent extends ApiEventBase {
			/**其他应用打开本应用的url，只iOS有效，字符串类型 */
			iosUrl: string;

			/**其他应用的包名，iOS平台有可能为空字符串，字符串类型 */
			sourceAppId: string;

			/**其他应用传递过来的参数，JSON或字符串类型 */
			appParam: Dictionary<any>;
		}

		/** 
		 * 云修复使用静默修复时，更新完毕事件。可通过监听此事件来通知用户做是否强制重启应用等操作或者提示，以使更新生效，字符串类型
		 * 如果是提示修复，则不会触发该事件
		 * iOS系统，Android系统
		*/
		interface smartupdatefinish extends ApiEventBase {
			/**在控制台云修复里面进行静默修复时填写的附加信息，字符串类型 */
			value: [{ extra: string }];
		}

		/** 
		 * 闪屏广告被用户点击后的回调，字符串类型
		 * iOS系统，Android系统
		*/
		interface launchviewclicked extends ApiEventBase {
			/**附加信息，字符串类型 */
			value: string;
		}

		/**
		 * 系统键盘弹出的回调，只支持iOS，字符串类型
		 * iOS系统
		*/
		interface keyboardshow extends ApiEventBase {
			/**键盘高度，数字类型 */
			h: number;
		}

		/** 
		 * 系统键盘隐藏的回调，只支持iOS，字符串类型
		 * iOS系统
		*/
		interface keyboardhide extends ApiEventBase { }

		/**
		 * 页面安全区域发生变化的回调，可以在回调里根据需要调整页面，只iOS 11及以上系统有效，字符串类型
		 * iOS系统
		 */
		interface safeareachanged extends ApiEventBase {
			safeArea: api.ConfigParams.SafeArea;
		}
	}
}
