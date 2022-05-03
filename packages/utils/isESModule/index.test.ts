import { describe, expect, test } from 'vitest';
import { isESModule } from '@/utils';

describe('isESModule', () => {

  test('基础测试', async() => {
    expect(isESModule(null)).toBe(false);
    expect(isESModule(undefined)).toBe(false);
    expect(isESModule({})).toBe(false);

    const obj = {
      [Symbol.toStringTag]: 'Module',
    };

    expect(isESModule(obj)).toBe(true);
    expect(isESModule(Object.values(import.meta.globEager('./index.ts'))[0])).toBe(true);
  });

});
