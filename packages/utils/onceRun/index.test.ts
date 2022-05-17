import { describe, expect, test } from 'vitest';
import { delay, onceRun } from '@/utils';

describe('onceRun', () => {

  test('返回一个新的函数', () => {
    const fn = () => {};
    const wrapFn = onceRun(fn);

    expect(typeof wrapFn === 'function').is.true;
    expect(wrapFn !== fn).is.true;
  });

  test('运行函数返回一个 Promise', () => {
    const fn = () => {};
    const wrapFn = onceRun(fn);

    expect(wrapFn()).toBeInstanceOf(Promise);
  });

  test('传入的函数未执行完成时, 重复执行无效果', async() => {
    const list: number[] = [];
    let index = 0;

    const fn = async() => {
      await delay(100);
      list.push(index++);
    };
    const wrapFn = onceRun(fn);

    await Promise.all([
      wrapFn(),
      wrapFn(),
      wrapFn(),
    ]);

    expect(list).toEqual([0]);
  });

  test('传入的函数运行过程中报错, 不会影响下次运行', async() => {
    const list: number[] = [];
    let index = 0;

    const fn = async() => {
      await delay(100);

      if (index === 1) {
        index++;
        throw new Error('???');
      }
      else {
        list.push(index++);
      }
    };
    const wrapFn = onceRun(fn);

    // 正常
    await Promise.allSettled([wrapFn(), wrapFn(), wrapFn()]);
    expect(list).toEqual([0]);

    // 报错
    await Promise.allSettled([wrapFn(), wrapFn(), wrapFn()]);
    expect(list).toEqual([0]);

    // 正常
    await Promise.allSettled([wrapFn(), wrapFn(), wrapFn()]);
    expect(list).toEqual([0, 2]);

  });

});
