/**
 * 判断传入对象是否是 Number 类型, 并且不为 NaN
 * 
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 * @example
 * 
 * isNumber(666); // -> true
 * isNumber(NaN); // -> false
 * isNumber('666'); // -> false
 */
export default function isNumber(obj) {
  return typeof obj === 'number' && obj === obj; // eslint-disable-line no-self-compare
}