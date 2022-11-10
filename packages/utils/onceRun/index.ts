import type { AsyncReturnType } from 'type-fest';
import { isPromise } from '@/utils';

/**
 * 创建一个调用 `fn` 的函数, 执行 `fn` 的过程中, 如果函数再次被执行, 将会被忽略
 * @param fn 要运行的函数
 */
export function onceRun<
  F extends ((...args: any[]) => any) | ((...args: any[]) => Promise<any>),
  A extends Parameters<F>,
  R extends AsyncReturnType<F>,
>(fn: F): (...args: A) => Promise<R> {
  let cache: Promise<R> | undefined;
  let result;

  async function wrap(this: any, ...args: any[]) {
    if (cache) return;

    try {
      result = fn.call(this, ...args);

      // 如果函数是异步函数, 那么等待函数执行完毕
      if (isPromise(result))
        result = await result;

      cache = undefined;
    }
    catch (error) {
      cache = undefined;
      throw error;
    }

    return result;
  }

  return function (this: any, ...args: any[]) {
    return cache || (cache = wrap.call(this, ...args));
  };
}
