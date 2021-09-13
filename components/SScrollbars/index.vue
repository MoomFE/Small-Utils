<template>
  <div class="os-host s-scrollbars">
    <div class="os-resize-observer-host" />
    <div ref="padding" class="os-padding" :class="paddingClass">
      <div ref="viewport" class="os-viewport" :class="viewportClass">
        <div ref="content" class="os-content" :class="contentClass">
          <slot />
        </div>
      </div>
    </div>
    <div class="os-scrollbar os-scrollbar-horizontal">
      <div class="os-scrollbar-track">
        <div class="os-scrollbar-handle" />
      </div>
    </div>
    <div class="os-scrollbar os-scrollbar-vertical">
      <div class="os-scrollbar-track">
        <div class="os-scrollbar-handle" />
      </div>
    </div>
    <div class="os-scrollbar-corner" />
  </div>
</template>

<script>
  import 'overlayscrollbars/css/OverlayScrollbars.css';
  import 'overlayscrollbars';

  export default {
    name: 's-scrollbars',
    props: {
      /** 传递给 overlayscrollbars 的 options */
      options: {
        type: Object
      },
      /** 传递给 overlayscrollbars 的 extensions */
      extensions: {
        type: [String, Array, Object]
      },

      /** 组件 padding 层样式类 */
      paddingClass: { type: String },
      /** 组件 viewport 层样式类 */
      viewportClass: { type: String },
      /** 组件 content 层样式类 */
      contentClass: { type: String }
    },
    data: () => ({
      osInstace: null
    }),
    methods: {
      scroll(...args) {
        return this.osInstace.scroll(...args);
      },
      scrollStop(...args) {
        return this.osInstace.scrollStop(...args);
      }
    },
    mounted() {
      this.osInstace = window.OverlayScrollbars(
        this.$el,
        this.options || {},
        this.extensions
      );
    },
    beforeDestroy() {
      const osInstance = this.osInstace;

      if (window.OverlayScrollbars.valid(osInstance)) {
        osInstance.destroy();
        this.osInstace = null;
      }
    },
    watch: {
      options: {
        deep: true,
        handler(options) {
          const osInstance = this.osInstace;

          if (window.OverlayScrollbars.valid(osInstance)) {
            osInstance.options(options);
          }
        }
      }
    }
  };
</script>
