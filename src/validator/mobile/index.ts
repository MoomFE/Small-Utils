/**
 * 判断字符串是否是移动电话号码的正则
 */
const isMobileReg = /^1[3-9]\d{9}$/;


/**
 * 判断字符串是否是移动电话号码
 * @param value 需要判断的参数
 * @example
 *
 * isMobile('16666666666'); // -> true
 * isMobile('12345678900'); // -> false
 */
export function isMobile(value: string): boolean {
  return isMobileReg.test(value);
}
