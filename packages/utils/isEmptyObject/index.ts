import type { EmptyObject } from 'type-fest';

/**
 * 判断传入参数是否是一个空对象
 * @param value 需要判断的参数
 * @example
 *
 * isEmptyObject({}); // -> true
 * isEmptyObject({ a: 6 }); // -> false
 */
export function isEmptyObject(value: any): value is EmptyObject {
  // eslint-disable-next-line no-unreachable-loop
  for (const a in value)
    return false;
  return true;
}
