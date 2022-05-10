/* eslint-disable @typescript-eslint/brace-style */

import { resolve } from 'path';
import { accessSync, constants } from 'fs';
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
        const cssPath = resolve(__dirname, `../components/${name}/index.css`);
        let hasCss = false;

        try {
          accessSync(cssPath, constants.F_OK);
          hasCss = true;
        } catch (error) {}

        return {
          name,
          from: `@moomfe/small-utils/components/${name}`,
          sideEffects: hasCss ? [`@moomfe/small-utils/components/${name}/index.css`] : undefined,
        };
      }
    },
  };
}
