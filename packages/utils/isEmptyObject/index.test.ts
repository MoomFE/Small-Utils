import { describe, expect, test } from 'vitest';
import { isEmptyObject } from '@/utils';

describe('isEmptyObject', () => {

  test('基础测试', () => {
    expect(isEmptyObject({})).toEqual(true);
    expect(isEmptyObject({ a: 6 })).toEqual(false);
  });

});
