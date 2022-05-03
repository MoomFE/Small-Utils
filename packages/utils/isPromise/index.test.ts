import { describe, test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isNativePromise, isPromise } from '@/utils';

describe('isNativePromise', () => {

  test('基础测试', () => {
    testTypes(isNativePromise, ['promise']);
  });

});

describe('isPromise', () => {

  test('基础测试', () => {
    testTypes(isPromise, ['promise', 'promiseLike']);
  });

});
