import { expect, test } from 'vitest';
import { delay, wait } from '@/utils';

test('delay: 返回一个 Promise', () => {
  expect(delay()).toBeInstanceOf(Promise);
});

test('delay: 默认延迟时间为 1000', async() => {
  const start = Date.now();
  await delay();
  const end = Date.now();
  expect(end - start).toBeGreaterThanOrEqual(1000);
}, 1100);

test('delay: 指定延迟时间', async() => {
  const times = [1, 10, 20, 100, 200, 1000, 2000];

  for (const time of times) {
    const start = Date.now();
    await delay(time); // eslint-disable-line no-await-in-loop
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(time);
  }
}, 3431);

test('wait: delay 方法的别名', () => {
  expect(wait).toBe(delay);
});
