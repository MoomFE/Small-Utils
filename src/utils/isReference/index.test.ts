import { test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isReference } from '@/utils';


test('isReference: 基础测试', () => {
  testTypes(isReference, [
    'undefined',
    'null',
    'string', 'numericString',
    'number', 'nan',
    'boolean',
    'symbol',
    'bigint'
  ], {
    reverse: true
  });
});
