import { dirname, resolve } from 'path';
import { build } from 'vite';
import { rollup } from 'rollup';
import { emptyDirSync, outputFileSync, readFileSync, renameSync } from 'fs-extra';
import { camelCase, upperFirst } from 'lodash-es';
import { readPackage } from 'read-pkg';
import { writePackage } from 'write-pkg';
import fg from 'fast-glob';
import dts from 'rollup-plugin-dts';

/** 项目根目录 */
const rootPath = resolve(__dirname, '../');
/** 代码根目录 */
const srcPath = resolve(rootPath, 'src');

/** 所有需要打包的模块 */
const modules = [
  'utils',
  'validator',
  'components',
  'composables',
];

/** 外部依赖项 */
const rollupExternal = [
  'vue-demi',
  '@vueuse/core',
  'axios',
  'css-render',
  'fs',
  'path',
  ...modules.map(name => `@/${name}`),
];

/** 打包任务列表 */
const taskList = [];

// 打包所有模块
modules.forEach((name) => {
  taskList.push({
    name,
    input: resolve(srcPath, name, 'index.ts'),
    output: resolve(rootPath, name),
  });
});

// 打包所有单个组件
fg.sync(['components/*/index.ts'], { cwd: srcPath }).forEach((path) => {
  const [, name] = path.split('/');

  taskList.push({
    name: 'components',
    input: resolve(srcPath, path),
    output: resolve(rootPath, 'components', `S${upperFirst(camelCase(name))}`),
  });
});

/** 打包单个任务 */
async function buildTask(task) {
  // 打包代码
  await build({
    resolve: {
      alias: { '@': srcPath, '@@': rootPath },
    },
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
    build: {
      outDir: task.output,
      lib: {
        entry: task.input,
        formats: ['es', 'cjs'],
        fileName: format => `index.${format === 'es' ? 'mjs' : format}`,
      },
      minify: false,
      rollupOptions: {
        external: rollupExternal.filter(e => e !== `@/${task.name}`),
      },
    },
  });
  // 打包声明文件
  task.nodts || await rollup({
    input: task.input,
    external: rollupExternal.concat('overlayscrollbars/css/OverlayScrollbars.css'),
    plugins: [
      dts({
        compilerOptions: { preserveSymlinks: false },
      }),
    ],
  }).then((bundle) => {
    bundle.write({
      file: resolve(task.output, 'index.d.ts'),
      format: 'es',
    });
  });
}

(async() => {
  // 清空输出目录
  modules.forEach((name) => {
    emptyDirSync(resolve(rootPath, name));
  });

  // 挨个执行打包
  for (const task of taskList)
    await buildTask(task);

  // 根据打包后的组件目录, 输出 vite 依赖预构建优化选项
  {
    const components = fg.sync(['components/*'], { cwd: rootPath, onlyDirectories: true });
    const paths = components.map(path => `'@moomfe/small-utils/${path}'`);
    const configPath = resolve(srcPath, 'vite-config/config.ts');
    const configContent = `\n/** vite 依赖预构建优化选项 */\nexport const optimizeDepsInclude = [\n  ${paths.join(',\n  ')},\n];\n`;

    outputFileSync(configPath, configContent);
  }

  // 打包 vite-config 相关
  await buildTask({
    name: 'vite-config',
    input: resolve(srcPath, 'vite-config', 'index.ts'),
    output: resolve(rootPath, 'vite-config'),
    nodts: true,
  });

  // 重定向路径
  fg.sync([`(${modules.join('|')})/**/index.{cjs,mjs}`], { cwd: rootPath }).forEach((path) => {
    const filePath = resolve(rootPath, path);
    const content = modules.reduce(
      (content, name) => {
        const aliasReg = new RegExp(`@/${name}`, 'g');
        const aliasValue = `@moomfe/small-utils${name === 'utils' ? '' : `/${name}`}`;
        return content.replace(aliasReg, aliasValue);
      },
      readFileSync(filePath, 'utf-8'),
    );

    outputFileSync(filePath, content);
  });

  // 向 package.json 中写入组件相关信息
  {
    // 读取 package.json
    const packageJson = await readPackage({ cwd: rootPath, normalize: false });

    // 移除上次写入的组件相关信息
    Object.keys(packageJson.exports).forEach((key) => {
      if (key.startsWith('./components/')) delete packageJson.exports[key];
    });

    // 写入最新的组件相关信息
    fg.sync(['components/*/*'], { cwd: rootPath }).forEach((path) => {
      const [components, name] = path.split('/');
      const key = `./${components}/${name}`;
      const info = packageJson.exports[key] || (packageJson.exports[key] = {});

      if (path.endsWith('.mjs')) info.import = `./${path}`;
      if (path.endsWith('.cjs')) info.require = `./${path}`;
      if (path.endsWith('.ts')) info.types = `./${path}`;
    });

    // 写入 package.json
    await writePackage(
      resolve(rootPath, 'package.json'), // @ts-expect-error xxx
      packageJson,
      { normalize: false, indent: '  ' },
    );
  }

  // 将打包出的 css 文件更名
  fg.sync(['components/**/style.css'], { cwd: rootPath }).forEach((path) => {
    const filePath = resolve(rootPath, path);

    renameSync(
      filePath,
      resolve(dirname(filePath), 'index.css'),
    );
  });
})();
