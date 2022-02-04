/**
 * 判断字符串是否是电子邮件地址的正则
 * @link https://emailregex.com/
 */
const isEmailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape

/**
 * 判断字符串是否是电子邮件地址
 * @param value 需要判断的参数
 * @example
 *
 * isEmail('123456789@xxx.com'); // -> true
 * isEmail('abcdefghi@xxx.com'); // -> true
 * isEmail('123456789'); // -> false
 * isEmail('123456789@'); // -> false
 * isEmail('123456789@xxx'); // -> false
 * isEmail('123456789@xxx.'); // -> false
 */
export function isEmail(value: string): boolean {
  return isEmailReg.test(value);
}
