import { test } from 'vitest'; // eslint-disable-line import/no-extraneous-dependencies
import { testTypes } from '@@/test/shared';
import { isFunction } from '@/utils';


test('isFunction: 基础测试', () => {
  testTypes(isFunction, ['function']);
});
