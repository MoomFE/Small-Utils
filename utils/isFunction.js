/**
 * 判断传入参数是否是 Function 类型
 *
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isFunction(() => {}); // -> true
 * isFunction(function() {}); // -> true
 * isFunction(666); // -> false
 */
function isFunction(value) {
  return typeof value === 'function';
}

  
export { isFunction };
export default isFunction;
