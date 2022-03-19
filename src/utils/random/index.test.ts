import { expect, test } from 'vitest';
import { random, randomLetter, randomNatural } from '@/utils';

test('randomNatural: 在传入的两个自然数之间随机生成一个自然数', () => {
  const nums = new Set();

  for (let i = 0; i < 1000; i++) {
    nums.add(
      randomNatural(0, 9),
    );
  }

  expect(
    Array.from(nums).sort(),
  ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('randomNatural: 第一个参数必须小于第二个参数, 否则结果不正确', () => {
  const nums = new Set();

  for (let i = 0; i < 1000; i++) {
    nums.add(
      randomNatural(9, 0),
    );
  }

  expect(
    Array.from(nums).sort(),
  ).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});

test('randomNatural: 两个参数都必须传, 否则结果不正确', () => {
  const nums = new Set();
  const nums2 = new Set();

  for (let i = 0; i < 1000; i++) {
    // @ts-expect-error xxx
    nums.add(randomNatural(9));
    // @ts-expect-error xxx
    nums2.add(randomNatural());
  }

  expect(Array.from(nums)).toEqual([NaN]);
  expect(Array.from(nums2)).toEqual([NaN]);
});

test('random: 在传入的两个数字之间随机生成一个数字', () => {
  const nums = new Set();

  for (let i = 0; i < 1000; i++) {
    nums.add(
      random(0, 9),
    );
  }

  expect(
    Array.from(nums).sort(),
  ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('random: 支持负数', () => {
  const nums = new Set();

  for (let i = 0; i < 1000; i++) {
    nums.add(
      random(-9, -1),
    );
  }

  expect(
    Array.from(nums).sort(),
  ).toEqual([-1, -2, -3, -4, -5, -6, -7, -8, -9]);
});

test('random: 支持正数和负数混用', () => {
  const nums = new Set();

  for (let i = 0; i < 2000; i++) {
    nums.add(
      random(-9, 9),
    );
  }

  expect(
    Array.from(nums).sort(),
  ).toEqual([-1, -2, -3, -4, -5, -6, -7, -8, -9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('random: 支持第一个参数大于第二个参数', () => {
  const nums = new Set();

  for (let i = 0; i < 1000; i++) {
    nums.add(
      random(9, 0),
    );
  }

  expect(
    Array.from(nums).sort(),
  ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('random: 不传参数, 则默认在 0 和 10 之间随机生成一个数字', () => {
  const nums = new Set();

  for (let i = 0; i < 1000; i++) {
    nums.add(
      random(),
    );
  }

  expect(
    Array.from(nums).sort(),
  ).toEqual([0, 1, 10, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('random: 如果只传了一个参数, 则默认在 0 和传入参数之间随机生成一个数字', () => {
  const nums = new Set();

  for (let i = 0; i < 1000; i++) {
    nums.add(
      random(9),
    );
  }

  expect(
    Array.from(nums).sort(),
  ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('randomLetter: 随机一个小写英文字母', () => {
  const nums = new Set();

  for (let i = 0; i < 10000; i++) {
    nums.add(
      randomLetter(),
    );
  }

  expect(
    Array.from(nums).sort(),
  ).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
});

test('randomLetter: 随机一个小写英文字母 ( 二 )', () => {
  const nums = new Set();

  for (let i = 0; i < 10000; i++) {
    nums.add(
      randomLetter(false),
    );
  }

  expect(
    Array.from(nums).sort(),
  ).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
});

test('randomLetter: 随机一个大写英文字母', () => {
  const nums = new Set();

  for (let i = 0; i < 10000; i++) {
    nums.add(
      randomLetter(true),
    );
  }

  expect(
    Array.from(nums).sort(),
  ).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
});
