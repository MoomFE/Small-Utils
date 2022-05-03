import { describe, test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isNumeric } from '@/utils';

describe('isNumeric', () => {

  test('基础测试', () => {
    testTypes(isNumeric, ['number', 'numericString']);
  });

});
