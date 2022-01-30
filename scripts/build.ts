/* eslint-disable import/no-extraneous-dependencies */


import { resolve } from 'path';
import { build } from 'vite';
import { rollup } from 'rollup';
import fs from 'fs-extra';
import dts from 'rollup-plugin-dts';


const rootPath = resolve(__dirname, '../');
const srcPath = resolve(rootPath, 'src');


const viteResolveConfig = {
  alias: {
    '@': srcPath,
    '@@': rootPath
  }
};


const rollupDtsPlugin = dts();
const rollupExternal = [
  'vue-demi',
  'overlayscrollbars/css/OverlayScrollbars.css'
];


// 工具方法， 验证器
['utils', 'validator'].forEach(async (name) => {
  const input = resolve(srcPath, `${name}/index.ts`);

  // 打包代码
  await build({
    resolve: viteResolveConfig,
    build: {
      outDir: resolve(rootPath, name),
      lib: {
        entry: input,
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : format}`,
      },
      minify: false,
      rollupOptions: {
        external: rollupExternal
      }
    }
  });
  // 打包声明文件
  await rollup({
    input,
    plugins: [rollupDtsPlugin],
    external: rollupExternal
  }).then((bundle) => {
    bundle.write({
      file: resolve(rootPath, `${name}/index.d.ts`),
      format: 'es'
    });
  });
});
