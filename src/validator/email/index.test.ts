import { describe, expect, test } from 'vitest';
import { isEmail } from '@/validator';

describe('isEmail', () => {

  test('基础测试', () => {
    expect(isEmail('123456789@xxx.com')).toBe(true);
    expect(isEmail('abcdefghi@xxx.com')).toBe(true);
    expect(isEmail('123456789')).toBe(false);
    expect(isEmail('123456789@')).toBe(false);
    expect(isEmail('123456789@xxx')).toBe(false);
    expect(isEmail('123456789@xxx.')).toBe(false);
  });

});
