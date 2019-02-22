interface I$api {
    /**
     * @description 去掉字符串首尾空格
     * @param str {string}
     * @example $api.trim('   abc  123   ');  // => "abc  123"
     */
    trim(str: string): string;
}
declare var $api: I$api;
