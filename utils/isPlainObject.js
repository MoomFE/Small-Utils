/**
 * 判断传入对象是否是纯粹的对象
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export default function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}