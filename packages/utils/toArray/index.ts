/**
 * 转换传入参数为数组
 * @param value 需要转换的参数
 * @example
 *
 * toArray(666); // -> [666]
 * toArray([666]); // -> [666]
 */
export function toArray<T>(value?: T | Array<T> | null): Array<T> {
  value = value ?? [];

  if (Array.isArray(value))
    return value;

  return [value];
}
