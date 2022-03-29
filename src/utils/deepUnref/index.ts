import type { Ref, UnwrapNestedRefs } from 'vue-demi';
import { unref } from 'vue-demi';
import { isPlainObject } from '@/utils';

/**
 * Vue `unref` 的加强版本,
 *  - 如果传入的是普通对象和数组, 会不断向下查找然后解包并返回传入对象的副本, 否则直接返回传入值的 `unref` 结果.
 */
export function deepUnref<T>(maybeRef: T | Ref<T>): UnwrapNestedRefs<T> {
  const value = unref(maybeRef);

  if (Array.isArray(value))
    return value.map(item => deepUnref(item)) as any;

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, deepUnref(v)]),
    ) as any;
  }

  return value as any;
}
