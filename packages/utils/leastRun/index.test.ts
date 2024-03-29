import { describe, expect, test } from 'vitest';
import { delay, leastRun } from '@/utils';

describe('leastRun', () => {

  test('返回一个 Promise', () => {
    expect(leastRun(() => {})).toBeInstanceOf(Promise);
  });

  test('运行函数并且保证最少执行 1000ms 的时间', async () => {
    const start = Date.now();
    await leastRun(() => {});
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
  }, 1100);

  test('运行函数并且保证最少执行指定 ms 的时间', async () => {
    const times = [1, 10, 20, 100, 200, 1000, 2000];

    for (const time of times) {
      const start = Date.now();
      await leastRun(time, () => {});
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(time);
    }
  }, 3431);

  test('传入的函数执行时间超过指定的时间时, 直接完成', async () => {
    const start = Date.now();
    await leastRun(10, () => {
      return delay(1000);
    });
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
  }, 1100);

});
