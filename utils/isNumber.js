/**
 * 判断传入对象是否是 Number 类型, 并且不为 NaN
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export default function isNumber(obj) {
  return typeof obj === 'number' && obj === obj; // eslint-disable-line no-self-compare
}