import { isPlainObject } from '@/utils';

/**
 * 创建传入值的深拷贝
 *  - 只会深拷贝普通对象和数组, 其他类型的值会直接被继承
 */
export function deepClone<T>(value: T): T {
  if (Array.isArray(value))
    return value.map(item => deepClone(item)) as any;

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, deepClone(v)]),
    ) as any;
  }

  return value;
}
