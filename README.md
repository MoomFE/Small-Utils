# Small-Utils
前端自用代码片段


<br>
<br>


## Overview ( Styles )

``` js
  // Vuetify 的 Elevation ( 海拔 ) 的减淡效果
  //   - 和 Vuetify 一样, 有 25 个高度
  //   - 可以通过 `elevation-{n}--fade` 使用, 其中 `n` 是 0~24 之间与所需海拔对应的整数
  import '@moomfe/small-utils/styles/vuetify/elevations-fade.scss';

  // 在组件中使用
  <v-app-bar elevation="2--fade" />
  // 在 class 中使用
  <div class="elevation-2--fade" />
```


## License

Small-Utils is licensed under a [MIT License](./LICENSE).