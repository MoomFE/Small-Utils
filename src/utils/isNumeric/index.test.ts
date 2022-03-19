import { test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isNumeric } from '@/utils';

test('isNumeric: 基础测试', () => {
  testTypes(isNumeric, ['number', 'numericString']);
});
