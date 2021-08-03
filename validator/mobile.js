/**
 * 判断字符串是否包含移动电话号码的正则字符串
 */
const hasMobileRegStr = '1[3-9]\\d{9}';

/**
 * 判断字符串是否是移动电话号码的正则字符串
 */
export const isMobileRegStr = `^${hasMobileRegStr}$`;
/**
 * 判断字符串是否是移动电话号码的正则
 */
export const isMobileReg = new RegExp(isMobileRegStr);

/**
 * 判断字符串是否是完整的移动电话号码的正则字符串 ( 添加在手机号前加 0, 86, +86 的可选判断 )
 */
export const isCompleteMobileRegStr = `^(?:0|86|\\+86)?${hasMobileRegStr}$`;
/**
 * 判断字符串是否是完整的移动电话号码的正则 ( 添加在手机号前加 0, 86, +86 的可选判断 )
 */
export const isCompleteMobileReg = new RegExp(isCompleteMobileRegStr);


/**
 * 判断字符串是否是移动电话号码
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isMobile('16666666666'); // -> true
 * isMobile('12345678901'); // -> false
 * isMobile('016666666666'); // -> false
 * isMobile('8616666666666'); // -> false
 * isMobile('+8616666666666'); // -> false
 */
export function isMobile(value) {
  return isMobileReg.test(value);
}

/**
 * 判断字符串是否是完整的移动电话号码 ( 添加在手机号前加 0, 86, +86 的可选判断 )
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isCompleteMobile('16666666666'); // -> true
 * isCompleteMobile('016666666666'); // -> true
 * isCompleteMobile('8616666666666'); // -> true
 * isCompleteMobile('+8616666666666'); // -> true
 * isCompleteMobile('12345678901'); // -> false
 * isCompleteMobile('116666666666'); // -> false
 * isCompleteMobile('8716666666666'); // -> false
 * isCompleteMobile('+8716666666666'); // -> false
 */
export function isCompleteMobile(value) {
  return isCompleteMobileReg.test(value);
}
