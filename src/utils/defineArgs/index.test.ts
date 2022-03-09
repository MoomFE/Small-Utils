import { test, expect } from 'vitest';
import { defineArgs } from '@/utils';


test('defineArgs: 提前定义方法的参数', () => {
  let args: number[] = [];

  const add = (a: number, b: number) => {
    args = [a, b];
    return a + b;
  };

  const next = defineArgs(add, {
    0: 1
  });


  expect(next(0)).toBe(1);
  expect(args).toEqual([1, 0]);

  expect(next(1)).toBe(2);
  expect(args).toEqual([1, 1]);

  expect(next(2)).toBe(3);
  expect(args).toEqual([1, 2]);
});

test('defineArgs: 提前定义方法的参数 ( 二 )', () => {
  let args: number[] = [];

  const add = (a: number, b: number) => {
    args = [a, b];
    return a + b;
  };

  const next = defineArgs(add, {
    1: 1
  });


  expect(next(0)).toBe(1);
  expect(args).toEqual([0, 1]);

  expect(next(1)).toBe(2);
  expect(args).toEqual([1, 1]);

  expect(next(2)).toBe(3);
  expect(args).toEqual([2, 1]);
});

test('defineArgs: 定义参数值时, 可以传入方法, 取值时, 会执行方法获取实时的值', () => {
  let index = 1;
  let args: number[] = [];

  const add = (a: number, b: number) => {
    args = [a, b];
    return a + b;
  };

  const next = defineArgs(add, {
    1: () => index++
  });


  expect(next(0)).toBe(1);
  expect(args).toEqual([0, 1]);

  expect(next(1)).toBe(3);
  expect(args).toEqual([1, 2]);

  expect(next(2)).toBe(5);
  expect(args).toEqual([2, 3]);
});

test('defineArgs: 定义了指定位置的参数值, 方法传入的参数会绕开指定位置传入', () => {
  let args: any[] = [];

  const record = (a: any, b: any, c: any, d: any) => {
    args = [a, b, c, d];
  };

  const wrapRecord = defineArgs(record, {
    2: 666
  });

  wrapRecord(1, 2, 3);
  expect(args).toEqual([1, 2, 666, 3]);
});
