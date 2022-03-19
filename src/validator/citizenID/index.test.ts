import { expect, test } from 'vitest';
import { isCitizenID } from '@/validator';

test('isCitizenID: 基础测试', () => {
  expect(isCitizenID('360602199901239999')).toBe(true);
  expect(isCitizenID('36060219990123999x')).toBe(true);
  expect(isCitizenID('36060219990123999X')).toBe(true);
  expect(isCitizenID('360609999999999999')).toBe(false);
  expect(isCitizenID('36060999999999999x')).toBe(false);
  expect(isCitizenID('36060999999999999X')).toBe(false);
});

test('isCitizenID: 身份证中的年份测试', () => {
  expect(isCitizenID('360602179901239999')).toBe(false);
  expect(isCitizenID('360602189901239999')).toBe(true);
  expect(isCitizenID('360602199901239999')).toBe(true);
  expect(isCitizenID('360602209901239999')).toBe(true);
  expect(isCitizenID('360602219901239999')).toBe(false);
});
