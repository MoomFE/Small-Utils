/* eslint-disable import/no-extraneous-dependencies */


import type { Plugin } from 'rollup';
import { resolve } from 'path';
import { build } from 'vite';
import { rollup } from 'rollup';
import { upperFirst, camelCase } from 'lodash-es';
import fs from 'fs-extra';
import dts from 'rollup-plugin-dts';


const rootPath = resolve(__dirname, '../');
const srcPath = resolve(rootPath, 'src');


const viteResolveConfig = {
  alias: {
    '@@': rootPath
  }
};



const rollupDtsPlugin = dts();
const rollupExternalizeDependencyPlugin: Plugin = {
  name: 'externalize-dependency',
  resolveId(id) {
    if (id.startsWith('@/')) {
      return {
        id: id.replace('@/', '@moomfe/small-utils/'),
        external: true
      }
    }
    return null;
  }
};
const rollupExternal = [
  'vue-demi',
  '@vueuse/core',
  'overlayscrollbars/css/OverlayScrollbars.css',
  'axios'
];


const taskList = [];


// 工具方法， 验证器, 可组合式方法
['utils', 'validator', 'composables'].forEach(async (name) => {
  const input = resolve(srcPath, `${name}/index.ts`);

  // 打包代码
  taskList.push(() => build({
    resolve: viteResolveConfig,
    plugins: [rollupExternalizeDependencyPlugin],
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
  }));
  // 打包声明文件
  taskList.push(() => rollup({
    input,
    plugins: [rollupDtsPlugin],
    external: rollupExternal
  }).then((bundle) => {
    bundle.write({
      file: resolve(rootPath, `${name}/index.d.ts`),
      format: 'es'
    });
  }));
});

// 所有组件
(async () => {
  const input = resolve(srcPath, 'components/index.ts');

  // 打包代码
  taskList.push(() => build({
    resolve: viteResolveConfig,
    plugins: [rollupExternalizeDependencyPlugin],
    build: {
      outDir: resolve(rootPath, 'components'),
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
  }));
  // 打包声明文件
  taskList.push(() => rollup({
    input,
    plugins: [rollupDtsPlugin],
    external: rollupExternal
  }).then((bundle) => {
    bundle.write({
      file: resolve(rootPath, 'components/index.d.ts'),
      format: 'es'
    });
  }));
})();

// 单个组件
fs.readdirSync(resolve(srcPath, 'components')).forEach(async (name) => {
  const input = resolve(srcPath, 'components', name, 'index.ts');

  if (fs.pathExistsSync(input)) {
    // 打包代码
    taskList.push(() => build({
      resolve: viteResolveConfig,
      plugins: [rollupExternalizeDependencyPlugin],
      build: {
        outDir: resolve(rootPath, 'components', `S${upperFirst(camelCase(name))}`),
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
    }));
    // 打包声明文件
    taskList.push(() => rollup({
      input,
      plugins: [rollupDtsPlugin],
      external: rollupExternal
    }).then((bundle) => {
      bundle.write({
        file: resolve(rootPath, `components/S${upperFirst(camelCase(name))}/index.d.ts`),
        format: 'es'
      });
    }));
  }
});


(async () => {
  // 清空目录
  ['utils', 'validator', 'components'].forEach((name) => {
    fs.emptyDirSync(resolve(rootPath, name));
  });

  // 挨个执行打包
  for (const task of taskList) {
    await task(); // eslint-disable-line no-await-in-loop
  }
})();
