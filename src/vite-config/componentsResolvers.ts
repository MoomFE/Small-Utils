/* eslint-disable @typescript-eslint/brace-style */

import { resolve } from 'path';
import { accessSync, constants } from 'fs';

/**
 * 组件按需加载 ( unplugin-vue-components )
 * @returns
 */
export function SmallUtilsComponentsResolver() {
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
          importName: name,
          path: `@moomfe/small-utils/components/${name}`,
          sideEffects: hasCss ? [cssPath] : undefined,
        };
      }
    },
  };
}
