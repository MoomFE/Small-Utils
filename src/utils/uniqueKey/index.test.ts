import { describe, expect, test } from 'vitest';
import { isNumeric, uniqueKey } from '@/utils';

describe('uniqueKey', () => {

  test('为数组中对象的某个字段生成一个唯一的 key', () => {
    const arr = [
      { key: 0 },
      { key: 1 },
      { key: 2 },
    ];

    let index = 0;

    expect(uniqueKey(arr, 'key', () => index++)).toEqual(3);
  });

  test('为空数组生成 key', () => {
    const arr: { key: number }[] = [];
    let index = 0;

    expect(uniqueKey(arr, 'key', () => index++)).toEqual(0);
  });

  test('自定义 key 生成器', () => {
    const arr = [
      { key: 'id:0' },
      { key: 'id:1' },
      { key: 'id:2' },
    ];

    let index = 0;

    expect(uniqueKey(arr, 'key', () => `id:${index++}`)).toEqual('id:3');
  });

  test('方法第三个参数为空时, 使用默认的 key 生成器', () => {
    const arr: { key: string }[] = [];

    for (let i = 0; i < 10000; i++) {
      const key = uniqueKey(arr, 'key');

      expect(
        arr.some(item => key === item.key),
      ).is.false;

      arr.push({
        key,
      });
    }
  });

  test('默认的 key 生成器, 返回的是长度为 18 且首字母不为数字的字符串', () => {
    const arr: { key: string }[] = [];

    for (let i = 0; i < 10000; i++) {
      const key = uniqueKey(arr, 'key');

      expect(
        arr.some(item => key === item.key),
      ).is.false;

      arr.push({
        key,
      });

      expect(key).is.string;
      expect(key.length).toEqual(18);
      expect(isNumeric(key[0])).is.false;
    }
  });

  test('方法的第二个参数如果不传, 默认为 id', () => {
    const arr: { id: string }[] = [];

    for (let i = 0; i < 10000; i++) {
      const id = uniqueKey(arr);

      expect(
        arr.some(item => id === item.id),
      ).is.false;

      arr.push({
        id,
      });

      expect(id).is.string;
      expect(id.length).toEqual(18);
      expect(isNumeric(id[0])).is.false;
    }
  });

});
