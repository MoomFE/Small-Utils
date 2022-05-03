import { describe, test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isFunction } from '@/utils';

describe('isFunction', () => {

  test('基础测试', () => {
    testTypes(isFunction, ['function']);
  });

});
