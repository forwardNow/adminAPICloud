declare namespace api {
	/** 
     * 打开window
     * 若window已存在，则会把该window显示到最前面，同时若url有变化或者reload参数为true时，页面会重新加载。若当前正在进行openWin、closeWin等带动画过渡的window操作，调用此方法会失效。
	 * iOS系统，Android系统
    */
	function openWin(params: api.ConfigParams.Winparams): void;

	/** 
     * 关闭 window
     * 若当前正在进行 openWin、closeWin 等带动画过渡的 window 操作，调用此方法会失效
	 * iOS系统，Android系统
    */
	function closeWin(params?: api.ConfigParams.CloseWin): void;

	/** 
     * 关闭到指定 window，最上面显示的 window 到指定 name 的 window 间的所有 window 都会被关闭
     * 若当前正在进行 openWin、closeWin 等带动画过渡的 window 操作，调用此方法会失效
	 * iOS系统，Android系统
    */
	function closeToWin(params: api.ConfigParams.CloseToWin): void;

	/** 
     * 设置 window 属性
	 * iOS系统，Android系统
    */
	function setWinAttr(params?: api.ConfigParams.SetWinAttr): void;

	/** 
     * 打开 frame
     * 若 frame 已存在，则会把该窗口显示到最前面并显示，如果 url 和之前的 url 有变化，或者 reload 为 true 时，页面会刷新
     * 此方法对 frameGroup 里面的 frame 不起作用
	 * iOS系统，Android系统
    */
	function openFrame(params: api.ConfigParams.FrameParams): void;

	/** 
     * 关闭frame
	 * iOS系统，Android系统
    */
	function closeFrame(params?: api.ConfigParams.CloseFrame): void;

	/** 
     * 设置frame属性
	 * iOS系统，Android系统
    */
	function setFrameAttr(params: api.ConfigParams.SetFrameAttr): void;

	/** 
     * 调整 frame 到前面
	 * iOS系统，Android系统
    */
	function bringFrameToFront(params: api.ConfigParams.SwitchFrame): void;

	/** 
     * 调整 frame 到后面
	 * iOS系统，Android系统
    */
	function sendFrameToBack(params: api.ConfigParams.SwitchFrame): void;

	/** 
     * 设置指定 frame 的页面加载监听，仅在 window 中调用生效，可以对多个 frame 进行监听。
	 * iOS系统，Android系统
    */
	function setFrameClient(
		params: api.ConfigParams.SetFrameClient,
		Callback: (
			ret: {
				/** 
				 * 加载状态
				 * 0	=>	开始加载
				 * 1	=>	加载进度发生变化
				 * 2	=>	结束加载
				 * 3	=>	title发生变化
				 * 4	=>	url发生变化
				*/
				state: 0 | 1 | 2 | 3 | 4;

				/** 
				 * state为 1 时 页面的加载进度 0 ~ 100
				*/
				progress?: number;

				/** 
				 * state为3时，页面当前的title，字符串类型
				*/
				title?: string;

				/** 
				 * state为0|2|4时，页面当前的url，字符串类型
				*/
				url?: string;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * frame 动画，支持平移，缩放，旋转和透明度变化
     * 仅支持 frame，不支持 window 以及 frameGroup 里面的 frame
	 * iOS系统，Android系统
    */
	function animation(
		params: api.ConfigParams.FrameAnimation,
		Callback: (ret: Dictionary<any>, err: Dictionary<any>) => void
	): void;

	/** 
     * 打开frame组
     * 若frame组已存在，则会把该frame组显示到最前面。frame组打开后，当前页面加载完成后，页面会预加载后面指定个数页面
	 * iOS系统，Android系统
    */
	function openFrameGroup(
		params: api.ConfigParams.FrameGroup,
		Callback: (
			ret: {
				/**当前 frame 名称 */
				name: string;

				/**当前 frame 索引 */
				index: number;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 关闭frame
	 * iOS系统，Android系统
    */
	function closeFrameGroup(params: api.ConfigParams.CloseFrameGroup): void;

	/** 
     * 设置 frame 组属性
	 * iOS系统，Android系统
    */
	function setFrameGroupAttr(params: api.ConfigParams.SetFrameGroupAttr): void;

	/** 
     * 设置 frame 组当前可见 frame
	 * iOS系统，Android系统
    */
	function setFrameGroupIndex(params: api.ConfigParams.SetFrameGroupIndex): void;

	/** 
     * 打开弹出层窗口，只支持iPad
     * 在弹出层窗口里面不能再打开弹出窗口，页面可以使用所有的 window 和 frame 相关操作，如 openWin、openFrame 等
     * 使用 execScript() 方法时，引擎只会在整个弹出层里面的窗口中去寻找要执行脚本的窗口，如果要和弹出层下面的窗口间进行通信，可以使用 sendEvent() 方法实现
	 * iOS系统
    */
	function openPopoverWin(params: api.ConfigParams.OpenPopoverWin): void;

	/** 
     * 关闭整个弹出层窗口，只 iPad 上面有效
     * 在当前弹出层里面的任意页面里面调用都会关闭整个弹出层
	 * iOS系统
    */
	function closePopoverWin(): void;

	/**
     * 打开侧滑式布局
     * 打开后，其所在 window 的 name 默认为 slidLayout，所以关闭整个侧滑布局可以通过 api.closeWin({name:'slidLayout'}) 实现，
     * 同时可以通过 api.openWin({name:'slidLayout'})来把整个侧滑显示到最前面
	 * iOS系统，Android系统
     */
	function openSlidLayout(
		params: api.ConfigParams.OpenSlidLayout,
		Callback: (
			ret: {
				/**侧滑方向，left或right */
				type: 'left' | 'right';

				/**侧滑事件，（slide => 当前处于滑动状态、open => 侧滑打开状态、close => 侧滑关闭状态 */
				event: 'slide' | 'open' | 'close';
			},
			err: Dictionary<any>
		) => void
	): void;

	/**
     * 向左或右进行侧滑
	 * iOS系统，Android系统
    */
	function openSlidPane(params: api.ConfigParams.OpenSlidPane): void;

	/** 
     * 当 SlidPane 处于左或右侧滑状态时，将其收起
	 * iOS系统，Android系统
    */
	function closeSlidPane(): void;

	/** 
     * 锁住 SlidPane，使其不能跟随手指滑动而移动
	 * iOS系统，Android系统
    */
	function lockSlidPane(): void;

	/** 
     * 解锁 SlidPane，使其能跟随手指滑动而移动
	 * iOS系统，Android系统
    */
	function unlockSlidPane(): void;

	/** 
     * 打开一个抽屉式侧滑 window，可以从当前 window 的左右边缘滑动拉出侧滑 window。
     * 此方法在 openWin 方法的基础上增加了 leftPane、rightPane 参数，所以可以通过 api.closeWin()方法来关闭整个抽屉式侧滑。
	 * iOS系统，Android系统
    */
	function openDrawerLayout(params: api.ConfigParams.OpenDrawerLayout): void;

	/** 
     * 打开抽屉式侧滑Pane
	 * iOS系统，Android系统
    */
	function openDrawerPane(params: api.ConfigParams.OpenSlidPane): void;

	/** 
     * 关闭抽屉式侧滑Pane
	 * iOS系统，Android系统
    */
	function closeDrawerPane(): void;

	/** 
     * 在指定 window 或者 frame 中加载HTML数据，对于 frameGroup 里面的 frame 也有效。
	 * iOS系统，Android系统
    */
	function loadData(params: api.ConfigParams.LoadData): void;

	/** 
     * 在指定 window 或者 frame 中执行脚本，对于 frameGroup 里面的 frame 也有效，若 name 和 frameName 都未指定，则在当前 window 中执行脚本，具体执行逻辑见补充说明。
	 * iOS系统，Android系统
    */
	function execScript(params: api.ConfigParams.ExecScript): void;

	/** 
     * 对当前页面或应用设置模糊效果
     * 该方法只支持iOS 8及以上系统
	 * iOS系统
    */
	function setBlurEffect(params: api.ConfigParams.SetBlurEffect): void;

	/** 
     * 当前window或者frame的a标签历史记录后退一页 若不传则表示对当前页面进行操作
	 * iOS系统，Android系统
    */
	function historyBack(Callback: (ret: { status: boolean }, err: Dictionary<any>) => void): void
	function historyBack(
		params: api.ConfigParams.History,
		Callback: (
			ret: {
				/**后退是否成功，失败时说明不能再后退了 */
				status: boolean;
			},
			err: Dictionary<any>
		) => void,
	): void;

	/** 
     * 当前window或者frame的a标签历史记录前进一页 若不传则表示对当前页面进行操作
	 * iOS系统，Android系统
    */
	function historyForward(Callback: (ret: { status: boolean }, err: Dictionary<any>) => void): void
	function historyForward(
		params: api.ConfigParams.History,
		Callback: (
			ret: {
				/**前进是否成功，失败时说明不能再前进了 */
				status: boolean;
			},
			err: Dictionary<any>
		) => void,
	): void;

	/** 
     * 页面向上滚动一页
	 * iOS系统，Android系统
    */
	function pageUp(Callback: (ret: { scrolled: boolean; }, err: Dictionary<any>) => void): void;
	function pageUp(
		params: api.ConfigParams.PageUp,
		Callback: (
			ret: {
				/**是否滚动，为false时说明当前页面已经到达顶部了 */
				scrolled: boolean;
			},
			err: Dictionary<any>
		) => void,
	): void;

	/** 
     * 页面向下滚动一页
	 * iOS系统，Android系统
    */
	function pageDown(Callback: (ret: { scrolled: boolean; }, err: Dictionary<any>) => void): void;
	function pageDown(
		params: api.ConfigParams.PageDown,
		Callback: (
			ret: {
				/**是否直接滚动到最底部 */
				scrolled: boolean;
			},
			err: Dictionary<any>
		) => void,
	): void;

	/** 
     * 移除启动图。若 config.xml 里面配置 autoLaunch 为 false，则启动图不会自动消失，直到调用此方法移除。
	 * iOS系统，Android系统
    */
	function removeLaunchView(params: api.ConfigParams.RemoveLaunchView): void;

	/** 
     * 重新显示闪屏广告，若没有闪屏广告则不显示。
	 * iOS系统，Android系统
    */
	function showLaunchView(): void;

	/** 
     * 解析元素 tapmode 属性，优化点击事件处理
     * 默认页面加载完成后，引擎会对 dom 里面的元素进行 tapmode 属性解析，若是之后用代码创建的 dom 元素，则需要调用该方法后 tapmode 属性才会生效
	 * iOS系统，Android系统
    */
	function parseTapmode(): void;

	/** 
     * 安装应用，如果是苹果的AppStore应用地址，将会跳转到AppStore应用详情页面
	 * iOS系统，Android系统
	 * ( Android =>	appUri: 'file://xxx.apk'，
	 * 	 ios	 => 'https://list.kuaiapp.cn/list/KuaiAppZv7.1.plist' //安装包对应plist地址)
    */
	function installApp(params: api.ConfigParams.InstallApp): void;

	/** 
     * 卸载应用，只支持Android
	 * iOS系统，Android系统
    */
	function uninstallApp(params: api.ConfigParams.UninstallApp): void;

	/**
     * 打开手机上其它应用，可以传递参数 
	 * iOS系统，Android系统
    */
	function openApp(
		params: api.ConfigParams.OpenApp,
		Callback?: (
			ret: {
				/**错误描述 */
				msg: Dictionary<any>;
			},
			err: Dictionary<any>
		) => void
	): void;

	/**
     * 判断设备上面是否已安装指定应用
     * 注意：iOS9中系统对检测应用是否安装的方法做了限制，若想得到期望的结果，需要在config.xml里面配置可被检测的URL Scheme。
	 * iOS系统，Android系统
    */
	function appInstalled(
		params: api.ConfigParams.AppInstalled,
		Callback?: (
			ret: {
				/**是否安装 */
				installed: boolean;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 重启应用，云修复完成后可以调用此方法来重启应用使云修复生效。
	 * iOS系统，Android系统
    */
	function rebootApp(): void;

	/** 
     * 打开 Widget，若此 widget 已经被打开，则会把其调整到最前面显示
	 * iOS系统，Android系统
    */
	function openWidget(
		params: api.ConfigParams.OpenWidget,
		Callback: (ret: Dictionary<any>, err: Dictionary<any>) => void
	): void;

	/** 
     * 关闭指定widget，也可以关闭应用
	 * iOS系统，Android系统
    */
	function closeWidget(params?: api.ConfigParams.CloseWidget): void;

	/** 
     * 跨域异步请求，支持标准HTTP协议，支持HTTPS单向/双向认证请求，支持文件上传，支持缓存。 
     * HTTPS需要向国际受信任的CA证书颁发机构购买CA证书，否则将可能请求失败，可以在config中配置不校验CA证书是否受信任。 
     * 云编译开启全局加密的情况下，请务必使用api.ajax，避免使用JQ等框架的ajax，否则将引起请求失败。
	 * iOS系统，Android系统
    */
	function ajax(
		params: api.ConfigParams.Ajax,
		Callback: (
			ret: {
				/** returnAll参数传true时，内部字段为：*/
				/**状态码，数字类型 */
				statusCode: number;

				/**响应头，JSON对象 */
				headers: Dictionary<string>;

				/**
				 * 消息体，即服务器返回的数据。若dataType为json，那么body为JSON对象，否则为字符串
				 * 上传完成时，服务器返回的数据。
				 */
				body: Dictionary<any>;

				/**上传文件时，若report字段传true返回上传进度时，原服务器返回数据会被放在body字段里面，内部字段为 */
				/**上传进度，0.00-100.00 */
				progress: number;

				/**上传状态，数字类型。（0：上传中、1：上传完成、2：上传失败） */
				status: 0 | 1 | 2;
			} | any,
			err: IAjax.TFun.NetWorkErrFun
		) => void
	): void;

	/** 
     * 取消异步请求
	 * iOS系统，Android系统
    */
	function cancelAjax(params: api.ConfigParams.CancelAjax): void;

	/** 
     * 下载文件
	 * iOS系统，Android系统
    */
	function download(
		params: api.ConfigParams.Download,
		Callback: (
			ret: {
				/** 文件大小，数字类型*/
				fileSize: number;

				/**下载进度（0-100），数字类型 */
				percent: number;

				/**下载状态，数字类型。（0：下载中、1：下载完成、2：下载失败） */
				state: 0 | 1 | 2;

				/**存储路径（字符串类型） */
				savePath: string;
			},
			err: {
				/** 错误描述*/
				msg: string;
			}
		) => void
	): void;

	/** 
     * 取消下载
	 * iOS系统，Android系统
    */
	function cancelDownload(params: api.ConfigParams.CancelDownload): void;

	/**
     * 图片缓存
	 * iOS系统，Android系统
     */
	function imageCache(
		params: api.ConfigParams.ImageCache,
		Callback: (
			ret: {
				/**是否成功 */
				status: boolean;

				/**图片本地存储路径，若下载失败，则返回传入的url，字符串类型 */
				url: string;
			},
			err: Dictionary<any>
		) => void
	): void;

	/**
     * 读取文本文件内容，只支持utf-8编码文本类型文件
	 * iOS系统，Android系统
     */
	function readFile(
		params: api.ConfigParams.ReadFile,
		Callback?: (
			ret: {
				/**操作成功状态值 */
				status: boolean;

				/**文件内容，字符串类型 */
				data: string;
			},
			err: {
				/** 错误码
                 * 0    =>  没有错误
                 * 1    =>  找不到文件错误
                 * 2    =>  不可读取错误
                 * 3    =>  编码格式错误
                 * 4    =>  无效操作错误
                 * 5    =>  无效修改错误
                 * 6    =>  磁盘溢出错误
                 * 7    =>  文件已存在错误  
                */
				code: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

				/**错误描述 */
				msg: Dictionary<any>;
			}
		) => void
	): void;

	/** 
     * 写入内容到文本文件
	 * iOS系统，Android系统
    */
	function writeFile(
		params: api.ConfigParams.WriteFile,
		Callback: (
			ret: {
				/**操作成功状态值 */
				status: boolean;
			},
			err: {
				/** 错误码
                 * 0    =>  没有错误
                 * 1    =>  找不到文件错误
                 * 2    =>  不可读取错误
                 * 3    =>  编码格式错误
                 * 4    =>  无效操作错误
                 * 5    =>  无效修改错误
                 * 6    =>  磁盘溢出错误
                 * 7    =>  文件已存在错误  
                */
				code: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

				/**错误描述 */
				msg: Dictionary<any>;
			}
		) => void
	): void;

	/** 
     * 设置偏好数据
	 * iOS系统，Android系统
    */
	function setPrefs(params: api.ConfigParams.SetPrefs): void;

	/** 
     * 获取偏好设置值
	 * iOS系统，Android系统
    */
	function getPrefs(
		params: api.ConfigParams.GetPrefs,
		Callback?: (
			ret: {
				/**值 */
				value: string;
			},
			err: Dictionary<any>
		) => void
	): string;

	/** 
     * 删除偏好值
	 * iOS系统，Android系统
    */
	function removePrefs(params: api.ConfigParams.PrefsBase): void;

	/** 
     * 清除缓存，包括下载的文件、拍照临时文件、网页缓存文件等，清除时可能需要消耗一定时间。
	 * iOS系统，Android系统
    */
	function clearCache(Callback: (ret: Dictionary<any>, err: Dictionary<any>) => void): void;
	function clearCache(
		params: api.ConfigParams.ClearCache,
		Callback: (ret: Dictionary<any>, err: Dictionary<any>) => void,
	): void;

	/** 
     * 获取缓存大小
	 * iOS系统，Android系统
	 * 同步直接返回  异步callback 返回
    */
	function getCacheSize(params: api.ConfigParams.GetCacheSize): void;
	function getCacheSize(
		Callback: (
			ret: {
				/**缓存大小，单位为Byte，数字类型。（-1：无存储设备、-2：正在准备USB存储设备、-3：无法访问存储设备 */
				size: number;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 获取总存储空间大小
	 * iOS系统，Android系统 
	 * 同步直接返回  异步callback 返回
    */
	function getTotalSpace(params: api.ConfigParams.GetCacheSize): void;
	function getTotalSpace(
		Callback: (
			ret: {
				/**总存储空间大小，单位为Byte，数字类型。（-1：无存储设备、-2：正在准备USB存储设备、-3：无法访问存储设备 */
				size: number;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 获取剩余存储空间大小
	 * iOS系统，Android系统 
	 * 同步直接返回  异步callback 返回
    */
	function getFreeDiskSpace(params: api.ConfigParams.GetCacheSize): void;
	function getFreeDiskSpace(
		Callback: (
			ret: {
				/**剩余存储空间大小，单位为Byte，数字类型。（-1：无存储设备、-2：正在准备USB存储设备、-3：无法访问存储设备 */
				size: number;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 从加密的key.xml文件中读取指定数据，key.xml文件放置于网页包里面的res目录，配置方式：
     * <?xml version="1.0" encoding="UTF-8"?>
        <security>
        <item name="appKey" value="1111111"/>
		</security>
	 * iOS系统，Android系统
    */
	function loadSecureValue(
		params: api.ConfigParams.GetPrefs,
		Callback?: (
			ret: {
				/**值*/
				value: string;
			},
			err: Dictionary<any>
		) => void
	): string;

	/** 
     * 移除事件监听
	 * iOS系统，Android系统
    */
	function removeEventListener(params: api.ConfigParams.EventBase): void;

	/** 
     * 使用 SuperWebView 时，js 向原生发送消息。此方法只在使用 SuperWebView 时有效。
	 * iOS系统，Android系统
    */
	function accessNative(
		params: api.ConfigParams.AccessNative,
		Callback: (ret: Dictionary<any>, err: Dictionary<any>) => void
	): void;

	/** 
     * 向用户发出震动、声音提示、灯光闪烁、手机状态栏通知等提示行为，支持闹钟功能。如果是状态栏通知，当用户点击该通知，页面可以通过监听 noticeclicked 事件获取该通知相关内容
     * 注：当应用在前台弹出通知提示时，iOS平台的通知将在显示几秒后消失，不会在通知栏保留。
	 * 如果 notification 时传入了 notify或者alarm，那么将收到 callback，返回本次状态栏通知的 id或者闹铃 id，该 id 可用于取消状态栏通知或者闹铃。
	 * iOS系统，Android系统
    */
	function notification(params?: api.ConfigParams.Notification): void
	function notification(
		params: api.ConfigParams.Notification,
		Callback?: (
			ret: {
				/**弹出到状态栏通知的id或者设置的闹铃id，可用于取消通知或者闹铃*/
				id: number;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 取消本应用弹出到状态栏的某个或所有通知，也可以清除设定的闹铃
	 * iOS系统，Android系统
    */
	function cancelNotification(params: api.ConfigParams.CancelNotification): void;

	/** 
     * 调用系统自带定位功能，开始定位。
	 * iOS系统，Android系统
    */
	function startLocation(
		params: api.ConfigParams.StartLocation,
		Callback: (
			ret: {
				/**经度*/
				longitude: number;

				/**纬度 */
				latitude: number;

				/**时间戳 */
				timestamp: number;

				/**定位成功 */
				status: boolean;
			},
			err: {
				/**错误描述 */
				msg: Dictionary<any>;
			}
		) => void
	): void;

	/** 
     * 停止定位。
	 * iOS系统，Android系统
    */
	function stopLocation(): void;

	/** 
     * 获取位置信息，获取成功后自动停止获取。
     * 若之前已通过 startLocation() 方法进行定位，则直接返回上次定位的数据，否则使用默认设置进行定位。
	 * iOS系统，Android系统
    */
	function getLocation(
		Callback: (
			ret: {
				/**经度*/
				longitude: number;

				/**纬度 */
				latitude: number;

				/**时间戳 */
				timestamp: number;

				/**定位成功 */
				status: boolean;
			},
			err: {
				/**错误描述 */
				msg: Dictionary<any>;
			}
		) => void
	): void;

	/** 
     * 开启传感器。
	 * iOS系统，Android系统
    */
	function startSensor(
		params: Constant.SensorType,
		Callback: (
			ret: {
				/**X轴分量值*/
				x: number;

				/**Y轴分量值*/
				y: number;

				/**Z轴分量值*/
				z: number;

				/**是否接近设备 */
				proximity: boolean;

				/**操作成功状态值 */
				status: boolean;
			},
			err: {
				/**错误描述 */
				msg: Dictionary<any>;
			}
		) => void
	): void;

	/** 
     * 停止传感器。
	 * iOS系统，Android系统
    */
	function stopSensor(params: Constant.SensorType): void;

	/** 
     * 拨打电话或进行faceTime。
	 * iOS系统，Android系统
    */
	function call(params: api.ConfigParams.Call): void;

	/** 
     * 调用系统短信界面发送短信，或者后台直接发送短信。
	 * iOS系统，Android系统
    */
	function sms(
		params: api.ConfigParams.Sms,
		Callback: (
			ret: {
				/**发送状态*/
				status: boolean;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 发送邮件。
	 * iOS系统，Android系统
    */
	function mail(
		params: api.ConfigParams.Mail,
		Callback: (
			ret: {
				/**发送状态*/
				status: boolean;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 在应用内打开系统通讯录界面选择联系人。
	 * iOS系统，Android系统
    */
	function openContacts(
		Callback: (
			ret: {
				/**操作成功状态值 */
				status: boolean;

				/**姓名 */
				name: string;

				/**电话号码 */
				phone: string;
			},
			err: {
				/**错误描述 */
				msg: Dictionary<any>;
			}
		) => void
	): void;

	/** 
     * 设置是否全屏。
	 * iOS系统，Android系统
    */
	function setFullScreen(params: api.ConfigParams.SetFullScreen): void;

	/** 
     * 设置状态栏样式为白色（适用于深色背景）或黑色（适用于浅色背景），以及设置状态栏背景颜色。
	 * iOS系统，Android系统
    */
	function setStatusBarStyle(params?: api.ConfigParams.SetStatusBarStyle): void;

	/** 
     * 设置屏幕旋转方向。
	 * iOS系统，Android系统
    */
	function setScreenOrientation(params: Constant.ScreenOrientation): void;

	/** 
     * 设置是否禁止屏幕休眠。
	 * iOS系统，Android系统
    */
	function setKeepScreenOn(params: api.ConfigParams.SetKeepScreenOn): void;

	/** 
     * 回到系统桌面。
	 * Android系统
    */
	function toLauncher(): void;

	/** 
     * 设置是否禁止截屏，只支持Android。
	 * Android系统
    */
	function setScreenSecure(params: api.ConfigParams.SetScreenSecure): void;

	/** 
     * 设置应用图标右上角数字，支持所有 iOS 手机，以及部分 Android 手机，如小米和三星的某些型号，不支持的设备，表现结果为调用该接口无任何效果。
	 * iOS系统
    */
	function setAppIconBadge(params: api.ConfigParams.SetAppIconBadge): void;

	/** 
     * 获取本机电话号码，只支持 Android 部分手机。
	 * Android系统
	 * 同步直接返回 异步通过callback返回
    */
	function getPhoneNumber(params: api.ConfigParams.GetCacheSize): void
	function getPhoneNumber(
		Callback: (
			ret: {
				/**电话号码，字符串类型 */
				value: string;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 检测应用是否有某个或多个权限。
	 * iOS系统，Android系统
    */
	function hasPermission(params: api.ConfigParams.PermissionBase): Array<{
		/** 权限名，字符串类型*/
		name: 'camera' | 'contacts' | 'microphone' | 'photos' | 'location' | 'locationAlways' | 'notification' | 'calendar' | 'phone' | 'sensor' | 'sms' | 'storage'

		/**是否允许，如果从未请求过该权限或者用户未做出过选择时将返回false，布尔类型 */
		granted: boolean

		/**是否从未请求过该权限或者用户未做出过选择，只支持iOS，注意：请求notification权限时无法获取该状态，布尔类型 */
		undetermined: boolean
	}>;

	/** 
     * 向系统请求某个或多个权限。
     * 对于iOS平台，第一次请求权限时会弹出权限选择框，如果用户没有进行选择就退出应用，那么下次再次请求权限时会继续弹出选择框；
     * 如果用户选择了不允许，那么再次请求权限时将不会再弹出选择框，而是直接跳转到系统设置中该应用的设置界面（跳转只支持iOS8及以上系统）。
     * 对于Android平台，只要用户没有选择”不再提示“，那么再次请求权限时都将继续弹出权限选择框；如果用户选择了”不再提示“，那么再次请求权限时将不会再弹出选择框，而是直接跳转到权限设置界面。
	 * iOS系统，Android系统
    */
	function requestPermission(
		params: api.ConfigParams.RequestPermission,
		Callback: (
			ret: {
				list: [
					{
						/**权限名，字符串类型 */
						name: string;

						/**是否允许，布尔类型 */
						granted: boolean;
					}
				];

				/**用户是否选择了“不再提示“，只支持Android，布尔类型 */
				never: boolean;

				/**请求跟踪码，只支持Android，数字类型。 */
				code: number;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 弹出带一个按钮的对话框，更多按钮的对话框请使用confirm方法。
	 * iOS系统，Android系统
    */
	function alert(
		params: api.ConfigParams.Confirm,
		Callback?: (
			ret: {
				/**按钮点击序号，从1开始 */
				buttonIndex: number;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 弹出带两个或三个按钮的confirm对话框。
	 * iOS系统，Android系统
    */
	function confirm(
		params: api.ConfigParams.Confirm,
		Callback: (
			ret: {
				/**按钮点击序号，从1开始 */
				buttonIndex: number;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 弹出带两个或三个按钮和输入框的对话框。
	 * iOS系统，Android系统
    */
	function prompt(
		params: api.ConfigParams.Prompt,
		Callback: (
			ret: {
				/**按钮点击序号，从1开始 */
				buttonIndex: number;

				/** 输入文字*/
				text: string;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 底部弹出框。
	 * iOS系统，Android系统
    */
	function actionSheet(
		params: api.ConfigParams.ActionSheet,
		Callback: (
			ret: {
				/**按钮点击序号，从1开始 */
				buttonIndex: number;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 显示进度提示框。
	 * iOS系统，Android系统
    */
	function showProgress(params?: api.ConfigParams.ShowProgress): void;

	/** 
     * 隐藏进度提示框。
	 * iOS系统，Android系统
    */
	function hideProgress(): void;

	/** 
     * 弹出一个定时自动关闭的提示框。
	 * iOS系统，Android系统
    */
	function toast(params: api.ConfigParams.Toast): void;

	/** 
     * 打开时间选择器。
	 * iOS系统，Android系统
    */
	function openPicker(
		params: api.ConfigParams.OpenPicker,
		Callback: (
			ret: {
				/**年 */
				year: number;

				/**月 */
				month: number;

				/**日 */
				day: number;

				/**时 */
				hour: number;

				/**分 */
				minute: number;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 显示默认下拉刷新组件，使用默认下拉刷新组件时页面必须设置为弹动。
	 * iOS系统，Android系统
    */
	function setRefreshHeaderInfo(
		params: api.ConfigParams.SetRefreshHeaderInfo,
		Callback: (ret: Dictionary<any>, err: Dictionary<any>) => void
	): void;

	/** 
     * 显示自定义下拉刷新组件
     * 使用自定义下拉刷新组件之前，需要在config.xml里面配置要使用的自定义下拉刷新模块名称，如：
     * <preference name="customRefreshHeader" value="UIPullRefresh"/>
     * 或者在使用openWin、openFrame等方法打开页面时传入customRefreshHeader参数来指定。
	 * （params => 由对应的自定义下拉刷新模块提供，
	 *  callback => 由对应的自定义下拉刷新模块提供）
    */
	function setCustomRefreshHeaderInfo(
		params: Dictionary<any>,
		Callback: (ret: Dictionary<any>, err: Dictionary<any>) => void
	): void;

	/** 
     * 设置下拉刷新组件为刷新中状态
    */
	function refreshHeaderLoading(): void;

	/** 
     * 通知下拉刷新数据加载完毕，组件会恢复到默认状态
    */
	function refreshHeaderLoadDone(): void;

	/** 
     * 展示一个悬浮框，浮动在屏幕上。
     * 对主widget无效
    */
	function showFloatBox(
		params: api.ConfigParams.ShowFloatBox,
		Callback?: (
			ret: {
				/**事件类型，取值范围：click */
				type: 'click';
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
     * 通过调用系统默认相机或者图库应用，获取图片以及视频媒体文件。
    */
	function getPicture(
		params: api.ConfigParams.GetPicture,
		Callback: (
			ret: {
				/**图片路径 */
				data: string;

				/**base64数据，destinationType为base64时返回 */
				base64Data: string;

				/**视频时长（数字类型） */
				duration: number;
			},
			err: {
				/**错误描述 */
				msg: Dictionary<any>;
			}
		) => void
	): void;

	/** 
     * 保存图片和视频到系统相册
    */
	function saveMediaToAlbum(
		params: api.ConfigParams.SaveMediaToAlbum,
		Callback: (
			ret: {
				/**是否保存成功 */
				status: boolean;
			},
			err: {
				/**错误描述 */
				msg: Dictionary<any>;
			}
		) => void
	): void;

	/** 
	 * 录制amr格式音频
	*/
	function startRecord(params?: api.ConfigParams.StartRecord): void;

	/** 
	 * 停止录音
	*/
	function stopRecord(
		Callback: (
			ret: {
				/**字符串，返回的音频地址 */
				path: string;

				/**数字类型，音频的时长	 */
				duration: number;
			},
			err: Dictionary<any>
		) => void
	): void;

	/** 
	 * 播放本地音频，支持amr格式
	*/
	function startPlay(
		params: api.ConfigParams.StartPlay,
		Callback: (ret: Dictionary<any>, err: Dictionary<any>) => void
	): void;

	/** 
	 * 停止播放音频
	*/
	function stopPlay(): void;

	/** 
	 * 打开系统视频播放器
	*/
	function openVideo(params: api.ConfigParams.OpenVideo): void;
}
