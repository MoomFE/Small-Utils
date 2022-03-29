import { describe, test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isPrimitive } from '@/utils';

describe('isPrimitive', () => {

  test('基础测试', () => {
    testTypes(isPrimitive, [
      'undefined',
      'null',
      'string', 'numericString',
      'number', 'nan',
      'boolean',
      'symbol',
      'bigint',
    ]);
  });

});
