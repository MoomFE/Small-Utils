import { isPromise } from '@/utils';

/**
 * 创建一个调用 `fn` 的函数, 执行 `fn` 的过程中, 如果函数再次被执行, 将会被忽略
 * @param fn 要运行的函数
 */
export function onceRun(fn: Function) {
  let lock = false;
  let result;

  return async() => {
    if (lock) return;

    lock = true;

    try {
      result = fn();

      // 如果函数是异步函数, 那么等待函数执行完毕
      if (isPromise(result))
        result = await result;

      lock = false;
    }
    catch (error) {
      lock = false;
      throw error;
    }

    return result;
  };
}
