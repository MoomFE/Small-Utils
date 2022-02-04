import { test } from 'vitest'; // eslint-disable-line import/no-extraneous-dependencies
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
