import isReference from './isReference';


/**
 * 判断传入参数是否是原始类型
 *
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isPrimitive(true); // -> true
 * isPrimitive(false); // -> true
 * isPrimitive(null); // -> true
 * isPrimitive(undefined); // -> true
 * isPrimitive(666); // -> true
 * isPrimitive(666n); // -> true
 * isPrimitive('666'); // -> true
 * isPrimitive(Symbol('666')); // -> true
 * isPrimitive({}); // -> false
 * isPrimitive([]); // -> false
 * isPrimitive(() => {}); // -> false
 */
function isPrimitive(value) {
  return !isReference(value);
}

export { isPrimitive }
export default isPrimitive
