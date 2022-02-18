import { test } from 'vitest'; // eslint-disable-line import/no-extraneous-dependencies
import { testTypes } from '@@/test/shared';
import { isNumber } from '@/utils';


test('isNumber: 基础测试', () => {
  testTypes(isNumber, ['number']);
});