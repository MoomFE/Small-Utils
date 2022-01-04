/* eslint-disable import/no-extraneous-dependencies */


import { defineConfig } from 'vite';
import { resolve } from 'path';


export default defineConfig(({ mode }) => {
  /**
   * @type {import('vite').UserConfig}
   */
  const config = {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    build: {
      outDir: './',
      minify: false,
      lib: {
        entry: resolve(__dirname, './src/index.ts'),
        name: 'SmallUtils',
        formats: ['es', 'cjs', 'iife'],
        fileName: (format) => {
          if (format === 'es') return 'index.mjs';
          if (format === 'cjs') return 'index.cjs';
          if (format === 'iife') return 'index.iife.js';
        }
      }
    },
    // @ts-ignore
    test: {

    },
  };

  if (mode === 'life') {
    config.build.minify = true;
    config.build.emptyOutDir = false;
    config.build.lib.formats = ['iife'];
    config.build.lib.fileName = () => 'index.iife.min.js';
  }

  return config;
});
