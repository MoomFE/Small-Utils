/* eslint-disable no-restricted-globals */


import isNumber from './isNumber';


/**
 * 判断传入参数是否是数字, 支持判断数字字符串
 *
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isNumeric(666); // -> true
 * isNumeric('666'); // -> true
 * isNumeric(new Number(666)); // -> true
 * isNumeric(NaN); // -> false
 */
export default function isNumeric(value) {
  return isNumber(value) || (typeof value === 'string' && !isNaN(value - parseFloat(value)));
}
