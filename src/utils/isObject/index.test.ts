import { test } from 'vitest'; // eslint-disable-line import/no-extraneous-dependencies
import { testTypes } from '@@/test/shared';
import { isObject } from '@/utils';


test('isObject: 基础测试', () => {
  testTypes(isObject, [
    'object', 'array',
    'regExp',
    'promise', 'promiseLike',
  ]);
});
