<template>
  <div class="os-host s-scrollbars">
    <div class="os-resize-observer-host" />
    <div class="os-padding">
      <div class="os-viewport">
        <div class="os-content">
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
      options: { type: Object },
      extensions: { type: [String, Array, Object] }
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
      options(options) {
        const osInstance = this.osInstace;

        if (window.OverlayScrollbars.valid(osInstance)) {
          osInstance.options(options);
        }
      }
    }
  };
</script>
