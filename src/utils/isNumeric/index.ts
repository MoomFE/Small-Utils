import { isNumber, isString } from '@/utils';

/**
 * 判断传入参数是否是数字, 支持判断数字字符串
 *
 * @param value 需要判断的参数
 * @example
 *
 * isNumeric(666); // -> true
 * isNumeric('666'); // -> true
 * isNumeric(NaN); // -> false
 */
export function isNumeric(value: unknown) {
  // @ts-expect-error xxx
  return isNumber(value) || (isString(value) && !isNaN(value - parseFloat(value))); // eslint-disable-line no-restricted-globals
}
