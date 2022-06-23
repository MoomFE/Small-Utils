/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '@moomfe/small-utils': resolve(__dirname, mode === 'test-build' ? './' : './packages'),
        '@': resolve(__dirname, mode === 'test-build' ? './dist' : './packages'),
        '@@': __dirname,
      },
    },
    test: {
      environment: 'jsdom',
    },
  };
});
