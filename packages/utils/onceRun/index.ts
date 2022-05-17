import { isPromise } from '@/utils';

/**
 * 创建一个调用 `fn` 的函数, 执行 `fn` 的过程中, 如果函数再次被执行, 将会被忽略
 * @param fn 要运行的函数
 */
export function onceRun(fn: Function) {
  let cache: Promise<any> | undefined;
  let result;

  async function wrap(...args: any[]) {
    if (cache) return;

    try {
      result = fn(...args);

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

  return (...args: any[]) => {
    return cache || (cache = wrap(...args));
  };
}
