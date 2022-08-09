import { resolveModule } from 'local-pkg';
import { type ComponentResolver } from 'unplugin-vue-components/index';

/**
 * 组件按需加载 ( unplugin-vue-components )
 * @returns
 */
export function SmallUtilsComponentsResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^S[A-Z]/)) {
        const cssPath = `@moomfe/small-utils/components/${name}/index.css`;
        const hasCss = resolveModule(cssPath);

        return {
          name,
          from: `@moomfe/small-utils/components/${name}`,
          sideEffects: hasCss ? [cssPath] : undefined,
        };
      }
    },
  };
}
