import { test } from 'vitest'; // eslint-disable-line import/no-extraneous-dependencies
import { testTypes } from '@@/test/shared';
import { isNumeric } from '@/utils';


test('isNumeric: 基础测试', () => {
  testTypes(isNumeric, ['number', 'numericString']);
});
