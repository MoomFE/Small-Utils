import { expect, test } from 'vitest';
import { isMobile } from '@/validator';

test('isMobile: 基础测试', () => {
  expect(isMobile('10000000000')).toBe(false);
  expect(isMobile('11111111111')).toBe(false);
  expect(isMobile('12222222222')).toBe(false);
  expect(isMobile('13333333333')).toBe(true);
  expect(isMobile('14444444444')).toBe(true);
  expect(isMobile('15555555555')).toBe(true);
  expect(isMobile('16666666666')).toBe(true);
  expect(isMobile('17777777777')).toBe(true);
  expect(isMobile('18888888888')).toBe(true);
  expect(isMobile('19999999999')).toBe(true);
});

test('isMobile: 位数测试', () => {
  expect(isMobile('1666666666')).toBe(false);
  expect(isMobile('16666666666')).toBe(true);
  expect(isMobile('166666666666')).toBe(false);
});
