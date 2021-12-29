import { test, expect } from 'vitest'; // eslint-disable-line import/no-extraneous-dependencies
import { isMobile } from '.';


test('isMobile', () => {
  expect(isMobile('16666666666')).toBe(true);
  expect(isMobile('12345678900')).toBe(false);
});
