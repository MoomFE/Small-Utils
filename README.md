# Small-Utils
前端自用代码片段


<br>



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
>   isNumber(NaN); // -> false
>   isNumber('666'); // -> false
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