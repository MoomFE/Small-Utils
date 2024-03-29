import { describe, expect, test } from 'vitest';
import { delay, wait } from '@/utils';

describe('delay', () => {

  test('返回一个 Promise', () => {
    expect(delay()).toBeInstanceOf(Promise);
  });

  test('默认延迟时间为 1000', async () => {
    const start = Date.now();
    await delay();
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
  }, 1100);

  test('指定延迟时间', async () => {
    const times = [1, 10, 20, 100, 200, 1000, 2000];

    for (const time of times) {
      const start = Date.now();
      await delay(time);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(time);
    }
  }, 3431);

});

describe('wait', () => {

  test('delay 方法的别名', () => {
    expect(wait).toBe(delay);
  });

});
