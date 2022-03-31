import { relative, resolve } from 'path';
import { build } from 'vite';
import { rollup } from 'rollup';
import { camelCase, upperFirst } from 'lodash-es';
import fs from 'fs-extra';
import dts from 'rollup-plugin-dts';

const rootPath = resolve(__dirname, '../');
const srcPath = resolve(rootPath, 'src');

const componentsModules = [];
const modules = [
  'utils',
  'validator',
  'components',
  'composables',
];

const viteResolveConfig = {
  alias: {
    '@': srcPath,
    '@@': rootPath,
  },
};
const viteOptimizeDeps = {
  exclude: ['vue-demi'],
};

const rollupDtsPlugin = dts();
const rollupExternal = [
  'vue-demi',
  '@vueuse/core',
  'overlayscrollbars/css/OverlayScrollbars.css',
  'axios',
  'css-render',
  ...modules.map(m => `@/${m}`),
];

const taskList = [];

// 工具方法， 验证器, 可组合式方法
modules.filter(name => name !== 'components').forEach(async(name) => {
  const input = resolve(srcPath, `${name}/index.ts`);

  // 打包代码
  taskList.push(() => build({
    resolve: viteResolveConfig,
    optimizeDeps: viteOptimizeDeps,
    build: {
      outDir: resolve(rootPath, name),
      lib: {
        entry: input,
        formats: ['es', 'cjs'],
        fileName: format => `index.${format === 'es' ? 'mjs' : format}`,
      },
      minify: false,
      rollupOptions: {
        external: rollupExternal.filter(e => e !== `@/${name}`),
      },
    },
  }));
  // 打包声明文件
  taskList.push(() => rollup({
    input,
    plugins: [rollupDtsPlugin],
    external: rollupExternal,
  }).then((bundle) => {
    bundle.write({
      file: resolve(rootPath, `${name}/index.d.ts`),
      format: 'es',
    });
  }));
});

// 所有组件
(async() => {
  const input = resolve(srcPath, 'components/index.ts');

  // 打包代码
  taskList.push(() => build({
    resolve: viteResolveConfig,
    optimizeDeps: viteOptimizeDeps,
    build: {
      outDir: resolve(rootPath, 'components'),
      lib: {
        entry: input,
        formats: ['es', 'cjs'],
        fileName: format => `index.${format === 'es' ? 'mjs' : format}`,
      },
      minify: false,
      rollupOptions: {
        external: rollupExternal,
      },
    },
  }));
  // 打包声明文件
  taskList.push(() => rollup({
    input,
    plugins: [rollupDtsPlugin],
    external: rollupExternal,
  }).then((bundle) => {
    bundle.write({
      file: resolve(rootPath, 'components/index.d.ts'),
      format: 'es',
    });
  }));
})();

// 单个组件
fs.readdirSync(resolve(srcPath, 'components')).forEach(async(name) => {
  const input = resolve(srcPath, 'components', name, 'index.ts');

  if (fs.pathExistsSync(input)) {
    const dirName = `S${upperFirst(camelCase(name))}`;

    // 保存组件名称
    componentsModules.push(`components/${dirName}`);
    // 打包代码
    taskList.push(() => build({
      resolve: viteResolveConfig,
      optimizeDeps: viteOptimizeDeps,
      build: {
        outDir: resolve(rootPath, 'components', dirName),
        lib: {
          entry: input,
          formats: ['es', 'cjs'],
          fileName: format => `index.${format === 'es' ? 'mjs' : format}`,
        },
        minify: false,
        rollupOptions: {
          external: rollupExternal,
        },
      },
    }));
    // 打包声明文件
    taskList.push(() => rollup({
      input,
      plugins: [rollupDtsPlugin],
      external: rollupExternal,
    }).then((bundle) => {
      bundle.write({
        file: resolve(rootPath, `components/S${upperFirst(camelCase(name))}/index.d.ts`),
        format: 'es',
      });
    }));
  }
});

(async() => {
  // 清空目录
  modules.forEach((name) => {
    fs.emptyDirSync(resolve(rootPath, name));
  });

  // 挨个执行打包
  for (const task of taskList)
    await task(); // eslint-disable-line no-await-in-loop

  // 重定向路径
  modules.concat(componentsModules).forEach((name) => {
    const moduleDir = resolve(rootPath, name);

    fs.readdirSync(moduleDir).forEach((file) => {
      if (!(file.endsWith('.mjs') || file.endsWith('.cjs'))) return;

      const filePath = resolve(moduleDir, file);
      let fileContent = fs.readFileSync(filePath, 'utf-8');

      modules.forEach((m) => {
        if (fileContent.includes(`@/${m}`)) {
          const aliasReg = new RegExp(`@/${m}`, 'g');
          const moduleRelativePath = relative(moduleDir, resolve(rootPath, m)).replace(/\\/g, '/');

          fileContent = fileContent.replace(aliasReg, moduleRelativePath);
        }
      });

      fs.writeFileSync(filePath, fileContent);
    });
  });
})();
