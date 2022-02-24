import { test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isPrimitive } from '@/utils';


test('isPrimitive: 基础测试', () => {
  testTypes(isPrimitive, [
    'undefined',
    'null',
    'string', 'numericString',
    'number', 'nan',
    'boolean',
    'symbol',
    'bigint'
  ]);
});
