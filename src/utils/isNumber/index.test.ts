import { describe, test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isNumber } from '@/utils';

describe('isNumber', () => {

  test('基础测试', () => {
    testTypes(isNumber, ['number']);
  });

});
