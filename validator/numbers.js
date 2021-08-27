/**
 * 判断字符串是否包含数字的正则字符串
 */
export const hasNumbersRegStr = '\\d+';
/**
 * 判断字符串是否包含数字的正则
 */
export const hasNumbersReg = new RegExp(hasNumbersRegStr);

/**
 * 判断字符串从开头到结尾是否都是数字的正则字符串
 */
export const isNumbersRegStr = `^${hasNumbersRegStr}$`;
/**
 * 判断字符串从开头到结尾是否都是数字的正则
 */
export const isNumbersReg = new RegExp(isNumbersRegStr);

/**
 * 判断字符串是否包含数字
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * hasNumbers('666'); // -> true
 * hasNumbers('6A6'); // -> true
 * hasNumbers('AAA'); // -> false
 */
export function hasNumbers(value) {
  return hasNumbersReg.test(value);
}

/**
 * 判断字符串从开头到结尾是否都是数字
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isNumbers('666'); // -> true
 * isNumbers('6A6'); // -> false
 * isNumbers('AAA'); // -> false
 */
export function isNumbers(value) {
  return isNumbersReg.test(value);
}
