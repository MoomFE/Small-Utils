import { expect, test } from 'vitest';
import { isESModule } from '@/utils';

test('isESModule: 基础测试', async() => {
  expect(isESModule({})).toBe(false);
  expect(isESModule(Object.values(import.meta.globEager('./index.ts'))[0])).toBe(true);
});
