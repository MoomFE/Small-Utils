import { expect, test } from 'vitest';
import { randomNatural } from '@/utils';


test('randomNatural: 在传入的两个自然数中随机一个数字', () => {
  const nums = new Set();

  for (let i = 0; i < 1000; i++) {
    nums.add(
      randomNatural(0, 10)
    );
  }

  expect(
    Array.from(nums).sort()
  ).toEqual([0, 1, 10, 2, 3, 4, 5, 6, 7, 8, 9]);
});
