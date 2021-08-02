  - 🌟 `s-select` 组件新增 `filterable` 选项以支持过滤功能
  - 💄 为 `s-input`, `s-select` 添加 `prepend` 插槽内容样式

# 1.5.6
  - 📅 2021-07-29
  - 🐞 修复 `s-scrollbars` 组件修改选项不生效的问题

# 1.5.5
  - 📅 2021-07-29
  - 💄 `s-scrollbars` 组件开放 `scroll()`, `scrollStop()` 方法

# 1.5.4
  - 📅 2021-07-21
  - 💄 为 `s-input` 组件添加 `.s-input` 类名
  - 💄 为 `s-select` 组件添加 `.s-select` 类名

# 1.5.3
  - 📅 2021-07-20
  - 🐞 修复将原生属性传给 `s-input`, `s-select` 组件时, 可能会不生效的问题

# 1.5.2
  - 📅 2021-07-20
  - 🐞 修复从父组件传值给 `s-input`, `s-select` 组件时, 组件会触发 `@input` 事件的问题

# 1.5.1
  - 📅 2021-07-20
  - 💄 `s-input` 组件开放 `focus()`, `blur()` 方法

# 1.5.0
  - 📅 2021-07-15
  - 🌟 新增 `s-select` 组件
  - 🌟 新增 `s-input` 组件
  - 🌟 新增 `isObject` 工具方法
  - 🌟 新增 `isReference` 工具方法
  - 🌟 新增 `isPrimitive` 工具方法
  - 🌟 新增 `isPromise` 工具方法

# 1.4.1
  - 📅 2021-07-08
  - 🐞 修复在使用 `s-scrollbars` 组件时, 报错说 overlayscrollbars 没有 default 导出的问题

# 1.4.0
  - 📅 2021-07-07
  - 🌟 新增 `s-form` 组件
  - 🌟 新增 `s-scrollbars` 组件

# 1.3.0
  - 📅 2021-07-05
  - 🌟 新增 `isFunction` 工具方法
  - 💄 优化 `isNumeric` 工具方法的逻辑

# 1.2.0
  - 📅 2021-07-01
  - 🌟 新增 `isNumeric` 工具方法

# 1.1.0
  - 📅 2021-07-01
  - 🌟 新增 `isPlainObject` 工具方法
  - 🌟 新增 `isNumber` 工具方法
  - 🌟 新增 `isString` 工具方法

# 1.0.0
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