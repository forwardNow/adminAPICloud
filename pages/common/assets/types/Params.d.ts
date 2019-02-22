declare namespace api {
	namespace ConfigParams {
		interface Winparams extends WinFrameBase, WinActionBase {
			/**默认值：无
             * 描述：（可选项）是否隐藏原生navigationBar控件，该字段只 iOS 有效 */
			hideTopBar?: boolean;

			/**默认值：无
             * 描述：（可选项）是否隐藏原生tabBar控件，该字段只 iOS 有效 */
			hideBottomBar?: boolean;

			/**默认值：0
             * 描述：（可选项）window 显示延迟时间，适用于将被打开的 window 中可能需要打开有耗时操作的模块时，可延迟 window 展示到屏幕的时间，保持 UI 的整体性 */
			delay?: number;

			/** 
             * 默认值：false
             * 描述：（可选项）是否隐藏虚拟home键。设置为true时，虚拟home键会在屏幕没有触摸操作时自动隐藏，触摸后又会显示出来。只支持iOS
            */
			hideHomeIndicator?: boolean;
		}

		interface RectBase {
			/**左上角x坐标 */
			x: number;

			/**左上角y坐标 */
			y: number;

			/**宽度，若传'auto'，页面从x位置开始自动充满父页面宽度 */
			w: number | 'auto';

			/**高度，若传'auto'，页面从y位置开始自动充满父页面高度 */
			h: number | 'auto';
		}

		interface RectFrame extends RectBase {
			/**相对父 window 左外边距的距离 */
			marginLeft?: number;

			/**相对父 window 上外边距的距离 */
			marginTop?: number;

			/**相对父 window 下外边距的距离 */
			marginBottom?: number;

			/**相对父 window 右外边距的距离 */
			marginRight?: number;
		}

		/** 
		 * 安全区域边缘 页面不被其它内容（如状态栏）遮住的区域，JSON对象
		*/
		interface SafeArea {
			/** 
             * 安全区域上边缘，对于沉浸式下window中该值通常为状态栏高度，全屏或非沉浸式下为0（iPhone X竖屏时全屏状态下也为44）
            */
			top: number;

			/** 
             * 安全区域左边缘，通常为0（iPhone X横屏时为44）
            */
			left: number;

			/** 
             * 安全区域下边缘，通常为0（iPhone X竖屏时为34，横屏时为21） 
            */
			bottom: number;

			/** 
             * 安全区域右边缘，通常为0（iPhone X横屏时为44）
            */
			right: number;
		}

		/**关闭 window */
		interface CloseWinBase {
			/** 
			 * 默认值：无
			 * 描述：（可选项）动画参数，不传时使用默认动画
			*/
			animation?: Constant.AnimationTypeBase;
		}

		interface CloseWin extends CloseWinBase {
			/** 
			 * 默认值：无
			 * 描述：（可选项）window 名字，不传时关闭当前 window，为 root 时无效
			*/
			name?: string;
		}

		/**关闭到指定 window，最上面显示的 window 到指定 name 的 window 间的所有 window 都会被关闭  传 root 回到起始页 */
		interface CloseToWin extends CloseWinBase {
			/** 
			 * 默认值：无
			 * 描述：window 名字
			*/
			name: string;
		}

		/**设置 window 属性 */
		interface SetWinAttr extends CommonBase, WinActionBase {
			/** 
			 * 默认值：无
			 * 描述：（可选项）是否支持滑动返回。iOS7.0及以上系统中，在新打开的页面中向右滑动，可以返回到上一个页面，该字段只iOS有效
			*/
			slidBackEnabled?: boolean;

			/**
			 * 默认值：无
			 * 描述：（可选项）是否隐藏虚拟home键。设置为true时，虚拟home键会在屏幕没有触摸操作时自动隐藏，触摸后又会显示出来。只支持iOS
			*/
			hideHomeIndicator?: boolean;
		}

		/**打开 frame */
		interface FrameParams extends WinFrameBase {
			/** 
			 * 默认值：充满整个父页面
			 * 描述：（可选项）frame 的位置和大小，设置 margin 后，在不同手机上面会保持与父页面的各方向边距一致，而中间区域会自动扩充。
			*/
			rect?: RectFrame;

			/** 
			 * 默认值：auto
			 * 描述：（可选项）当键盘弹出时，输入框被盖住时，当前页面的调整方式,只iOS有效，Android请在 config.xml 里面配置并云编译使用
			*/
			softInputMode?: string;
		}

		/**关闭frame */
		interface CloseFrame {
			/** 
             * 默认值：无
             * 描述：（可选项）frame 名字，不传时关闭当前 frame
            */
			name?: string;
		}

		/**设置frame属性 */
		interface SetFrameAttr extends CommonBase, Constant.SoftInputMode {
			/**
			 * 默认值：无
			 * 描述：frame 名称
			*/
			name: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）设置本 frame 是否隐藏，设置显示隐藏并不会改变frame在整个窗口系统之间的层级关系
			*/
			hidden?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）窗口区域
			*/
			rect?: RectBase;
		}

		/**调整Frame的前后顺序 */
		interface SwitchFrame {
			/** 
			 * 默认值：无
			 * 描述：待调整显示顺序的 frame 名字
			*/
			from: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）frame 名字，不传时调整 from 对应 frame 到最前面，否则调整 from 对应 frame 到此 frame 前面
			*/
			to?: string;
		}

		/**设置指定 frame 的页面加载监听，仅在 window 中调用生效，可以对多个 frame 进行监听。 */
		interface SetFrameClient {
			/** 
			 * 默认值：无
			 * 描述：frame 名字
			*/
			frameName: string;
		}

		/** frame 动画，支持平移，缩放，旋转和透明度变化*/
		interface FrameAnimation extends Constant.AnimationFrameType {
			/** 
			 * 默认值：当前 frame
			 * 描述：frame 名字
			*/
			name: string;

			/** 
			 * 默认值：0
			 * 描述：（可选项）动画延迟时间，单位毫秒，默认立即开始
			*/
			delay?: number;

			/** 
			 * 默认值：0
			 * 描述：（可选项）动画过渡时间，单位毫秒
			*/
			duration?: number;

			/** 
			 * 默认值：0
			 * 描述：（可选项）动画次数，默认不重复，为-1时无限重复
			*/
			repeatCount?: number;

			/** 
			 * 默认值：false
			 * 描述：（可选项）一次动画结束后是否自动反转动画
			*/
			autoreverse?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）整个页面的透明度，介于0 1之间，Android 不支持
			*/
			alpha?: number;

			/** 
			 * 默认值：无
			 * 描述：（可选项）位置平移参数
			*/
			translation?: AxisBase;

			/**
			 * 默认值：无
			 * 描述：（可选项）页面缩放参数，Android 不支持
			*/
			scale?: AxisBase;

			/** 
			 * 默认值：无
			 * 描述：（可选项）页面旋转参数，Android 不支持
			*/
			rotation?: RotationParams;
		}
		interface AxisBase {
			/**x轴方向上的(平移距离 | 放大倍率 | 旋转) */
			x: number;

			/**y方向上的(平移距离 | 放大倍率 | 旋转) */
			y: number;

			/**z轴方向上的(平移距离 | 放大倍率 | 旋转) */
			z: number;
		}

		interface RotationParams extends AxisBase {
			/**旋转角度，默认0 */
			degree: number;
		}

		/** 打开frame组*/
		interface FrameGroup {
			/** 
			 * 默认值：无
			 * 描述：frame 组名字
			*/
			name: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）frame 组背景，颜色（#fff,#ffffff,rgba(r,g,b,a)）或图片（支持文件路径协议和相对路径）
			*/
			background?: string;

			/** 
			 * 默认值：true
			 * 描述：（可选项）frame 组是否能够左右滚动
			*/
			scrollEnabled?: boolean;

			/** 
			 * 默认值：充满整个父页面
			 * 描述：（可选项）frameGroup 的位置和大小，设置 margin 后，在不同手机上面会保持与父页面的各方向边距一致，而中间区域会自动扩充。
			*/
			rect?: RectFrame;

			/** 
			 * 默认值：0
			 * 描述：（可选项）默认显示的页面索引
			*/
			index?: number;

			/** 
			 * 默认值：1
			 * 描述：（可选项）预加载的 frame 个数，默认加载当前页后面一个
			*/
			preload?: number;

			/** 
			 * 默认值：无
			 * 描述：frame 数组
			*/
			frames: Array<WinFrameCommon & Constant.SoftInputMode>;
		}

		interface CloseFrameGroup {
			/** 
			 * 默认值：无
			 * 描述：描述：frame 组名字
			*/
			name: string;
		}

		/**设置 frame 组属性 */
		interface SetFrameGroupAttr {
			/** 
			 * 默认值：无
			 * 描述：frame 组名字
			*/
			name: string;

			/** 
			 * 默认值：无描述：（可选项）frame 组是否隐藏，设置显示隐藏并不会改变frame组在整个窗口系统之间的层级关系。
			*/
			hidden?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）frame 组是否能够左右滚动
			*/
			scrollEnabled?: boolean;

			/** 
			 * 默认值：无描述：（可选项）frame 组区域
			*/
			rect?: RectBase;
		}

		/**设置 frame 组当前可见 frame */
		interface SetFrameGroupIndex {
			/** 
			 * 默认值：无
			 * 描述：frame 组名字
			*/
			name: string;

			/** 
			 * 默认值：无
			 * 描述：frame 索引
			*/
			index: number;

			/** 
			 * 默认值：false
			 * 描述：（可选项）是否平滑滚动至目标窗口，即是否带有动画
			*/
			scroll?: boolean;

			/** 
			 * 默认值：false
			 * 描述：（可选项）是否刷新 frame
			*/
			reload?: boolean;
		}

		/**打开弹出层窗口，只支持iPad */
		interface OpenPopoverWin extends WinBase, Constant.SoftInputMode {
			/** 
			 * 默认值：default
			 * 描述：（可选项）弹出窗口展示类型
			 * default	=>	弹出层从底部往上弹出，显示在屏幕中间一片指定区域，周围为黑色半透明
			 * popover	=>	弹出层带指示箭头，可设置箭头方向和位置
			*/
			style?: 'default' | 'popover';

			/** 
			 * 默认值：540
			 * 描述：（可选项）弹出窗口显示的宽度
			*/
			width?: number;

			/** 
			 * 默认值：620描述：（可选项）弹出窗口显示的高度
			*/
			height?: number;

			/** 
			 * 默认值：无
			 * 描述：（可选项）当style为popover时，箭头指向的位置
			*/
			arrowRect?: RectBase;

			/** 
			 * 默认值：any
			 * 描述：（可选项）当style为popover时，箭头指向的方向
			*/
			arrowDirection?: 'left' | 'right' | 'up' | 'down' | 'any';

			/**
             * 默认值：false
             * 描述：（可选项）是否显示等待框，此参数即将废弃，使用 progress 参数代替。若传了 progress 参数，此参数将忽略
            */
			showProgress?: boolean;

			/**
			* 默认值：无
			* 描述：（可选项）页面加载进度配置信息，若不传则无加载进度效果 
		   */
			progress?: Constant.ProgressTypeBase;
		}

		/**打开侧滑式布局 */
		interface OpenSlidLayout {
			/** 
			 * 默认值：all
			 * 描述：（可选项）侧滑类型（left：左侧滑、right：右侧滑、all：左右侧滑）。安卓暂只支持left。
			*/
			type?: 'left' | 'right' | 'all';

			/** 
			 * 默认值：60
			 * 描述：（可选项）左侧滑时，侧滑 window 停留时露出的宽度。即将废弃，用 slidPaneStyle 中 leftEdge 参数代替
			*/
			leftEdge?: number;

			/** 
			 * 默认值：60
			 * 描述：（可选项）右侧滑时，侧滑 window 停留时露出的宽度。即将废弃，用 slidPaneStyle 中 rightEdge 参数代替
			*/
			rightEdge?: number;

			/** 
			 * 默认值：无
			 * 描述：侧滑层 window 样式
			*/
			slidPaneStyle?: SlidPaneStyle;

			/** 
			 * 默认值：无
			 * 描述：底部固定层 window 样式
			*/
			fixedPaneStyle?: FixedPaneStyle;

			/** 
			 * 默认值：无
			 * 描述：底部固定层 window
			*/
			fixedPane?: WinBase & Constant.SoftInputMode;

			/** 
			 * 默认值：无
			 * 描述：侧滑层window
			*/
			slidPane?: WinBase & Constant.SoftInputMode;
		}
		interface SlidPaneStyle {
			/**（可选项）左侧滑时，侧滑window停留时露出的宽度，默认60，数字类型 */
			leftEdge?: number;

			/**( 可选项）右侧滑时，侧滑window停留时露出的宽度，默认60，数字类型 */
			rightEdge?: number;

			/** （可选项）左侧滑时，侧滑window移动时能缩放的最小倍数，0-1.0，默认1.0，数字类型，只支持iOS*/
			leftScale?: number;

			/**（可选项）右侧滑时，侧滑window移动时能缩放的最小倍数，0-1.0，默认1.0，数字类型，只支持iOS */
			rightScale?: number;
		}
		interface FixedPaneStyle extends SlidPaneStyle {
			/**（可选项）左侧滑时，固定window上面的遮罩层背景，支持颜色和图片，默认rgba(0,0,0,0)，字符串类型，只支持iOS */
			leftMaskBg?: Color;

			/**（可选项）右侧滑时，固定window上面的遮罩层背景，支持颜色和图片，默认rgba(0,0,0,0)，字符串类型，只支持iOS */
			rightMaskBg?: Color;

			/**（可选项）左侧滑时，固定window后面的背景，缩放过程中后面的背景将会显示出来，支持颜色和图片，默认rgba(0,0,0,0)，字符串类型，只支持iOS */
			leftBg?: Color;

			/**（可选项）右侧滑时，固定window后面的背景，缩放过程中后面的背景将会显示出来，支持颜色和图片，默认rgba(0,0,0,0)，字符串类型，只支持iOS */
			rightBg?: Color;
		}

		/**向左或右进行侧滑 */
		interface OpenSlidPane {
			/** 
			 * 默认值：无
			 * 描述：侧滑类型，left 或 right
			*/
			type: 'left' | 'right';
		}

		/**打开一个抽屉式侧滑 window，可以从当前 window 的左右边缘滑动拉出侧滑 window 24*/
		interface OpenDrawerLayout extends WinBase, WinFrameDrawerCommon, WinActionBase {
			/** 
			 * 默认值：0
			 * 描述：（可选项）window 显示延迟时间，适用于将被打开的 window 中可能需要打开有耗时操作的模块时，可延迟 window 展示到屏幕的时间，保持UI的整体性
			*/
			delay?: number;

			/** 
             * 默认值：never
             * 描述：（可选项）设置页面滚动到头部或尾部时，显示回弹阴影效果的模式，仅Android有效。
            */
			overScrollMode?: 'never' | 'always' | 'scrolls';

			/** 
			 * 默认值：无
			 * 描述：左边侧滑 window
			*/
			leftPane?: SlidePaneParams;

			/** 
			 * 默认值：无
			 * 描述：右边侧滑 window
			*/
			rightPane?: SlidePaneParams;
		}
		interface SlidePaneParams extends WinBase, Constant.SoftInputMode {
			/**左右侧滑打开后，漏出的半透明区域宽度，默认值为60。此时左右侧滑window的宽度为屏幕宽度减去edge */
			edge?: number;
		}

		interface LoadBase {
			/** 
			 * 默认值：无描述：（可选项）window 名称，若要跨 window ，该字段必须指定，首页的名称为 root
			*/
			name?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）frame名称
			*/
			frameName?: string;
		}

		/**在指定 window 或者 frame 中加载HTML数据，对于 frameGroup 里面的 frame 也有效 */
		interface LoadData extends LoadBase {
			/** 
			 * 默认值：无
			 * 描述：（可选项）做为baseUrl，data中的html引用的资源文件根路径以该url为基础，可以为本地文件路径，支持相对路径和绝对路径，以及 widget://、fs://等协议路径。
			*/
			url?: string;

			/** 
			 * 默认值：无
			 * 描述：页面加载的数据内容，可以为html片段或者整张html文件的数据
			*/
			data: string;
		}

		/**在指定 window 或者 frame 中执行脚本，对于 frameGroup 里面的 frame 也有效，若 name 和 frameName 都未指定，则在当前 window 中执行脚本，具体执行逻辑见补充说明 */
		interface ExecScript extends LoadBase {
			/** 
			 * 默认值：无
			 * 描述：js代码
			*/
			script: string;
		}

		/**对当前页面或应用设置模糊效果 */
		interface SetBlurEffect {
			/** 
			 * 默认值：无
			 * 描述：模糊效果风格样式，传none时表示移除模糊效果
			 * ( none			=>	移除模糊效果，
			 *   extra_light	=>	模糊区域比底层视图的颜色更淡，
			 *   light			=>	模糊区域与底层视图的色调近似，
			 *   dark			=>	模糊区域比底层视图的颜色更深，
			 *   regular		=>	适应界面风格的常规模糊样式，只支持iOS 10及以上系统，
			 *   prominent		=>	适应界面风格，使内容更加突出，只支持iOS 10及以上系统）
			*/
			style: 'none' | 'extra_light' | 'light' | 'dark' | 'regular' | 'prominent';

			/** 
			 * 默认值：false
			 * 描述：（可选项）false时表示对当前页面添加模糊效果，true时表示对整个应用窗口添加模糊效果
			*/
			global?: boolean;

			/** 
			 * 默认值：1
			 * 描述：（可选项）模糊区域透明度，介于0和1之间
			*/
			alpha?: number;

			/** 
			 * 默认值：0
			 * 描述：（可选项）模糊区域圆角半径
			*/
			borderRadius?: number;

			/** 
			 * 默认值：无
			 * 描述：（可选项）动画参数，设置模糊渐变效果，只支持iOS 9及以上系统
			*/
			animation?: DimAnimation;

			/** 
			 * 默认值：页面区域描述：（可选项）模糊区域
			*/
			rect?: RectBase;
		}
		interface DimAnimation extends Constant.AnimationFrameType {
			/** 
			 * 动画延迟执行时间，单位毫秒，默认值0，数字类型
			*/
			delay?: number;

			/** 
			 * 动画执行时间，单位毫秒，默认值0，数字类型
			*/
			duration?: number;
		}

		/**当前window或者frame的a标签历史记录后退 或 前进一页 */
		interface History {
			/** 
			 * 默认值：无
			 * 描述：（可选项）frame 名称，若不传则表示对当前页面进行操作
			*/
			frameName?: string;
		}

		/**页面向上滚动一页 */
		interface PageUp {
			/** 
			 * 默认值：false
			 * 描述：（可选项）是否直接滚动到最顶部
			*/
			top?: boolean;
		}

		/**页面向下滚动一页 */
		interface PageDown {
			/** 
			 * 默认值：false
			 * 描述：（可选项）是否直接滚动到最底部
			*/
			bottom?: boolean;
		}

		/**移除启动图。若 config.xml 里面配置 autoLaunch 为 false，则启动图不会自动消失，直到调用此方法移除。 */
		interface RemoveLaunchView {
			/** 
			 * 默认值：无
			 * 描述：（可选项）动画参数，不传时不使用动画
			*/
			animation?: Constant.AnimationTypeBase;
		}

		interface InstallApp {
			/** 
			 * 默认值：无
			 * 描述：目标应用的资源文件标识。Android上为apk包的本地路径，如file://xxx.apk；iOS上为应用安装包对应的plist文件地址
			*/
			appUri: string;
		}

		interface UninstallApp {
			/** 
			 * 默认值：无
			 * 描述：要卸载的应用的包名
			*/
			packageName: string;
		}

		/**打开手机上其它应用，可以传递参数 */
		interface OpenApp {
			/** 
			 * 默认值：无
			 * 描述：（可选项）传给目标应用的参数。iOS 平台会将 appParam 里面的值拼接到 iosUrl 后面，比如 iosUrl 为 http://www.baidu.com ，
			 * appParam为{"keyword":"APICloud"}，则最后传递给第三方应用的url为http://www.baidu.com?keyword=APICloud
			*/
			appParam?: Dictionary<any>;

			/** 
			 * 默认值：无
			 * 描述：（可选项）目标应用的url（iOS平台使用），iOS下必传
			*/
			iosUrl?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）目标应用的包名或 action（Android平台使用），Android下必传
			*/
			androidPkg?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）指定目标应用的响应数据类型，如："text/html"（Android平台使用）
			*/
			mimeType?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）指定目标应用响应的uri（Android平台使用）
			*/
			uri?: string;
		}

		/**判断设备上面是否已安装指定应用 */
		interface AppInstalled {
			/** 
			 * 默认值：false
			 * 描述：执行结果的返回方式。为false时通过callback返回，为true时直接返回。
			*/
			sync?: boolean;

			/** 
			 * 默认值：无
			 * 描述：Android 平台为应用包名，iOS 平台为应用定义的 URL Scheme。iOS 中的 URL Scheme 与包名不一样，一个应用只有一个包名，但是可以配置多个 URL Scheme
			*/
			appBundle: string;
		}

		/**打开 Widget，若此 widget 已经被打开，则会把其调整到最前面显示 */
		interface OpenWidget {
			/** 
			 * 默认值：无
			 * 描述：（可选项）widget的id
			*/
			id?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）widget的根目录，该目录下面放置有config.xml等文件。通过传入此字段，可以打开放置在任意位置的widget。注意若传了id字段，此字段将被忽略
			*/
			path?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）widget 参数，在新打开的 widget 里面的页面中通过 api.wgtParam 获取
			*/
			wgtParam?: Dictionary<any>;

			/** 
			 * 默认值：true
			 * 描述：（可选项）在新打开的 widget 里面的页面中是否支持长按退出，只支持iOS。
			*/
			longPressToExit?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）动画参数，不传时使用默认动画
			*/
			animation?: Constant.AnimationTypeBase;
		}

		/**关闭指定widget，也可以关闭应用 */
		interface CloseWidget {
			/** 
			 * 默认值：无
			 * 描述：（可选项）widget的id
			*/
			id?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）返回给上个 widget 的返回值
			*/
			retData?: Dictionary<any>;

			/** 
			 * 默认值：false
			 * 描述：（可选项）是否静默退出应用，只在主 widget 中有效。当为 false 时，引擎会弹出对话框询问是否退出应用
			*/
			silent?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）动画参数，不传时使用默认动画
			*/
			animation?: Constant.AnimationTypeBase;
		}

		interface Ajax extends Constant.AjaxReturnType {
			/** 
			 * 默认值：无
			 * 描述：请求地址
			*/
			url: string;

			/** 
			 * 默认值：true
			 * 描述：（可选项）是否对url进行编码。默认或传true时，Android将始终对url编码，而iOS只有在url不合法（如存在中文字符）的时候才进行编码。
			 * 如果url中有特殊字符需要编码的，建议先在js层进行编码，然后此参数传false。
			*/
			encode?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）该字段用于传给cancelAjax方法来取消请求，如果传入该字段，请保证各个ajax的tag字段唯一
			*/
			tag?: string;

			/** 
			 * 默认值：get
			 * 描述：（可选项）异步请求方法类型
			*/
			method?: 'get' | 'post' | 'put' | 'delete' | 'head' | 'options' | 'trace' | 'patch';

			/** 
			 * 默认值：true
			 * 描述：（可选项）是否缓存，若缓存，下次没网络时请求则会使用缓存，仅在get请求有效
			*/
			cache?: boolean;

			/** 
			 * 默认值：30
			 * 描述：（可选项）超时时间，单位秒
			*/
			timeout?: number;

			/** 
			 * 默认值：utf-8
			 * 描述：（可选项）当响应头里面没有返回字符集编码时，使用此编码来解析数据
			*/
			charset?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）设置请求头数据。建议里面的key使用首字母大写的形式，如 User-Agent
			*/
			headers?: Dictionary<string>;

			/** 
			 * 默认值：false
			 * 描述：（可选项）是否实时返回上传文件进度
			*/
			report?: boolean;

			/** 
			 * 默认值：false
			 * 描述：（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，
			 * 消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
			*/
			returnAll?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）POST 数据，method 为 get 时不传。以下字段除了 values 和 files 可以同时使用，其它参数都不能同时使用。
			*/
			data?: PostData;

			/** 
			 * 默认值：无
			 * 描述：（可选项）用于https请求开启双向认证的情况下，客户端配置p12安全证书设置。
			*/
			certificate?: {
				/** 
				 * p12证书路径，支持fs://、widget://、cache://等文件路径协议，字符串类型
				*/
				path: string;

				/** 
				 * 证书密码，字符串类型
				*/
				password: string;
			};
		}
		interface PostData {
			/** 
			 * 以二进制流的方式提交文件。stream为文件路径（字符串类型），支持绝对路径，以及fs://、cache://、box://等文件路径协议。
			 * 可直接使用其他端API返回的结果，如api.getPicture回调的ret.data等
			*/
			stream?: string;

			/** 
			 * 以纯文本的方式提交数据，body支持字符串及JSON对象。提交JSON对象时，需设置application/json类型的Content-Type头
			*/
			body?: string | Dictionary<any>;

			/** 
			 * 以表单方式提交参数（JSON对象）, 如 {"field1": "value1", "field1": "value2"} (直接传JSON对像.)
			*/
			values?: Dictionary<any>;

			/** 
			 * 以表单方式提交文件，支持多文件上传（JSON对象）,如 {"file": "path"}，也支持同一字段对应多文件：{"file":["path1","path2"]}。
			 * 文件路径，支持绝对路径，以及fs://、cache://、box://等文件路径协议。可直接使用其他端API返回的结果，如api.getPicture回调的ret.data等.
			*/
			files?: Dictionary<any>;
		}

		interface CancelAjax {
			/** 
			 * 默认值：无
			 * 描述：请求标识
			*/
			tag: string;
		}

		interface Download {
			/** 
			 * 默认值：无
			 * 描述：下载地址
			*/
			url: string;

			/** 
			 * 默认值：true
			 * 描述：（可选项）是否对url进行编码。默认或传true时，Android将始终对url编码，而iOS只有在url不合法（如存在中文字符）的时候才进行编码。
			 * 如果url中有特殊字符需要编码的，建议先在js层进行编码，然后此参数传false。
			*/
			encode?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）存储路径，不传时使用自动创建的路径
			*/
			savePath?: string;

			/** 
			 * 默认值：false
			 * 描述：（可选项）下载过程是否上报
			*/
			report?: boolean;

			/** 
			 * 默认值：true
			 * 描述：（可选项）是否使用本地缓存
			*/
			cache?: boolean;

			/** 
			 * 默认值：false
			 * 描述：（可选项）是否允许断点续传
			*/
			allowResume?: boolean;
		}

		interface CancelDownload {
			/** 
			 * 默认值：无
			 * 描述：下载地址
			*/
			url: string;
		}

		/**图片缓存 */
		interface ImageCache extends Constant.CacheStrategy {
			/** 
			 * 默认值：无
			 * 描述：下载地址
			*/
			url: string;

			/** 
			 * 默认值：true
			 * 描述：（可选项）是否对url进行编码。默认或传true时，Android将始终对url编码，而iOS只有在url不合法（如存在中文字符）的时候才进行编码。
			 * 如果url中有特殊字符需要编码的，建议先在js层进行编码，然后此参数传false
			*/
			encode?: boolean;

			/** 
			 * 默认值：true
			 * 描述：（可选项）使用缩略图，底层将根据当前系统及设备性能，返回最优的缩略图，有利于提高应用运行及渲染效率
			*/
			thumbnail?: boolean;
		}

		/**读取文本文件内容，只支持utf-8编码文本类型文件 */
		interface ReadFile {
			/** 
			 * 默认值：false
			 * 描述：执行结果的返回方式。为false时通过callback返回，为true时直接返回。
			*/
			sync?: boolean;

			/** 
			 * 默认值：无
			 * 描述：文件路径，支持绝对路径和文件路径协议如fs://、widget://等
			*/
			path: string;
		}

		/**写入内容到文本文件 */
		interface WriteFile {
			/** 
			 * 默认值：无
			 * 描述：文件路径，支持绝对路径和文件路径协议如fs://、cache://等，不支持widget://目录，该目录只读
			*/
			path: string;

			/** 
			 * 默认值：无
			 * 描述：文件内容
			*/
			data: string;

			/** 
			 * 默认值：false
			 * 描述：是否以追加方式写入数据，默认会清除之前文件内容
			*/
			append?: boolean;
		}

		interface PrefsBase {
			/** 
			 * 默认值：无
			 * 描述：键
			*/
			key: string;
		}
		/**设置偏好数据 */
		interface SetPrefs extends PrefsBase {
			/** 
			 * 默认值：无
			 * 描述：值
			*/
			value: Dictionary<any> | string | number;
		}

		/**获取偏好设置值 */
		interface GetPrefs extends PrefsBase {
			/** 
			 * 默认值：false
			 * 描述：执行结果的返回方式。为false时通过callback返回，为true时直接返回。
			*/
			sync?: boolean;
		}

		/**清除缓存 */
		interface ClearCache {
			/** 
			 * 默认值：0
			 * 描述：（可选项）清除多少天前的缓存
			*/
			timeThreshold?: number;
		}

		/**获取缓存 | 总存储大小 */
		interface GetCacheSize {
			/** 
			 * 默认值：false
			 * 描述：执行结果的返回方式。为false时通过callback返回，为true时直接返回。
			*/
			sync: boolean;
		}

		interface EventBase {
			/** 
			 * 默认值：无
			 * 描述：自定义事件或系统事件名称（详见事件）
			*/
			name: string;
		}

		interface AddEventListener extends EventBase {
			/** 
			 * 默认值：无
			 * 描述：（可选项）附加字段。一些特定事件可能需要提供额外的参数
			*/
			extra?: {
				/** 
				 * 当事件为scrolltobottom时，设置距离底部多少距离时触发事件，默认值为0，数字类型
				*/
				threshold: number;

				/** 
				 * 当事件为appidle时，设置经过多长时间不操作屏幕时触发，单位秒，数字类型
				*/
				timeout: number;
			};
		}

		interface SendEvent extends EventBase {
			/** 
			 * 默认值：无
			 * 描述：（可选项）附加字段。一些特定事件可能需要提供额外的参数
			*/
			extra?: string | Dictionary<any>;
		}

		interface AccessNative extends EventBase {
			/** 
			 * 默认值：无
			 * 描述：（可选项）附带的参数。
			*/
			extra?: Dictionary<any>;
		}

		/**向用户发出震动、声音提示、灯光闪烁、手机状态栏通知等提示行为 */
		interface Notification {
			/** 
			 * 默认值：[100, 500, 100, 500]
			 * 描述：（可选项）伴随节奏的震动，时间数组，单位：毫秒。iOS平台震动时间为固定值；Android平台节奏为【等待-震动-等待-震动..】，
			 * 例如[100, 500, 100, 500]表现效果为：等待100毫秒-震动500毫秒-等待100毫秒-震动500毫秒
			*/
			vibrate?: Array<number>;

			/** 
			 * 默认值：default
			 * 描述：（可选项）提示音，默认为系统设置的提示音。Android支持传入widget协议音频文件，例如：widget://res/horse.mp3；当实现闹钟功能时，iOS只支持widget://路径协议
			*/
			sound?: string;

			/** 
			 * 默认值：false
			 * 默认值：false描述：（可选项）设备提示灯是否闪烁 
			*/
			light?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）弹出通知到状态栏。弹出时是否震动或响铃，可通过设置vibrate，sound等字段配合实现。
			*/
			notify?: NotifySetting;

			/** 
			 * 默认值：无
			 * 描述：（可选项）设置闹铃。与notify配合使用，即如果设置了闹铃，那么对应的notify将在设定的闹铃时间触发
			*/
			alarm?: AlarmSetting;
		}
		interface NotifySetting {
			/**标题，Android中默认值为应用名称，支持Android和iOS 8.2以上系统 */
			title?: string;

			/**内容，默认值为'有新消息' */
			content?: string;

			/**附加信息，页面可以监听noticeclicked事件得到点击的通知的附加信息 */
			extra?: string | Dictionary<any>;

			/**是否覆盖更新已有的通知，取值范围true|false。只Android有效 */
			updateCurrent?: boolean;
		}
		interface AlarmSetting {
			/** 
			 * 小时，数字类型，取值范围（0-23），默认值为当前系统时
			*/
			hour?: number;

			/** 
			 * 分钟，数字类型，取值范围（0-59），默认值为当前系统分
			*/
			minutes?: number;

			/** 
			 * 通知循环时间，以周为单位，数组类型，取值范围[1,2,3,4,5,6,7]，表示周日、周一、周二、周三、周四、周五、周六。若不传则不循环，只在当天或隔天的指定时间通知一次
			*/
			daysOfWeek?: Array<1 | 2 | 3 | 4 | 5 | 6 | 7>;

			/** 
			 * 闹铃目标时间，数字类型，1970年至今的毫秒数，只在设定的时间执行一次，若设置了time，那么hour、minutes、daysOfWeek将被忽略
			*/
			time?: number;

			/** 
			 * 当闹铃触发时是否打开当前应用，如果打开，则不弹出状态栏通知，bool类型，默认值为false。仅支持Android平台。
			*/
			openApp?: boolean;
		}

		interface CancelNotification {
			/** 
			 * 默认值：0。如果传入-1，则取消本应用弹到状态栏的所有通知，iOS只支持清除所有弹到状态栏的通知；传入-1并不清除闹铃。
			 * 描述：（可选项）调用 notification 方法时返回的 id
			*/
			id: number;
		}

		/**调用系统自带定位功能，开始定位 */
		interface StartLocation extends Constant.PositonType {
			/** 
			 * 默认值：1.0
			 * 描述：（可选项）位置更新所需最小距离（单位米）
			*/
			filter?: number;

			/** 
			 * 默认值：true
			 * 描述：（可选项）获取到位置信息后是否自动停止定位
			*/
			autoStop?: boolean;
		}

		/**开启传感器 */

		interface Call extends Constant.CallType {
			/** 
			 * 默认值：无
			 * 描述：电话号码
			*/
			number: string;
		}

		/**调用系统短信界面发送短信，或者后台直接发送短信 */
		interface Sms {
			/** 
			 * 默认值：无
			 * 描述：电话号码
			 * 备注：当调用系统短信界面进行短信发送时，Android仅支持传入一个号码，且发送是否成功的状态值依赖于系统短信界面的返回值
			*/
			numbers: Array<string>;

			/** 
			 * 默认值：无
			 * 描述：文本内容
			*/
			text: string;

			/** 
			 * 默认值：false
			 * 描述：（可选项）是否后台发送，只支持Android
			 * 备注：后台发送时，numbers 支持多个，可同时将一条信息发送给多个号码
			*/
			silent?: boolean;
		}

		interface Mail {
			/** 
			 * 默认值：无
			 * 描述：收件人
			*/
			recipients: Array<string>;

			/** 
			 * 默认值：无
			 * 描述：邮件主题
			*/
			subject: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）邮件内容
			*/
			body?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）附件地址。支持fs://协议，以及其他模块或者api返回的路径，附件必须是位于设备公共存储空间，系统邮件APP能访问到的存储。
			*/
			attachments?: Array<string>;
		}

		/**设置是否全屏 */
		interface SetFullScreen {
			/** 
			 * 默认值：无
			 * 描述：是否全屏
			*/
			fullScreen: boolean;

			/** 
			 * 默认值：fade
			 * 描述：（可选项）状态栏显示隐藏的动画效果，只iOS有效
			*/
			animation?: 'none' | 'fade' | 'slide';
		}

		/**设置状态栏样式 */
		interface SetStatusBarStyle extends Constant.StatusBarStyle {
			/** 
			 * 默认值：#000
			 * 描述：（可选项）状态栏背景颜色，只 Android 5.0 及以上有效
			*/
			color?: Color;

			/** 
			 * 默认值：true
			 * 描述：（可选项）是否有动画效果，只iOS有效
			*/
			animated?: boolean;
		}

		/**设置是否禁止屏幕休眠 */
		interface SetKeepScreenOn {
			/** 
			 * 默认值：无
			 * 描述：是否禁止屏幕休眠
			*/
			keepOn: boolean;
		}

		/**设置是否禁止截屏，只支持Android */
		interface SetScreenSecure {
			/** 
			 * 默认值：无
			 * 描述：是否禁止截屏
			*/
			secure: boolean;
		}

		/**设置应用图标右上角数字，支持所有 iOS 手机，以及部分 Android 手机，如小米和三星的某些型号，不支持的设备，表现结果为调用该接口无任何效果 */
		interface SetAppIconBadge {
			/** 
			 * 默认值：无
			 * 描述：显示在应用图标右上角的数字。为0时表示清除应用图标上显示的数字
			*/
			badge: number;
		}

		/**应用权限。 */
		interface PermissionBase {
			/** 
			 * 默认值：无
			 * 描述：权限列表。
			*/
			list: Array<
				/**相机 */
				'camera'
				/**通讯录 */
				| 'contacts'
				/**麦克风 */
				| 'microphone'
				/**相册 */
				| 'photos'
				/**定位 */
				| 'location'
				/**后台定位，只支持iOS */
				| 'locationAlways'
				/**通知，只支持iOS */
				| 'notification'
				/**日历，只支持Android */
				| 'calendar'
				/**电话，只支持Android */
				| 'phone'
				/**传感器，只支持Android */
				| 'sensor'
				/**短信，只支持Android */
				| 'sms'
				/**存储空间，读取相册，多媒体，本地存储相关，只支持Android */
				| 'storage'
			>;
		}

		/**向系统请求某个或多个权限。 */
		interface RequestPermission extends PermissionBase {
			/** 
			 * 默认值：无
			 * 描述：请求跟踪码，用于回调结果，只支持Android。
			*/
			code?: number;
		}

		/**弹出带一个按钮的对话框，更多按钮的对话框请使用confirm方法 */
		interface DialogBase {
			/** 
			 * 默认值：无
			 * 描述：（可选项）标题
			*/
			title?: string;

			/** 
			 * 默认值：["确定"]
			 * 描述：（可选项）按钮
			*/
			buttons?: Array<string>;
		}

		interface Confirm extends DialogBase {
			/** 
			 * 默认值：无
			 * 描述：（可选项）内容
			*/
			msg?: string;
		}

		interface Prompt extends DialogBase {
			/** 
			 * 默认值：无
			 * 描述：（可选项）输入框里面的默认内容
			*/
			text?: string;

			/** 
			 * 默认值：text
			 * 描述：（可选项）输入类型，不同输入类型弹出键盘类型不同，取值范围（text、password、number、email、url）
			*/
			type?: 'text' | 'password' | 'number' | 'email' | 'url';
		}

		/**底部弹出框 */
		interface ActionSheet extends DialogBase {
			/** 
			 * 默认值：取消
			 * 描述：（可选项）取消按钮标题
			*/
			cancelTitle?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）红色警示按钮标题，一般用于做一些删除之类操作
			*/
			destructiveTitle?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）样式设置，不传时使用默认样式
			*/
			style?: Style;
		}
		interface Style {
			/** 
			 * 遮蔽层颜色，仅支持 rgba颜色，默认值：rgba（0, 0, 0, 0.4）
			*/
			layerColor: Color;

			/** 
			 * 选项按钮正常状态背景颜色，支持#000、#000000、rgb、rgba，默认值：#F1F1F1
			*/
			itemNormalColor: Color;

			/** 
			 * 选项按钮按下时背景颜色，支持#000、#000000、rgb、rgba，默认值：#E6E6E6
			*/
			itemPressColor: Color;

			/** 
			 * 选项按钮正常状态文字颜色，支持#000、#000000、rgb、rgba，默认值：#007AFF
			*/
			fontNormalColor: Color;

			/** 
			 * 选项按钮按下时文字颜色，支持#000、#000000、rgb、rgba，默认值：#0060F0
			*/
			fontPressColor: Color;

			/** 
			 * 标题文字颜色，支持#000、#000000、rgb、rgba，默认值：#8F8F8F
			*/
			titleFontColor: Color;
		}

		interface ShowProgress extends Constant.ProgressTitleType {
			/** 
			 * 默认值：default
			 * 描述：（可选项）进度提示框风格
			*/
			style?: 'default';

			/** 
			 * 默认值：加载中
			 * 描述：（可选项）标题
			*/
			title?: string;

			/** 
			 * 默认值：请稍候...
			 * 描述：（可选项）内容
			*/
			text?: string;

			/** 
			 * 默认值：true
			 * 描述：（可选项）是否模态，模态时整个页面将不可交互
			*/
			modal?: boolean;
		}

		/**弹出一个定时自动关闭的提示框 */
		interface Toast extends Constant.ToastPos {
			/** 
			 * 默认值：无
			 * 描述：提示消息
			*/
			msg: string;

			/** 
			 * 默认值：2000
			 * 描述：（可选项）持续时长，单位：毫秒
			*/
			duration?: number;

			/** 
			 * 默认值：false
			 * 描述：（可选项）是否是全局的toast。若为false，toast将只在当前window范围可见；若为true，安卓手机上面弹出的位置将会固定在底部区域。
			*/
			global?: boolean;
		}

		/**打开时间选择器 */
		interface OpenPicker extends Constant.PickupType {
			/** 
			 * 默认值：当前时间
			 * 描述：（可选项）时间格式化字符串，格式yyyy-MM-dd HH:mm
			*/
			date?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）能够选择的最小时间，格式yyyy-MM-dd HH:mm，只iOS有效
			*/
			minDate?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）能够选择的最大时间，格式yyyy-MM-dd HH:mm，只iOS有效
			*/
			maxDate?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）显示在拾取器上面的标题
			*/
			title?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）iPad中显示时，箭头指向的位置，只iPad有效
			*/
			arrowRect?: RectBase;

			/** 
			 * 默认值：any
			 * 描述：（可选项）iPad中显示时，箭头指向的方向，只iPad有效
			*/
			arrowDirection?: 'left' | 'right' | 'up' | 'down' | 'any';
		}

		/** 下拉刷新组件*/
		interface SetRefreshHeaderInfo {
			/** 
			 * 默认值：true
			 * 描述：（可选项）是否可见
			*/
			visible?: boolean;

			/** 
			 * 默认值：旋转箭头图片
			 * 描述：（可选项）上拉下拉时的图片地址
			*/
			loadingImg?: string;

			/** 
			 * 默认值：rgba(187, 236, 153, 1.0)
			 * 描述：（可选项）背景颜色
			*/
			bgColor?: Color;

			/** 
			 * 默认值：rgba(109, 128, 153, 1.0)
			 * 描述：（可选项）文本颜色
			*/
			textColor?: Color;

			/** 
			 * 默认值：下拉可以刷新...
			 * 描述：（可选项）下拉文字描述
			*/
			textDown?: string;

			/** 
			 * 默认值：松开可以刷新...
			 * 描述：（可选项）松开时文字描述
			*/
			textUp?: string;

			/** 
			 * 默认值：加载中...
			 * 描述：（可选项）加载状态文字描述
			*/
			textLoading?: string;

			/** 
			 * 默认值：最后更新加日期时间
			 * 描述：（可选项）更新时间文字描述
			*/
			textTime?: string;

			/** 
			 * 默认值：true
			 * 描述：（可选项）是否显示更新时间
			*/
			showTime?: boolean;
		}

		/**展示一个悬浮框，浮动在屏幕上。 */
		interface ShowFloatBox {
			/** 
			 * 默认值：false
			 * 描述：（可选项）是否阻止默认行为，若传true，可以在回调方法里面处理悬浮框点击操作。默认的行为：1、在主widget调用该方法无效 2、点击后会弹出退出应用提示
			*/
			preventDefault?: boolean;

			/** 
			 * 默认值：应用图标
			 * 描述：（可选项）展示在悬浮框中的图片地址
			*/
			iconPath?: string;

			/** 
			 * 默认值：5000毫秒
			 * 描述：（可选项）自动消隐时长。在该时长内不发生触摸悬浮框行为，悬浮框自动消隐至半透状态
			*/
			duration?: number;
		}

		/**通过调用系统默认相机或者图库应用，获取图片以及视频媒体文件。 */
		interface GetPicture
			extends Constant.SourceType,
			Constant.EncodingType,
			Constant.MediaType,
			Constant.DestinationType {
			/** 
			 * 默认值：rear
			 * 描述：（可选项）选择前置或后置摄像头，取值范围（front、rear），只支持iOS
			*/
			direction?: 'front' | 'rear';

			/** 
			 * 默认值：false
			 * 描述：（可选项）是否可以选择图片后进行编辑，支持iOS及部分安卓手机
			*/
			allowEdit?: boolean;

			/** 
			 * 默认值：false
			 * 描述：（可选项）是否选择图片后进行预览，只支持iOS。
			*/
			preview?: boolean;

			/** 
			 * 默认值：50
			 * 描述：（可选项）图片质量，只针对jpg格式图片（0-100整数）
			*/
			quality?: number;

			/** 
			 * 默认值：medium
			 * 描述：（可选项）视频质量，调用相机录制视频时该参数生效。取值范围(low、medium、high)，质量越高，录制的视频文件占用存储空间越大。
			*/
			videoQuality?: 'low' | 'medium' | 'high';

			/** 
			 * 默认值：原图宽度
			 * 描述：（可选项）压缩后的图片宽度，图片会按比例适配此宽度
			*/
			targetWidth?: number;

			/** 
			 * 默认值：原图高度
			 * 描述：（可选项）压缩后的图片高度，图片会按比例适配此高度
			*/
			targetHeight?: number;

			/** 
			 * 默认值：false
			 * 描述：（可选项）拍照或录制视频后是否保存到系统相册目录。注意此处仅是文件系统层面的操作，使用诸如“图库”App仍然有可能查看到
			*/
			saveToPhotoAlbum?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）保存图片到自定义分组相册目录，相册不存在则会进行创建。
			*/
			groupName?: string;
		}

		/**保存图片和视频到系统相册 */
		interface SaveMediaToAlbum {
			/** 
			 * 默认值：无
			 * 描述：本地文件路径，支持fs://、widget://等文件路径协议，必须带有扩展名
			*/
			path: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）保存图片到自定义分组相册目录，相册不存在则会进行创建。
			*/
			groupName?: string;
		}

		/**录制amr格式音频 */
		interface StartRecord {
			/** 
			 * 默认值：无
			 * 描述：本地文件路径，支持fs://、widget://等文件路径协议，必须带有扩展名
			*/
			path?: string;
		}

		/**播放本地音频，支持amr格式 */
		interface StartPlay {
			/** 
			 * 默认值：无
			 * 描述：文件路径，支持fs://、widget://等文件路径协议
			*/
			path: string;
		}

		/**打开系统视频播放器 */
		interface OpenVideo {
			/** 
			 * 默认值：无
			 * 描述：本地文件路径（支持fs://路径协议）或者网络资源地址
			*/
			url: string;
		}
	}
}
