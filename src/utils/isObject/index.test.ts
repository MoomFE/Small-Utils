import { describe, test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isObject, isPlainObject } from '@/utils';

describe('isPlainObject', () => {

  test('基础测试', () => {
    testTypes(isPlainObject, ['object', 'promiseLike']);
  });

});

describe('isObject', () => {

  test('基础测试', () => {
    testTypes(isObject, [
      'object', 'array',
      'regExp',
      'promise', 'promiseLike',
    ]);
  });

});
