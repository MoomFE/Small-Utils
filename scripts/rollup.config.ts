/* eslint-disable import/no-extraneous-dependencies */


import type { RollupOptions } from 'rollup';
import { resolve } from 'path';
import fs from 'fs-extra';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';


const rollupAliasPlugin = {
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
};

const rollupEsbuildPlugin = esbuild({
  tsconfig: resolve(__dirname, '../tsconfig.json'),
});

const rollupDtsPlugin = dts();


const configs: RollupOptions[] = [];


['utils', 'validator'].forEach((name) => {
  // 打包代码
  configs.push({
    input: `src/${name}/index.ts`,
    output: [
      { file: `${name}/index.js`, format: 'es' },
      { file: `${name}/index.mjs`, format: 'es' },
      { file: `${name}/index.cjs`, format: 'cjs' }
    ],
    plugins: [
      rollupAliasPlugin,
      rollupEsbuildPlugin
    ]
  });
  // 打包声明文件
  configs.push({
    input: `src/${name}/index.ts`,
    output: [{
      file: `${name}/index.d.ts`,
      format: 'es'
    }],
    plugins: [
      rollupDtsPlugin
    ]
  });
});


export default configs;
