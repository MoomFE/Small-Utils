/**
 * 判断字符串是否是 18 位身份证号码的正则
 */
const isCitizenIDReg = /^[1-9]\d{5}[1-2]\d{3}((0\d)|(1[0-2]))(([012]\d)|3[0-1])\d{3}(\d|X|x)$/;


/**
 * 判断字符串是否是 18 位身份证号码
 * @param value 需要判断的参数
 * @example
 *
 * isCitizenID('360602199901239999'); // -> true
 * isCitizenID('36060219990123999x'); // -> true
 * isCitizenID('36060219990123999X'); // -> true
 * isCitizenID('360609999999999999'); // -> false
 */
export function isCitizenID(value: string): boolean {
  return isCitizenIDReg.test(value);
}
