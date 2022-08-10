import { describe, expect, test } from 'vitest';
import { normalizePath } from 'vite';
import { filename } from '@/node-utils';

describe('filename', () => {

  test('测试路径是否正确', () => {
    expect(normalizePath(filename(import.meta))).toMatch(/\/packages\/node-utils\/filename\/index.test.ts$/);
  });

  test('路径不包含 file:', () => {
    expect(filename(import.meta)).not.toMatch(/^file:/);
  });

});
