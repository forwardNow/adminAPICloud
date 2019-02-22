interface Dictionary<T> {
	[key: string]: T;
}
declare type Color = string;
/**
 * 在api对象准备完毕后产生，在每个Window或Frame的HTML代码中都需要监听此事件，以确定APICloud扩展对象已经准备完毕，可以调用了 
 * iOS系统，Android系统
*/
// declare var apiready: () => void;
interface Window{
	apiready: () => void;
}
