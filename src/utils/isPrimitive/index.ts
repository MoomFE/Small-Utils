import { isReference } from '@/utils';


/**
 * 判断传入参数是否是原始类型
 *
 * @param value 需要判断的参数
 * @example
 *
 * isReference(undefined); // -> true
 * isReference(null); // -> true
 * isReference('666'); // -> true
 * isReference(666); // -> true
 * isReference(NaN); // -> true
 * isReference(true); // -> true
 * isReference(false); // -> true
 * isReference(Symbol('666')); // -> true
 * isReference(666n); // -> true
 * isReference({}); // -> false
 * isReference([]); // -> false
 * isReference(() => {}); // -> false
 */
export function isPrimitive(value: unknown) {
  return !isReference(value);
}
