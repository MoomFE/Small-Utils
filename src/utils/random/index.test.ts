import { describe, expect, test } from 'vitest';
import { random, randomBoolean, randomLetter, randomNatural, randomString } from '@/utils';

describe('randomNatural', () => {

  test('在传入的两个自然数之间随机生成一个自然数', () => {
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

  test('第一个参数必须小于第二个参数, 否则结果不正确', () => {
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

  test('两个参数都必须传, 否则结果不正确', () => {
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

});

describe('random', () => {

  test('在传入的两个数字之间随机生成一个数字', () => {
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

  test('支持负数', () => {
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

  test('支持正数和负数混用', () => {
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

  test('支持第一个参数大于第二个参数', () => {
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

  test('不传参数, 则默认在 0 和 10 之间随机生成一个数字', () => {
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

  test('如果只传了一个参数, 则默认在 0 和传入参数之间随机生成一个数字', () => {
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

});

describe('randomLetter', () => {

  test('随机一个小写英文字母', () => {
    const nums = new Set();
    const nums2 = new Set();

    for (let i = 0; i < 10000; i++) {
      nums.add(
        randomLetter(),
      );

      nums2.add(
        randomLetter(false),
      );
    }

    expect(
      Array.from(nums).sort(),
    ).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);

    expect(
      Array.from(nums2).sort(),
    ).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
  });

  test('随机一个大写英文字母', () => {
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

});

describe('randomString', () => {

  test('默认生成的字符串长度为 12', () => {
    for (let i = 0; i < 10000; i++)
      expect(randomString().length).toEqual(12);
  });

  test('指定生成的字符串长度', () => {
    for (let i = 0; i < 10000; i++)
      expect(randomString(i).length).toEqual(i);
  });

  test('指定生成仅有小写字母的字符串, 这也是默认生成规则', () => {
    for (let i = 0; i < 10000; i++) {
      const str = randomString();
      const str2 = randomString(12, {
        lowercase: true,
      });

      expect(/^[a-z]+$/.test(str)).toEqual(true);
      expect(/^[a-z]+$/.test(str2)).toEqual(true);
    }
  });

  test('指定生成仅有大写字母的字符串', () => {
    for (let i = 0; i < 10000; i++) {
      const str = randomString(12, {
        lowercase: false,
        uppercase: true,
      });

      expect(/^[A-Z]+$/.test(str)).toEqual(true);
    }
  });

  test('指定生成仅有数字的字符串', () => {
    for (let i = 0; i < 10000; i++) {
      const str = randomString(12, {
        lowercase: false,
        uppercase: false,
        number: true,
      });

      expect(/^[0-9]+$/.test(str)).toEqual(true);
    }
  });

  test('指定生成包含小写字母和大写字母的字符串', () => {
    for (let i = 0; i < 10000; i++) {
      const str = randomString(36, {
        lowercase: true,
        uppercase: true,
      });

      expect(/^[a-z]+$/.test(str)).toEqual(false);
      expect(/^[A-Z]+$/.test(str)).toEqual(false);
      expect(/^[a-zA-Z]+$/.test(str)).toEqual(true);
    }
  });

  test('指定生成包含小写字母和数字的字符串', () => {
    for (let i = 0; i < 10000; i++) {
      const str = randomString(36, {
        lowercase: true,
        number: true,
      });

      expect(/^[a-z]+$/.test(str)).toEqual(false);
      expect(/^[0-9]+$/.test(str)).toEqual(false);
      expect(/^[a-z0-9]+$/.test(str)).toEqual(true);
    }
  });

  test('指定生成包含大写字母和数字的字符串', () => {
    for (let i = 0; i < 10000; i++) {
      const str = randomString(36, {
        lowercase: false,
        uppercase: true,
        number: true,
      });

      expect(/^[A-Z]+$/.test(str)).toEqual(false);
      expect(/^[0-9]+$/.test(str)).toEqual(false);
      expect(/^[A-Z0-9]+$/.test(str)).toEqual(true);
    }
  });

  test('指定生成包含小写字母、大写字母和数字的字符串', () => {
    for (let i = 0; i < 10000; i++) {
      const str = randomString(36, {
        lowercase: true,
        uppercase: true,
        number: true,
      });

      expect(/^[a-z]+$/.test(str)).toEqual(false);
      expect(/^[A-Z]+$/.test(str)).toEqual(false);
      expect(/^[0-9]+$/.test(str)).toEqual(false);
      expect(/^[a-zA-Z]+$/.test(str)).toEqual(false);
      expect(/^[a-z0-9]+$/.test(str)).toEqual(false);
      expect(/^[A-Z0-9]+$/.test(str)).toEqual(false);
      expect(/^[a-zA-Z0-9]+$/.test(str)).toEqual(true);
    }
  });

  test('关闭所有选项, 方法将会报错', () => {
    expect(() => {
      randomString(12, {
        lowercase: false,
        uppercase: false,
        number: false,
      });
    }).toThrow('???');
  });

});

describe('randomBoolean', () => {

  test('生成一个随机的 boolean 值', () => {
    const bools = new Set();

    for (let i = 0; i < 36; i++)
      bools.add(randomBoolean());

    expect(
      Array.from(bools).sort(),
    ).toEqual([false, true]);
  });

});
