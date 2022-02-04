/**
 * 判断传入参数是否是 Function 类型
 *
 * @param value 需要判断的参数
 * @example
 *
 * isFunction(() => {}); // -> true
 * isFunction(function() {}); // -> true
 * isFunction(666); // -> false
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}
