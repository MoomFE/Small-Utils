import { test } from 'vitest';
import { testTypes } from '@@/test/shared';
import { isString } from '@/utils';


test('isString: 基础测试', () => {
  testTypes(isString, ['string', 'numericString']);
});
