import { isObject } from '@/utils';


/**
 * 判断传入参数是否是引用类型
 *
 * @param value 需要判断的参数
 * @example
 *
 * isReference({}); // -> true
 * isReference([]); // -> true
 * isReference(() => {}); // -> true
 * isReference(undefined); // -> false
 * isReference(null); // -> false
 * isReference('666'); // -> false
 * isReference(666); // -> false
 * isReference(NaN); // -> false
 * isReference(true); // -> false
 * isReference(false); // -> false
 * isReference(Symbol('666')); // -> false
 * isReference(666n); // -> false
 */
export function isReference(value: unknown): value is object {
  return isObject(value) || typeof value === 'function';
}
