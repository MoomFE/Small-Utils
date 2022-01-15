/**
 * 判断传入参数是否是 Number 类型, 并且不为 NaN
 *
 * @param value 需要判断的参数
 * @example
 *
 * isNumber(666); // -> true
 * isNumber(NaN); // -> false
 * isNumber('666'); // -> false
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && value === value; // eslint-disable-line no-self-compare
}
