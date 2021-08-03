/**
 * 判断字符串是否包含数字的正则字符串
 */
export const hasMumbersRegStr = '\\d+';
/**
 * 判断字符串是否包含数字的正则
 */
export const hasMumbersReg = new RegExp(hasMumbersRegStr);

/**
 * 判断字符串从开头到结尾是否都是数字的正则字符串
 */
export const isMumbersRegStr = `^${hasMumbersRegStr}$`;
/**
 * 判断字符串从开头到结尾是否都是数字的正则
 */
export const isMumbersReg = new RegExp(isMumbersRegStr);

/**
 * 判断字符串是否包含数字
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * hasMumbers('666'); // -> true
 * hasMumbers('6A6'); // -> true
 * hasMumbers('AAA'); // -> false
 */
export function hasMumbers(value) {
  return hasMumbersReg.test(value);
}

/**
 * 判断字符串从开头到结尾是否都是数字
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isMumbers('666'); // -> true
 * isMumbers('6A6'); // -> false
 * isMumbers('AAA'); // -> false
 */
export function isMumbers(value) {
  return isMumbersReg.test(value);
}
