import { describe, test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isString } from '@/utils';

describe('isString', () => {

  test('基础测试', () => {
    testTypes(isString, ['string', 'numericString']);
  });

});
