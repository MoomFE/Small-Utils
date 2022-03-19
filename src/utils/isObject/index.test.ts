import { test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isObject, isPlainObject } from '@/utils';

test('isPlainObject: 基础测试', () => {
  testTypes(isPlainObject, ['object', 'promiseLike']);
});

test('isObject: 基础测试', () => {
  testTypes(isObject, [
    'object', 'array',
    'regExp',
    'promise', 'promiseLike',
  ]);
});
