/**
 * 判断传入参数是否是纯粹的对象
 *
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isPlainObject({}); // -> true
 * isPlainObject(Object.create(null)); // -> true
 * isPlainObject([]); // -> false
 */
export default function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}
