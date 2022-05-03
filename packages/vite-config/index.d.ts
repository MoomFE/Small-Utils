/**
 * 组件按需加载 ( unplugin-vue-components )
 */
declare function SmallUtilsComponentsResolver(): {
  type: string
  resolve: (name: string) => {
    importName: string
    path: string
    sideEffects: string[] | undefined
  } | undefined
};

/** vite 依赖预构建优化选项 */
declare const optimizeDepsInclude: string[];

export { SmallUtilsComponentsResolver, optimizeDepsInclude };
