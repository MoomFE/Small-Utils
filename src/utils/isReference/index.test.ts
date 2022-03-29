import { describe, test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isReference } from '@/utils';

describe('isReference', () => {

  test('基础测试', () => {
    testTypes(isReference, [
      'undefined',
      'null',
      'string', 'numericString',
      'number', 'nan',
      'boolean',
      'symbol',
      'bigint',
    ], {
      reverse: true,
    });
  });

});
