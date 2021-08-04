/**
 * 判断传入参数是否是引用类型
 *
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isReference({}); // -> true
 * isReference([]); // -> true
 * isReference(() => {}); // -> true
 * isReference(true); // -> false
 * isReference(false); // -> false
 * isReference(null); // -> false
 * isReference(undefined); // -> false
 * isReference(666); // -> false
 * isReference(666n); // -> false
 * isReference('666'); // -> false
 * isReference(Symbol('666')); // -> false
 */
export default function isReference(value) {
  const type = typeof value;

  return (type === 'object' && value !== null) || type === 'function';
}
