/**
 * 判断字符串是否是 18 位身份证号码的正则字符串
 */
export const isCitizenIDRegStr = '^[1-9]\\d{5}[1-2]\\d{3}((0\\d)|(1[0-2]))(([012]\\d)|3[0-1])\\d{3}(\\d|X|x)$';

/**
 * 判断字符串是否是 18 位身份证号码的正则
 */
export const isCitizenIDReg = new RegExp(isCitizenIDRegStr);

/**
 * 判断字符串是否是 18 位身份证号码
 * @param {any}} value 需要判断的参数
 * @returns {Boolean}
 */
export function isCitizenID(value) {
  return isCitizenIDReg.test(value);
}
