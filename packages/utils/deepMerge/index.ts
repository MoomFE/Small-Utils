import type { Merge } from 'type-fest';
import { isPlainObject } from '@/utils';

/**
 * 深拷贝合并一个或多个来源对象 `sources` 的属性到目标对象 `target`
 *  - 来源对象从左到右进行深拷贝, 后续的来源对象会覆盖之前拷贝的属性
 *  - 来源对象中值为 `undefined` 的属性会被跳过
 *  - 来源对象中普通对象将会递归合并, 数组会被深拷贝后继承, 其他对象将会直接继承
 *  - 目标对象或来源对象的类型为数组时, 遵循以上规则
 */
export function deepMerge<T extends object = object, S extends object = T>(target: T, ...sources: S[]): Merge<T, S> {
  if ((!isPlainObject(target) && !Array.isArray(target)) || !sources.length)
    return target as any;

  return deepMergeBase(target, sources) as any;
}

function deepMergeBase<T extends object = object, S extends object = T>(target: T, sources: S[], parent?: any): Merge<T, S> | undefined {
  // 遍历所有来源对象
  for (const source of sources) {
    // 无用的来源对象
    if (!isPlainObject(source) && !Array.isArray(source)) continue;

    // 遍历来源对象的属性
    for (const [key, value] of Object.entries(source)) {
      // 单元测试 -> 防御无限引用 ( 一 )
      if (target === value) continue;
      // 单元测试 -> 防御无限引用 ( 二 )
      if (parent && parent === value) return;

      let valueIsArray;

      // 属性值是普通对象和数组
      if (value && (isPlainObject(value) || (valueIsArray = Array.isArray(value)))) {
        let targetValue; // @ts-expect-error xxx
        const cloneValue = valueIsArray ? [] : isPlainObject(targetValue = target[key]) ? targetValue : {};

        if (deepMergeBase(cloneValue, [value], source) !== undefined) // @ts-expect-error xxx
          target[key] = cloneValue;
      }
      // 其他类型
      else if (value !== undefined) { // @ts-expect-error xxx
        target[key] = value;
      }
    }
  }

  return target as any;
}
