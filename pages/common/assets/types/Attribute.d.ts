declare namespace api {
	/**应用ID
     * 可用性 iOS系统，Android系统
     */
	var appId: string

	/**应用名称
     * 可用性 iOS系统，Android系统
     */
	var appName: string

	/**版本号
     * 可用性 iOS系统，Android系统
     */
	var appVersion: string

	/**系统类型
     * 可用性 iOS系统，Android系统
     */
	var systemType: 'ios' | 'android' | 'win' | 'wp';

	/**手机平台的系统版本
     * 可用性 iOS系统，Android系统
     */
	var systemVersion: string

	/**引擎版本信息
     * 可用性 iOS系统，Android系统
     */
	var version: string

	/**设备唯一标识
     * 可用性 iOS系统，Android系统
     */
	var deviceId: string

	/**iOS中用于推送的Token，若未从系统获取到则返回空字符串 
     * 可用性 iOS系统
    */
	var deviceToken: string

	/**设备型号
     * 可用性 iOS系统，Android系统
     */
    var deviceModel: string
    
	/**设备名称 比如：“柚子”的 iPhone 
     * 可用性 iOS系统，Android系统
     */
	var deviceName: string

	/**设备类型
     * 可用性 iOS系统，Android系统
     */
	var uiMode: 'pad' | 'phone' | 'tv' | 'car' | 'desk' | 'watch';

	/**运营商名称，若未获取到则返回none 
     * 可用性 iOS系统，Android系统
    */
	var operator: string

	/**当前网络连接类型，如 2g、3g、4g、wifi 等
     * 可用性 iOS系统，Android系统
     */
	var connectionType: 'unknown' | 'ethernet' | 'wifi' | '2g' | '3g' | '4g' | 'none';

	/** 
     * 应用是否全屏，布尔类型，只支持iOS
     * iOS系统
    */
	var fullScreen: boolean

	/** 
     * 屏幕分辨率宽，数字类型
     * iOS系统，Android系统
    */
    var screenWidth: number
    
    /** 
     * 屏幕分辨率高，数字类型
     * iOS系统，Android系统
    */
	var screenHeight: number

	/** 
     * 当前 window 名称，字符串类型
     * 该属性值为 openWin() 时传递的 name 参数值，注意首页的名称为 root
     * iOS系统，Android系统
    */
	var winName: string

	/**
     * 当前 window 宽度，数字类型
     * 此属性值不同于屏幕的分辨率，比如 iPhone 5 的分辨率为 640*1136，但是其 winWidth 为 320，因此前端需根据 winWidth 和 winHeight 来进行布局
     * iOS系统，Android系统
     */
	var winWidth: number

	/** 
     * 当前 window 高度，数字类型
     * 此属性值不同于屏幕的分辨率，比如 iPhone 5 的分辨率为 640*1136，但是其 winHeight 为 568（若不使用iOS7风格则为 548），因此前端需根据 winWidth 和 winHeight 来进行布局
     * iOS系统，Android系统
    */
	var winHeight: number

	/** 
     * frame 名称，字符串类型
     * 若当前环境为 window 中，则该属性值为空字符串
     * iOS系统，Android系统
    */
	var frameName: string

	/** 
     * frame 宽度，数字类型
     * 若当前环境为 window 中，则值和 winWidth 相同
     * iOS系统，Android系统
    */
	var frameWidth: number

	/** 
     * frame 高度，数字类型
     * 若当前环境为 window 中，则值和 winHeight 相同
     * iOS系统，Android系统
    */
    var frameHeight: number
    
    /** 
     * 页面不被其它内容（如状态栏）遮住的区域，JSON对象
     * 通过safeArea能够知道当前页面哪些地方被遮住，从而做出相应的调整，保证页面重要元素不被遮挡住
     * 安全区域上边缘，对于沉浸式下window中该值通常为状态栏高度，全屏或非沉浸式下为0（iPhone X竖屏时全屏状态下也为44）
     * iOS系统，Android系统
    */
    var safeArea: api.ConfigParams.SafeArea

    /** 
     * 页面参数，JSON 对象类型
     * 用于获取页面间传递的参数值，为 openWin()、openFrame() 等方法中的 pageParam 参数对应值
     * iOS系统，Android系统
    */
    var pageParam: Dictionary<any>

    /** 
     * widget 参数，JSON 对象类型
     * 用于获取 widget 间传递的参数值，为 openWidget() 方法中的 wgtParam 参数对应值
     * iOS系统，Android系统
    */
    var wgtParam: Dictionary<any>

    /** 
     * 当应用被第三方应用打开时，传递过来的参数，字符串类型
     * 建议通过appintent事件监听应用被第三方应用调起，并在事件回调里面获取参数进行处理。
     * iOS系统，Android系统
    */
    var appParam: string

    /** 
     * 当前应用状态栏是否支持沉浸式效果，布尔类型
     * iOS系统，Android系统
    */
    var statusBarAppearance: boolean

    /** 
     * widget: //协议对应的真实目录，即 widget 网页包的根目录，字符串类型
     * 注意该目录为只读，不要往该目录下面写文件
     * iOS系统，Android系统
    */
    var wgtRootDir: string

    /** 
     * fs: //协议对应地真实目录，字符串类型
     * iOS系统，Android系统
    */
    var fsDir: string

    /** 
     * cache://协议对应的真实目录，字符串类型
     * iOS 平台下载的文件一般存放于该目录下，否则提交 AppStore 审核时可能会不通过，且此目录下的内容在手机备份时不会被备份
     * iOS系统，Android系统
    */
    var cacheDir: string

    /** 
     * box://协议对应的真实目录，字符串类型
     * iOS上面在应用Documents下，安卓上面在系统为app分配的沙箱下，root或者越狱的手机可看到。
     * iOS系统，Android系统
    */
    var boxDir: string

    /** 
     * 获取config.xml配置的debug字段的值。
     * iOS系统，Android系统
    */
    var debug: boolean

    /** 
     * 渠道号，字符串类型
     * iOS系统，Android系统
    */
    var channel: string

    /** 
     * 设备是否越狱，布尔类型
     * iOS系统，Android系统
    */
    var jailbreak: boolean
}
