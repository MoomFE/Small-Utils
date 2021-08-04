/**
 * 判断传入参数是否是 String 类型
 *
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isString('666'); // -> true
 * isString(new String('666')); // -> true
 * isString(666); // -> false
 */
export default function isString(value) {
  return typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]';
}
