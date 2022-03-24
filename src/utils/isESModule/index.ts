/**
 * 判断传入参数是否是 ES Module
 *
 * @param value 需要判断的参数
 * @example
 *
 * isESModule({}); // -> false
 * isESModule(await import('https://cdn.jsdelivr.net/npm/vue')); // -> true
 */
export function isESModule(value: any): value is { default: any } {
  return value.__esModule || value[Symbol.toStringTag] === 'Module';
}
