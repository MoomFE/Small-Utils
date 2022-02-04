import { test } from 'vitest'; // eslint-disable-line import/no-extraneous-dependencies
import { testTypes } from '@@/test/shared';
import { isString } from '@/utils';


test('isString: 基础测试', () => {
  testTypes(isString, ['string', 'numericString']);
});
