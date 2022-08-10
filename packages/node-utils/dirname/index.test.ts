import { describe, expect, test } from 'vitest';
import { normalizePath } from 'vite';
import { dirname } from '@/node-utils';

describe('dirname', () => {

  test('测试路径是否正确', () => {
    expect(normalizePath(dirname(import.meta))).toMatch(/\/packages\/node-utils\/dirname$/);
  });

  test('路径不包含 file:', () => {
    expect(dirname(import.meta)).not.toMatch(/^file:/);
  });

});
