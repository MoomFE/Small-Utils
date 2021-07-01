/**
 * 判断传入对象是否是 String 类型
 * 
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 * @example
 * 
 * isString('666'); // -> true
 * isString(new String('666')); // -> true
 * isString(666); // -> false
 */
export default function isString(obj) {
  return typeof obj === 'string' || Object.prototype.toString.call(obj) === '[object String]'
}