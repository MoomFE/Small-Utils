
/**
 * 组件按需加载 ( unplugin-vue-components )
 * @returns
 */
export function SmallUtilsComponentsResolver() {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^S[A-Z]/)) {
        return {
          importName: name,
          path: `@moomfe/small-utils/components/${name}`,
        };
      }
    },
  };
}
