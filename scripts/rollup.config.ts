/* eslint-disable import/no-extraneous-dependencies */


import type { RollupOptions } from 'rollup';
import { resolve } from 'path';
import fs from 'fs-extra';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';


const configs: RollupOptions[] = [{
  input: 'src/index.ts',
  output: [
    {
      file: 'index.mjs',
      format: 'es'
    },
    {
      file: 'index.cjs',
      format: 'cjs'
    }
  ],
  plugins: [
    {
      name: 'alias',
      resolveId(importee) {
        if (importee.startsWith('@/')) {
          const path = resolve(__dirname, '../src', importee.slice(2));
          const paths = [
            resolve(path, 'index.ts'),
            resolve(path, 'index.js'),
            path
          ];

          for (const p of paths) {
            if (fs.pathExistsSync(p)) return p;
          }
        }
      }
    },
    esbuild({
      tsconfig: resolve(__dirname, '../tsconfig.json'),
    })
  ]
}];


configs.push({
  input: 'src/index.ts',
  output: [{
    file: 'types/index.d.ts',
    format: 'es'
  }],
  plugins: [
    dts()
  ]
});


export default configs;
