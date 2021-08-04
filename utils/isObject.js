/**
 * 判断传入参数是否是 Object 类型, 并且不为 null
 *
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isObject({}); // -> true
 * isObject([]); // -> true
 * isObject(() => {}); // -> false
 * isObject(function() {}); // -> false
 * isObject(666); // -> false
 */
function isObject(value) {
  return value !== null && typeof value === 'object';
}

export { isObject }
export default isObject