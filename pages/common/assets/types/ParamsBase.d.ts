declare namespace api {
	namespace ConfigParams {
		interface CommonBase {
			/** 
			 * 默认值：无
			 * 描述：（可选项）页面是否弹动
			*/
			bounces?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）背景色，支持图片和颜色，格式为#fff、#ffffff、rgba(r,g,b,a)等，图片路径支持fs://、widget://等APICloud自定义文件路径协议，同时支持相对路径
			*/
			bgColor?: Color;

			/** 
			 * 默认值：无
			 * 描述：（可选项）当点击状态栏，页面是否滚动到顶部。若当前屏幕上不止一个页面的scrollToTop属性为true，则所有的都不会起作用。只iOS有效
			*/
			scrollToTop?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）页面内容超出后是否可以滚动，只支持iOS
			*/
			scrollEnabled?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）是否显示垂直滚动条
			*/
			vScrollBarEnabled?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）是否显示水平滚动条
			*/
			hScrollBarEnabled?: boolean;

			/** 
			 * 默认值：无
			 * 描述：（可选项）页面是否可以缩放
			*/
			scaleEnabled?: boolean;
		}

		interface WinBase extends CommonBase {
			/**
             * 默认值: 无
             * 描述：window名字
            */
			name: string;

			/** 
			 * 默认值：无
			 * 描述：页面地址，可以为本地文件路径，支持相对路径和绝对路径，以及 widget://、fs://等协议路径，也可以为远程地址。 当data参数不为空时，url将做为baseUrl，data中的html引用的资源文件根路径以该url为基础
			*/
			url: string;

			/**
             * 默认值：无
             * 描述：（可选项）页面参数，新页面中可以通过 api.pageParam 获取 
            */
			pageParam?: Dictionary<any>;

			/**
             * 默认值：false
             * 描述：（可选项）是否允许长按页面时弹出选择菜单 
            */
			allowEdit?: boolean;

			/** 
             * 默认值: true
             * 描述：（可选项）是否显示键盘上方的工具条。只支持iOS
            */
			softInputBarEnabled?: boolean;

			/** 
             * 默认值：无
             * 描述：（可选项）设置使用自定义下拉刷新模块的名称，设置后可以使用 api.setCustomRefreshHeaderInfo 方法来使用自定义下拉刷新组件
             * 窗口操作
            */
			customRefreshHeader?: string;
		}

		interface WinFrameCommon extends WinBase {
			/** 
			 * 默认值：无
			 * 描述：（可选项）页面加载的数据内容，可以为html片段或者整张html文件的数据
			*/
			data?: string;

			/** 
			 * 默认值：无
			 * 描述：（可选项）请求头
			*/
			headers?: Dictionary<string>;

			/**
             * 默认值：false
             * 描述：（可选项）是否使用WKWebView来加载页面。
             * WKWebView具有Safari相同的JavaScript引擎，支持更多的HTML5特性，相比于UIWebView，在性能和功能方面都有很大提升。
             * 只支持iOS8.0及以上系统。注意openWin时使用WKWebView可能会影响window的页面切换效果，建议在openFrame时使用。 
            */
			useWKWebView?: boolean;

			/**
             * 默认值：false
             * 描述：（可选项）是否可以通过手势来进行历史记录前进后退，只在useWKWebView参数为true时有效。
            */
			historyGestureEnabled?: boolean;

			/** 
             * 默认值：never
             * 描述：（可选项）设置页面滚动到头部或尾部时，显示回弹阴影效果的模式，仅Android有效。
			 * ( never 		=> 永远不显示，
			 *   always 	=> 永远显示，
			 * 	 scrolls	=> 只有当页面内容超出设备屏幕大小，发生滚动行为时显示，建议设置为该模式。)
            */
			overScrollMode?: 'never' | 'always' | 'scrolls';
		}

		interface WinFrameDrawerCommon {
			/**
             * 默认值：无
             * 描述：（可选项）动画参数，不传时使用默认动画 
             */
			animation?: Constant.AnimationTypeBase;

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

			/**
             * 默认值：false
             * 描述：（可选项）页面已经打开时，是否重新加载页面，重新加载页面后 apiready 方法将会被执行 
            */
			reload?: boolean;
		}

		interface WinFrameBase extends WinFrameCommon, WinFrameDrawerCommon {
			/** 
             * 默认值：['tap']
             * 描述：（可选项）收起键盘的方式，只iOS有效。
             * ( tap          =>  点击页面收起键盘，可以和drag或interactive同时使用，
             *   drag         =>  拖拽页面时收起键盘，可以和tap同时使用，
             *   interactive  =>  在键盘和页面交界处上下滑动收起键盘，可以和tap同时使用)
            */
			softInputDismissMode?: Array<'tap' | 'drag' | 'interactive'>;

			/** 
             * 默认值：false
             * 描述：（可选项）是否允许iOS 11及以上系统中页面元素默认的拖拽行为。只支持iOS
            */
			dragAndDrop?: boolean;
		}

		interface WinActionBase extends Constant.SoftInputMode {
			/**默认值：true
             * 描述：（可选项）是否支持滑动返回。iOS7.0及以上系统中，在新打开的页面中向右滑动，可以返回到上一个页面，该字段只 iOS 有效 */
			slidBackEnabled?: boolean;

			/**默认值：full
             * 描述：（可选项）当支持滑动返回时，设置手指在页面右滑的有效作用区域。
			 * 取值范围（full:整个页面范围都可以右滑返回，edge:在页面左边缘右滑才可以返回），该字段只iOS有效 */
			slidBackType?: 'full' | 'edge';
		}
	}
}
