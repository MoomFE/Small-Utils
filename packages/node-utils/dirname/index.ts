import { fileURLToPath } from 'url';
import { dirname as pathDirname } from 'path';

/**
 * 在 Node.js 的 ES Modules 环境中获取 `__dirname` 的方法, 传入 `import.meta` 即可
 * @param meta `import.meta`
 * @example
 *
 * const __dirname = dirname(import.meta);
 */
export function dirname(meta: ImportMeta) {
  return pathDirname(fileURLToPath(meta.url ?? ''));
}
