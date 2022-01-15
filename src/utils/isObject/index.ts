/**
 * 判断传入参数是否是 Object 类型, 并且不为 null
 *
 * @param value 需要判断的参数
 * @example
 *
 * isObject({}); // -> true
 * isObject([]); // -> true
 * isObject(() => {}); // -> false
 * isObject(function() {}); // -> false
 * isObject(666); // -> false
 */
export function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object';
}
