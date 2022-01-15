import { test } from 'vitest'; // eslint-disable-line import/no-extraneous-dependencies
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
