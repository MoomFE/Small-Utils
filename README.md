# Small-Utils
前端自用代码片段


<br>



## Overview ( Vue Components )
如要使用组件,<br>
则默认您已拥有以下环境及类库: `Vite2`, `Vue2`, `Vuetify`, `lodash`

> ### s-scrollbars 滚动条
>   - 类库 [overlayscrollbars](https://github.com/KingSora/OverlayScrollbars) 的上层封装, 相关代码来自 [overlayscrollbars-vue](https://github.com/KingSora/OverlayScrollbars/tree/master/packages/overlayscrollbars-vue)
>   - 目前没有做任何处理

> ### s-form 表单
>   - `Vuetify` 的 `v-form` 组件的上层封装
>   - W3C 标准中有此[规定](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2): 当一个 form 元素中只有一个输入框时, 在该输入框中按下回车应提交该表单
>   - 该组件的目的是阻止该默认行为

> ### s-input 输入框
>   - `Vuetify` 的 `v-text-field` 组件的上层封装
>   - 提供了更多可选属性参数



## Overview ( Utils )

> ### isPlainObject
>   - 判断传入对象是否是纯粹的对象
> ```js
>   import isPlainObject from '@moomfe/small-utils/utils/isPlainObject';
>
>   isPlainObject({}); // -> true
>   isPlainObject(Object.create(null)); // -> true
>   isPlainObject([]); // -> false
> ```

> ### isNumber
>   - 判断传入对象是否是 Number 类型, 并且不为 NaN
> ```js
>   import isNumber from '@moomfe/small-utils/utils/isNumber';
>
>   isNumber(666); // -> true
>   isNumber(new Number(666)); // -> true
>   isNumber(NaN); // -> false
>   isNumber('666'); // -> false
> ```

> ### isNumeric
>   - 判断传入参数是否是数字, 支持判断数字字符串
> ```js
>   import isNumeric from '@moomfe/small-utils/utils/isNumeric';
>
>   isNumeric(666); // -> true
>   isNumeric('666'); // -> true
>   isNumeric(new Number(666)); // -> true
>   isNumeric(NaN); // -> false
> ```

> ### isString
>   - 判断传入对象是否是 String 类型
> ```js
>   import isString from '@moomfe/small-utils/utils/isString';
>
>   isString('666'); // -> true
>   isString(new String('666')); // -> true
>   isString(666); // -> false
> ```

> ### isFunction
>   - 判断传入参数是否是 Function 类型
> ```js
>   import isFunction from '@moomfe/small-utils/utils/isFunction';
>
>   isFunction(() => {}); // -> true
>   isFunction(function() {}); // -> true
>   isFunction(666); // -> false
> ```



## Overview ( Styles )

> ### Vuetify 的 Elevation ( 海拔 ) 的减淡效果样式
>  - 和 Vuetify 一样, 有 25 个高度
>  - 可以通过 `elevation-{n}--fade` 使用, 其中 `n` 是 0~24 之间与所需海拔对应的整数
> ```js
>   import '@moomfe/small-utils/styles/vuetify/elevations-fade.scss';
>
>   // 在组件中使用
>   <v-app-bar elevation="2--fade" />
>   // 在 class 中使用
>   <div class="elevation-2--fade" />
> ```



## License

Small-Utils is licensed under a [MIT License](./LICENSE).