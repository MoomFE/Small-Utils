import { test } from 'vitest'; // eslint-disable-line import/no-extraneous-dependencies
import { testTypes } from '@@/test/shared';
import { isNativePromise, isPromise } from '@/utils';


test('isNativePromise: 基础测试', () => {
  testTypes(isNativePromise, ['promise']);
});

test('isPromise: 基础测试', () => {
  testTypes(isPromise, ['promise', 'promiseLike']);
});
