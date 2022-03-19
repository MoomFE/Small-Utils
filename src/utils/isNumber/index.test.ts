import { test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isNumber } from '@/utils';

test('isNumber: 基础测试', () => {
  testTypes(isNumber, ['number']);
});
