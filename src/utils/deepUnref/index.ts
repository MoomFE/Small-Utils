import type { Ref } from 'vue-demi';
import { unref } from 'vue-demi';
import { isPlainObject } from '@/utils';


/**
 * Vue `unref` 的加强版本,
 * 如果传入的是普通对象, 会不断向下查找然后解包并返回传入对象的副本,
 * 否则直接返回传入值的 `unref` 结果.
 */
export function deepUnref<T>(maybeRef: T | Ref<T>): T {
  const value = unref(maybeRef);

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, deepUnref(v)])
    ) as T;
  }

  return value;
}
