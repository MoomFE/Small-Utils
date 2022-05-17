## [Unreleased]

## [v3.14.2]
  - 📅 2022-05-17
  - 💄 优化 `onceRun` 工具方法类型定义

## [v3.14.1]
  - 📅 2022-05-17
  - 💄 优化 `onceRun` 工具方法, 传入的函数未执行完成时, 重复执行时返回的 Promise 和首次一致

## [v3.14.0]
  - 📅 2022-05-17
  - 🌟 新增 `onceRun` 工具方法, 创建一个调用 `fn` 的函数, 执行 `fn` 的过程中, 如果函数再次被执行, 将会被忽略

## [v3.13.1]
  - 📅 2022-05-10
  - 💄 更新 `SmallUtilsComponentsResolver` 为最新的定义方式

## [v3.13.0]
  - 📅 2022-05-05
  - 🌟 新增 `toArray` 工具方法, 转换传入参数为数组

## [v3.12.2]
  - 📅 2022-05-03
  - 🐞 修复构建报错

## [v3.12.1]
  - 📅 2022-05-03
  - 🐞 修复 `isESModule` 工具方法传入不合法的值报错的问题

## [v3.12.0]
  - 📅 2022-04-26
  - 🌟 新增 `randomLowercaseLetter` 工具方法, 用于生成一个随机一个小写英文字母
  - 🌟 新增 `randomUppercaseLetter` 工具方法, 用于生成一个随机一个大写英文字母
  - 💄 优化 `uniqueKey` 工具方法类型定义

## [v3.11.0]
  - 📅 2022-04-25
  - 🌟 新增 `uniqueKey` 工具方法, 用于为数组中对象的某个字段生成一个唯一的 key

## [v3.10.0]
  - 📅 2022-04-22
  - 🌟 新增 `randomString` 工具方法, 用于生成一个随机的字符串, 可配置生成字符串的选项
  - 🌟 新增 `randomBoolean` 工具方法, 用于生成一个随机的 boolean 值

## [v3.9.7]
  - 📅 2022-04-19
  - 💄 统一组件 css 定义, 不再使用 css-render

## [v3.9.6]
  - 📅 2022-04-05
  - 🐞 修复未打包 `vite-config` 声明文件的问题

## [v3.9.5]
  - 📅 2022-04-02
  - 🐞 修复组件按需加载支持自动导入 css 样式报错

## [v3.9.4]
  - 📅 2022-04-02
  - 💄 组件按需加载支持自动导入 css 样式

## [v3.9.3]
  - 📅 2022-04-02
  - 💄 打包 `vite-config` 相关

## [v3.9.2]
  - 📅 2022-04-02
  - 🌟 统一导出 `vite` 依赖预构建优化选项和组件按需加载方法

## [v3.9.1]
  - 📅 2022-04-02
  - 🌟 新增给 `unplugin-vue-components` 使用的组件按需加载方法
  - 🌟 新增给 `vite` 使用的依赖预构建优化选项

## [v3.9.0]
  - 📅 2022-04-01
  - 🐞 修复在某些情况下, 使用 `@moomfe/small-utils/components/*` 的方式引用组件报错的问题
  - 🐞 修复在 SSR 打包的情况下, 组件报错的问题
  - ⚠️ 将引用的外部 css 打包到本地, 之后需要手动引入 css 样式

## [v3.8.1]
  - 📅 2022-03-31
  - 🐞 修复在某些情况下, 引用 `useAxios` 报错的问题

## [v3.8.0]
  - 📅 2022-03-31
  - 🌟 新增 `deepClone` 工具方法, 用于创建传入值的深拷贝
  - 🌟 新增 `deepMerge` 工具方法, 用于深拷贝合并一个或多个来源对象的属性到目标对象
  - 💄 `deepUnref` 方法支持解包数组

## [v3.7.3]
  - 📅 2022-03-25
  - 💄 打包 `esm` 模块时, 文件名改为 `.mjs`

## [v3.7.2]
  - 📅 2022-03-25
  - 💄 调整 `package.json` 文件

## [v3.7.1]
  - 📅 2022-03-25
  - 💄 优化 `leastRun` 方法, 判断异步函数的方式改为使用 `isPromise` 工具方法进行判断
  - 💄 优化 `useAxios` 组合式方法, 避免打包时生成的无用代码

## [v3.7.0]
  - 📅 2022-03-24
  - 🌟 新增 `isESModule` 工具方法, 用于判断传入参数是否是 ES Module

## [v3.6.0]
  - 📅 2022-03-20
  - 🌟 新增 `useCountdown` 组合式方法, 用于创建一个倒计时
  - ⚠️ 移除 `s-responsive` 组件的 `sizerClass` 和 `contentClass` 传参

## [v3.5.1]
  - 📅 2022-03-11
  - 🐞 修复组合式方法 `useAxios` 请求完成时 `isLoading`, `isFinished` 比 `onSuccess` 更早被触发的问题

## [v3.5.0]
  - 📅 2022-03-11
  - 🌟 新增 `randomNatural` 工具方法, 在传入的两个自然数之间随机生成一个自然数
  - 🌟 新增 `random` 工具方法, 在传入的两个数字之间随机生成一个数字
  - 🌟 新增 `randomLetter` 工具方法, 随机一个英文字母, 可以指定大小写
  - 💄 组合式方法 `useAxios` 传入 `immediate: true` 参数后, 立即发起请求, 而不是 `setTimeout` 后发起请求

## [v3.4.0]
  - 📅 2022-03-09
  - 🌟 新增 `defineArgs` 工具方法, 对传入方法进行参数定义, 返回一个新方法
  - 💄 优化 `isPlainObject` 方法的类型定义

## [v3.3.0]
  - 📅 2022-02-24
  - 🌟 新增 `s-responsive` 组件, 用于固定一个宽高比
  - 💄 调整代码目录结构
  - 🐞 修复 `s-delay-render` 组件在 Vue2 环境下无法渲染内容的问题
  - 🐞 修复 `s-scrollbars` 组件在 Vue3 环境下无法渲染内容的问题

## [v3.2.0]
  - 📅 2022-02-23
  - 🌟 新增 `useAxios` 组合式方法, 是对 `axios` 的封装
    - 支持使用 `createUseAxios` 创建一个自定义配置的 `axios` 封装实例
    - 提供 `get`, `delete`, `post`, `put`, `patch` 请求方式的别名
  - 💄 优化构建相关代码
  - 🐞 修复 `s-scrollbars` 组件在 Vue2 环境下无法渲染内容的问题

## [v3.2.0-beta.4]
  - 📅 2022-02-22
  - 💄 优化 TS, 使用 createUseAxios 创建出的请求方法自行扩展属性不报错

## [v3.2.0-beta.3]
  - 📅 2022-02-22
  - 💄 优化构建相关代码
  - 🐞 修复 `s-scrollbars` 组件在 Vue2 环境下无法使用的问题

## [v3.2.0-beta.2]
  - 📅 2022-02-21
  - 🐞 修复使用时, 包名错误引起的报错

## [v3.2.0-beta.1]
  - 📅 2022-02-21
  - 🐞 修复使用时, 包名错误引起的报错

## [v3.2.0-beta.0]
  - 📅 2022-02-21
  - 🌟 新增 useAxios 组合式方法
  - 💄 优化构建相关代码

## [v3.1.0]
  - 📅 2022-02-18
  - 🌟 新增 `deepUnref` 工具方法
  - 💄 移除不需要的类库, 防止安装时报错

## [v3.0.1]
  - 📅 2022-02-18
  - 💄 升级依赖类库
  - 💄 优化构建相关代码
  - 💄 配置 `package.json` 文件 `peerDependencies` 选项

## [v3.0.0]
  - 📅 2022-02-04
  - 🌟 项目使用 Typescript 重构
  - 🌟 组件同时支持 Vue2 和 Vue3, 特殊说明除外
  - 🌟 新增 delay 工具方法, 返回一个延迟指定时间的 Promise
  - 🌟 新增 leastRun 工具方法, 运行函数并且保证最少执行指定 ms 的时间
  - ⚠️ 保留 `s-scrollbars` 和 `s-delay-render` 组件, 移除 `s-date-picker`, `s-time-picker`, `s-form`, `s-input`, `s-select`, `s-textarea` 组件


## [v2.3.2]
  - 📅 2021-09-26
  - 💄 为 `s-scrollbars` 组件 padding, content 层添加 ref 引用
  - 💄 为 `s-scrollbars` 组件新增 `paddingClass`, `viewportClass`, `contentClass` 属性

## [v2.3.1]
  - 📅 2021-09-08
  - 🐞 修复使用 `@moomfe/small-utils/validator` 方式导入验证器报错的问题

## [v2.3.0]
  - 📅 2021-08-27
  - 🌟 新增 `isCitizenID` 18 位身份证号码正则验证器
  - 🌟 新增 `isEmail` 电子邮件地址正则验证器
  - 🌟 新增 `s-date-picker` 组件 ( 暂时不建议使用, 在当前版本也不会添加到文档中 )
  - 🌟 新增 `s-time-picker` 组件 ( 暂时不建议使用, 在当前版本也不会添加到文档中 )
  - 🐞 修复 `s-select` 选项值为 0 时, 无法选中的问题
  - ⚠️ 修复拼写错误 `isMumbers` -> `isNumbers`,  `hasMumbers` -> `hasNumbers` (\*/ω＼\*)

## [v2.2.0]
  - 📅 2021-08-04
  - 🌟 新增 `s-delay-render` 组件

## [v2.1.0]
  - 📅 2021-08-04
  - 🌟 新增 `hasMumbers`, `isMumbers` 数字正则验证器
  - 🌟 新增 `isMobile`, `isCompleteMobile` 移动电话号码正则验证器
  - 💄 支持在一个文件中返回所有验证器
  - 💄 支持在一个文件中返回所有工具方法
  - 💄 支持在一个文件中返回所有组件
  - 💄 为 `s-scrollbars` 组件 viewport 层添加 ref 引用
  - 🐞 修复 `s-textarea` 组件的内容会和 label 重叠的问题
  - 🐞 修复 `s-textarea` 组件拖拽大小无效的问题

## [v2.0.0]
  - 📅 2021-08-02
  - 🌟 新增 `s-textarea` 组件
  - 🌟 `s-select` 组件新增 `filterable` 选项以支持过滤条目功能
  - 🌟 `s-select` 组件新增 `creatable` 选项以支持新建条目功能
  - 💄 为 `s-input`, `s-select`, `s-textarea` 添加 `prepend` 插槽内容样式
  - ⚠️ 组件新增依赖类库 `@vue/composition-api`, `VueUse`

## [v1.7.0]
  - 📅 2021-08-04
  - 🌟 新增 `hasMumbers`, `isMumbers` 数字正则验证器
  - 🌟 新增 `isMobile`, `isCompleteMobile` 移动电话号码正则验证器
  - 💄 支持在一个文件中返回所有验证器
  - 💄 支持在一个文件中返回所有工具方法
  - 💄 支持在一个文件中返回所有组件
  - 💄 为 `s-scrollbars` 组件 viewport 层添加 ref 引用

## [v1.6.0]
  - 📅 2021-08-02
  - 🌟 `s-select` 组件新增 `filterable` 选项以支持过滤条目功能
  - 🌟 `s-select` 组件新增 `creatable` 选项以支持新建条目功能
  - 💄 为 `s-input`, `s-select` 添加 `prepend` 插槽内容样式

## [v1.5.6]
  - 📅 2021-07-29
  - 🐞 修复 `s-scrollbars` 组件修改选项不生效的问题

## [v1.5.5]
  - 📅 2021-07-29
  - 💄 `s-scrollbars` 组件开放 `scroll()`, `scrollStop()` 方法

## [v1.5.4]
  - 📅 2021-07-21
  - 💄 为 `s-input` 组件添加 `.s-input` 类名
  - 💄 为 `s-select` 组件添加 `.s-select` 类名

## [v1.5.3]
  - 📅 2021-07-20
  - 🐞 修复将原生属性传给 `s-input`, `s-select` 组件时, 可能会不生效的问题

## [v1.5.2]
  - 📅 2021-07-20
  - 🐞 修复从父组件传值给 `s-input`, `s-select` 组件时, 组件会触发 `@input` 事件的问题

## [v1.5.1]
  - 📅 2021-07-20
  - 💄 `s-input` 组件开放 `focus()`, `blur()` 方法

## [v1.5.0]
  - 📅 2021-07-15
  - 🌟 新增 `s-select` 组件
  - 🌟 新增 `s-input` 组件
  - 🌟 新增 `isObject` 工具方法
  - 🌟 新增 `isReference` 工具方法
  - 🌟 新增 `isPrimitive` 工具方法
  - 🌟 新增 `isPromise` 工具方法

## [v1.4.1]
  - 📅 2021-07-08
  - 🐞 修复在使用 `s-scrollbars` 组件时, 报错说 overlayscrollbars 没有 default 导出的问题

## [v1.4.0]
  - 📅 2021-07-07
  - 🌟 新增 `s-form` 组件
  - 🌟 新增 `s-scrollbars` 组件

## [v1.3.0]
  - 📅 2021-07-05
  - 🌟 新增 `isFunction` 工具方法
  - 💄 优化 `isNumeric` 工具方法的逻辑

## [v1.2.0]
  - 📅 2021-07-01
  - 🌟 新增 `isNumeric` 工具方法

## [v1.1.0]
  - 📅 2021-07-01
  - 🌟 新增 `isPlainObject` 工具方法
  - 🌟 新增 `isNumber` 工具方法
  - 🌟 新增 `isString` 工具方法

## [v1.0.0]
  - 📅 2021-04-22
  - 🌟 Vuetify 的 `Elevation` ( 海拔 ) 的减淡效果

<br>
<hr>
<br>

版本规范

1. 主版本号: 破坏性更新和新特性
2. 次版本号: 向下兼容的功能新增、功能更改、功能优化
3. 修订版本号: 向下兼容的问题修正、一般功能优化

<br>
<hr>
<br>

CHANGELOG 图标规范

- 🌟: 功能新增<br>
- 💄: 功能更改、功能优化<br>
- ⚠️: 与上一版本可能不兼容的功能更改<br>
- 🐞: 问题修正<br>
- 📅: 版本发布日期

<br>
<hr>
<br>

[Unreleased]: https://github.com/MoomFE/Small-Utils/compare/v3.14.2...HEAD
[v3.14.2]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.14.2
[v3.14.1]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.14.1
[v3.14.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.14.0
[v3.13.1]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.13.1
[v3.13.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.13.0
[v3.12.2]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.12.2
[v3.12.1]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.12.1
[v3.12.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.12.0
[v3.11.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.11.0
[v3.10.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.10.0
[v3.9.7]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.9.7
[v3.9.6]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.9.6
[v3.9.5]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.9.5
[v3.9.4]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.9.4
[v3.9.3]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.9.3
[v3.9.2]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.9.2
[v3.9.1]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.9.1
[v3.9.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.9.0
[v3.8.1]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.8.1
[v3.8.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.8.0
[v3.7.3]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.7.3
[v3.7.2]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.7.2
[v3.7.1]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.7.1
[v3.7.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.7.0
[v3.6.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.6.0
[v3.5.1]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.5.1
[v3.5.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.5.0
[v3.4.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.4.0
[v3.3.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.3.0
[v3.2.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.2.0
[v3.2.0-beta.4]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.2.0-beta.4
[v3.2.0-beta.3]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.2.0-beta.3
[v3.2.0-beta.2]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.2.0-beta.2
[v3.2.0-beta.1]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.2.0-beta.1
[v3.2.0-beta.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.2.0-beta.0
[v3.1.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.1.0
[v3.0.1]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.0.1
[v3.0.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v3.0.0
[v2.3.2]: https://github.com/MoomFE/Small-Utils/releases/tag/v2.3.2
[v2.3.1]: https://github.com/MoomFE/Small-Utils/releases/tag/v2.3.1
[v2.3.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v2.3.0
[v2.2.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v2.2.0
[v2.1.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v2.1.0
[v2.0.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v2.0.0
[v1.7.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.7.0
[v1.6.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.6.0
[v1.5.6]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.5.6
[v1.5.5]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.5.5
[v1.5.4]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.5.4
[v1.5.3]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.5.3
[v1.5.2]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.5.2
[v1.5.1]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.5.1
[v1.5.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.5.0
[v1.4.1]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.4.1
[v1.4.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.4.0
[v1.3.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.3.0
[v1.2.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.2.0
[v1.1.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.1.0
[v1.0.0]: https://github.com/MoomFE/Small-Utils/releases/tag/v1.0.0