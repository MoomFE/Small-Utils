/* eslint-disable no-self-compare */


/**
 * 判断传入参数是否是 Number 类型, 并且不为 NaN
 *
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isNumber(666); // -> true
 * isNumber(new Number(666)); // -> true
 * isNumber(NaN); // -> false
 * isNumber('666'); // -> false
 */
export default function isNumber(value) {
  return (typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]') && value === value;
}
