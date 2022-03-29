import { describe, expect, test } from 'vitest';
import { types } from '@@/test/shared';
import { deepClone } from '@/utils';

describe('deepClone', () => {

  test('深拷贝普通对象', () => {
    const obj = {
      a: 1,
      b: { c: 2 },
    };
    const result = deepClone(obj);

    expect(result).not.equals(obj);
    expect(result.b).not.equals(obj.b);
    expect(result.a).equals(obj.a);
    expect(result.b.c).equals(obj.b.c);
  });

  test('深拷贝数组', () => {
    const arr = [
      1,
      { c: 2 },
    ];
    const result = deepClone(arr);

    expect(result).not.equals(arr);
    expect(result[1]).not.equals(arr[1]);
    expect(result[0]).equals(arr[0]); // @ts-expect-error xxx
    expect(result[1].c).equals(arr[1].c);
  });

  test('其他类型的值在深拷贝时会直接继承', () => {
    Object.entries(types).forEach(([type, values]) => {
      if (['nan', 'object', 'array', 'promiseLike'].includes(type)) return;

      values.forEach((value) => {
        expect(deepClone(value)).equals(value);
      });
    });
  });

});
