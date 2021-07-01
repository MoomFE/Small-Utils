/**
 * 判断传入对象是否是纯粹的对象
 * 
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 * @example
 * 
 * isPlainObject({}); // -> true
 * isPlainObject(Object.create(null)); // -> true
 * isPlainObject([]); // -> false
 */
export default function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}