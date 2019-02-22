declare namespace api {
	/**常量 */
	namespace Constant {
		/** 
		 * 用于 toast() 方法中 location 字段
		 * iOS系统，Android系统
		*/
		interface ToastPos {
			location?: 'top' | 'middle' | 'bottom';
		}

		/** 
		 * 传感器类型，字符串类型
		 * 用于 startSensor() 方法中 type 字段
		 * iOS系统，Android系统
		 * ( accelerometer	=>	加速计，
			gyroscope     	=>	陀螺仪，
			magnetic_field	=>	地磁传感器，
			proximity     	=>	近接传感器，
		 *  )
		*/
		interface SensorType {
			type: 'accelerometer' | 'gyroscope' | 'magnetic_field' | 'proximity';
		}

		/** 
		 * 错误码，数字类型                  
		 * iOS系统，Android系统
		 * ( 0 =>  错误，
		 *  1 =>  没有指定模块，
		 *  2 =>  没有指定方法，
		 *  3 =>  参数不匹配，
		 *  4 =>  没有权限， )
		*/
		interface ErrorType {
			type: 0 | 1 | 2 | 3 | 4;
		}

		/** 
		 * 电话类型，字符串类型
		 * 用于 call() 方法中 type 字段
		 * iOS系统，Android系统
		 * ( tel => 直接拨打电话。注：由于系统限制，iOS 10.2以上系统仍会弹出提示框，
		 *  tel_prompt => 拨打电话之前会弹出提示框，
		 *  facetime => facetime通话，Android不支持，)
		*/
		interface CallType {
			type: 'tel' | 'tel_prompt' | 'facetime';
		}

		/** 
		 * 定位精度，字符串类型   范围精度
		 * 根据需要来选择适当的精度来进行定位，用于 startLocation() 方法中 accuracy 字段
		 * iOS系统，Android系统
		*/
		interface PositonType {
			accuracy: '10m' | '100m' | '1km' | '3km';
		}

		/**动画属性 */
		interface AnimationTypeBase {
			/**动画类型 */
			type: typeof animationType.enumAniType;

			/**动画子类型 */
			subType?: typeof animationType.enumAniSubType;

			/**动画过渡时间，默认300毫秒 */
			duration?: number;
		}

		/**动画曲线类型 */
		interface AnimationFrameType {
			curve?: typeof animationType.enumCurveType;
		}

		namespace animationType {
			var enumAniType: /**无动画效果 */


				| 'none'
				/**新视图将旧视图推开 */
				| 'push'
				/**新视图移到旧视图上面 */
				| 'movein'
				/**交叉淡化过渡（不支持过渡方向） */
				| 'fade'
				/**翻转效果 */
				| 'flip'
				/**将旧视图移开|显示下面的新视图 */
				| 'reveal'
				/**滴水效果（不支持过渡方向） */
				| 'ripple'
				/**向上翻一页 */
				| 'curl'
				/**向下翻一页 */
				| 'un_curl'
				/**收缩效果（不支持过渡方向） */
				| 'suck'
				/**立方体翻滚效果 */
				| 'cube';

			var enumAniSubType: /**从右边开始动画 */


				| 'from_right'
				/**从左边开始动画 */
				| 'from_left'
				/**从顶部开始动画 */
				| 'from_top'
				/**从底部开始动画 */
				| 'from_bottom';

			var enumCurveType: /** 开始和结束时慢 */


				| 'ease_in_out'
				/** 开始时慢 */
				| 'ease_in'
				/** 结束时慢 */
				| 'ease_out'
				/** 整个动画过程速率一样 */
				| 'linear';
		}

		/**页面加载进度配置信息，若不传则无加载进度效果 */
		interface ProgressTypeBase {
			/**加载进度效果类型，默认值为 default，取值范围为 default|page，default 等同于 showProgress 参数效果；为 page 时，进度效果为仿浏览器类型，固定在页面的顶部 */
			type: 'default' | 'page';

			/**type 为 default 时显示的加载框标题 */
			title?: string;

			/**type 为 default 时显示的加载框内容 */
			text?: string;

			/**type 为 page 时进度条的颜色，默认值为 #45C01A，支持#FFF，#FFFFFF，rgb(255|255|255)，rgba(255|255|255|1.0)等格式 */
			color?: Color;
		}

		/**进度提示框动画类型 fade => 渐隐渐显      zoom => 缩放*/
		interface ProgressTitleType {
			animationType?: 'fade' | 'zoom';
		}

		/** 
		 * 拾取器类型，字符串类型
		 * 用于 openPicker() 方法中 type 字段
		 * iOS系统，Android系统
		 * ( date => 日期，    time => 时间，  date_time => 日期和时间 Android不支持 )
		*/
		interface PickupType {
			type: 'date' | 'time' | 'date_time';
		}

		/** 
		 * 媒体类型，字符串类型
		 * 用于 getPicture() 方法中 mediaValue 字段
		 * iOS系统，Android系统
		 * ( pic => 图片，     video => 视频，   all => 图片和视频,Android不支持 )
		*/
		interface MediaType {
			mediaValue: 'pic' | 'video' | 'all';
		}

		/**图片编码格式 用于 getPicture() 方法中 encodingType 字段*/
		interface EncodingType {
			encodingType: 'jpg' | 'png';
		}

		/**
		 * 图片数据格式 用于 getPicture() 方法中 destinationType 字段
		 * （base64 => 指定返回数据为base64编码后内容，	url => 指定返回数据为选取的图片地址）
		*/
		interface DestinationType {
			destinationType?: 'base64' | 'url';
		}

		/**
		 * 图片源类型 用于 getPicture() 方法中 sourceType 字段
		 * （library => 图片库，	camera => 相机，	album => 相册）
		*/
		interface SourceType {
			sourceType: 'library' | 'camera' | 'album';
		}

		/** 
		 * 网络类型，字符串类型
		 * 用于 connectionType 属性
		 * iOS系统，Android系统
		 * ( unknown =>	未知， WiFi、2G、3G、4G、	ethernet => 以太网，	none => 无网络)
		*/
		interface ConnectionType {
			type: 'unknown' | 'ethernet' | 'wifi' | '2g' | '3g' | '4g' | 'none';
		}

		/** 
		 * 文件操作错误码，数字类型
		 * 指定 readFile()、writeFile() 方法返回错误时的错误类型
		 * iOS系统，Android系统
		 * （0    =>  没有错误，
		 * 1    =>  找不到文件错误，
		 * 2    =>  不可读取错误，
		 * 3    =>  编码格式错误，
		 * 4    =>  无效操作错误，
		 * 5    =>  无效修改错误，
		 * 6    =>  磁盘溢出错误，
		 * 7    =>  文件已存在错误）
		*/
		interface FileActionErrType {
			type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
		}

		/** 
		 * 系统类型，字符串类型
		 * 用于 systemType 属性
		 * iOS系统，Android系统
		 * （ios	=>	ios系统
		 *  Android	=>	Android系统
		 *  win		=>	Windows系统
		 *  wp		=>	Windows Phone系统）
		*/
		interface SystemType {
			type: 'ios' | 'android' | 'win' | 'wp';
		}

		/** 
		 * 下载状态，数字类型  
		 * 用于 download() 方法返回值中的 state 字段
		 * iOS系统，Android系统
		 * （0 => 下载中，      1 => 下载完成，       2 => 下载失败）
		*/
		interface DownloadStatus {
			type: 0 | 1 | 2;
		}

		/**异步请求错误类型，数字类型  用于 ajax() 方法返回错误时的 code 字段 */
		interface AjaxErrorType {
			/** 
			 * 0	=>	连接错误
			 * 1	=>	超时
			 * 2	=>	授权错误
			 * 3	=>	数据类型错误
			*/
			type: 0 | 1 | 2 | 3;
		}

		/**
		 * 异步请求返回数据类型，字符串类型  用于 ajax() 方法中 dataType 字段
		 * （json => 返回数据为 JSON 对象，		text => 返回数据为字符串类型）
		*/
		interface AjaxReturnType {
			dataType?: 'json' | 'text';
		}

		/**异步请求方法类型，字符串类型 用于 ajax() 方法中 method 字段*/
		interface AjaxRequestType {
			requestType?: 'get' | 'post' | 'put' | 'delete' | 'head';
		}

		/** 
		 * 状态栏样式，字符串类型
		 * 用于 setStatusBarStyle() 方法中 style 字段
		 * iOS系统
		 * （dark => 状态栏字体为黑色，适用于浅色背景，  light => 状态栏字体为白色，适用于深色背景）
		*/
		interface StatusBarStyle {
			style: 'dark' | 'light';
		}

		/**
		 * 指定屏幕旋转到特定方向，或根据重力感应自动旋转，字符串类型  
		 * 用于 setScreenOrientation() 方法中 orientation 字段  
		 * iOS系统，Android系统 
		 * ( portrait_up      =>  竖屏时，屏幕在home键的上面，
		 *   portrait_down    =>  竖屏时，屏幕在home键的下面，部分手机不支持，
		 *   landscape_left   =>  横屏时，屏幕在home键的左边，
		 *   landscape_right  =>  横屏时，屏幕在home键的右边，
		 *   auto             =>  屏幕根据重力感应在横竖屏间自动切换，
		 *   auto_portrait    =>  屏幕根据重力感应在竖屏间自动切换，
		 *   auto_landscape   =>  屏幕根据重力感应在横屏间自动切换)
		*/
		interface ScreenOrientation {
			orientation:
				| 'portrait_up'
				| 'portrait_down'
				| 'landscape_left'
				| 'landscape_right'
				| 'auto'
				| 'auto_portrait'
				| 'auto_landscape';
		}

		/** 
		 * 上传状态，数字类型   
		 * 用于 ajax() 方法上传文件时返回值中的 status 字段
		 * iOS系统，Android系统
		 * ( 0 =>  上传中，    1 => 上传完成，   2 => 上传失败)
		*/
		interface UploadType {
			type: 0 | 1 | 2;
		}

		/** 
		 * 指定键盘弹出时，页面如何调整其内容，字符串类型
		 * iOS系统，Android系统
		 * （resize   =>  若键盘盖住输入框，页面会自动上移，
		 *   pan      =>  若键盘盖住输入框，页面不会自动上移，
		 *   auto     =>  默认值，由系统决定如何处理，iOS平台该字段等同于resize）
		*/
		interface SoftInputMode {
			softInputMode?: 'resize' | 'pan' | 'auto';
		}

		/** 
		 * 缓存策略，字符串类型
		 * 用于 imageCache() 方法中的 policy 字段
		 * iOS系统，Android系统
		 * （cache_else_network   =>  若服务器上没有更新，则使用缓存  默认值，
		 *  no_cache             =>  不使用缓存，始终从服务器获取，
		 *  cache_only           =>  当缓存存在时，只从缓存中读取）
		*/
		interface CacheStrategy {
			policy?: 'default' | 'cache_else_network' | 'no_cache' | 'cache_only';
		}
	}
}
