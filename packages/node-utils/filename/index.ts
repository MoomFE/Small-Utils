import { fileURLToPath } from 'url';

/**
 * 在 Node.js 的 ES Modules 环境中获取 `__filename` 的方法, 传入 `import.meta` 即可
 * @param meta `import.meta`
 * @example
 *
 * const __filename = filename(import.meta);
 */
export function filename(meta: ImportMeta) {
  return fileURLToPath(meta.url ?? '');
}
