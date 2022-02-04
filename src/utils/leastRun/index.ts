import { delay } from '@/utils';


/**
 * 运行函数并且保证最少执行指定 ms 的时间
 * @param ms 最少执行的 ms 时间
 * @param fn 要运行的函数
 */
export async function leastRun(ms: number, fn: Function): Promise<any>;
/**
 * 运行函数并且保证最少执行 1000ms 的时间
 * @param fn 要运行的函数
 */
export async function leastRun(fn: Function): Promise<any>; // eslint-disable-line no-redeclare
export async function leastRun(msOrFn: number | Function, maybeFn?: Function) { // eslint-disable-line no-redeclare
  const start = Date.now();
  let ms = msOrFn as number;
  let fn = maybeFn || (() => {});

  if (typeof msOrFn === 'function') {
    ms = 1000;
    fn = msOrFn;
  }

  let result = fn();

  // 如果函数是异步函数, 那么等待函数执行完毕
  if (result instanceof Promise) {
    result = await result;
  }

  // 保证函数至少执行了 ms 毫秒
  await delay(Math.max(0, ms - (Date.now() - start)));

  return result;
}
