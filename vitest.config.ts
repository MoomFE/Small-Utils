/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, mode === 'test-build' ? './' : './src'),
        '@@': __dirname,
      },
    },
    test: {
      environment: 'jsdom',
    },
  };
});
