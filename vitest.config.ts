/* eslint-disable import/no-extraneous-dependencies */


import { defineConfig } from 'vite';
import { resolve } from 'path';


export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@@': __dirname,
    }
  },
  // @ts-ignore
  test: {

  },
});
