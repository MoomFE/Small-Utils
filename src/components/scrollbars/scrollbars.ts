import {
  h,
  ref, watchEffect,
  onMounted, onUnmounted,
  defineComponent
} from 'vue-demi';
import { templateRef } from '@vueuse/core';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import 'overlayscrollbars/js/OverlayScrollbars.min';


const scrollbarsProps = {
  /** 传递给 overlayscrollbars 的 options */
  options: Object,
  /** 传递给 overlayscrollbars 的 extensions */
  extensions: [String, Array, Object],
  /** 组件 padding 层样式类 */
  paddingClass: String,
  /** 组件 viewport 层样式类 */
  viewportClass: String,
  /** 组件 content 层样式类 */
  contentClass: String
};


const Scrollbars = defineComponent({
  name: 's-scrollbars',
  props: scrollbarsProps,
  setup(props) {
    const osInstace = ref();
    const el = templateRef<HTMLDivElement | null>('el');

    onMounted(() => {
      // @ts-ignore
      osInstace.value = window.OverlayScrollbars(
        el.value,
        props.options || {},
        props.extensions
      );
    });

    watchEffect(() => {
      // @ts-ignore
      if (window.OverlayScrollbars.valid(osInstace.value)) {
        osInstace.value.options(props.options);
      }
    });

    onUnmounted(() => {
      // @ts-ignore
      if (window.OverlayScrollbars.valid(osInstace.value)) {
        osInstace.value.destroy();
        osInstace.value = null;
      }
    });

    return {
      el,
      scroll: (...args: any[]) => osInstace.value?.scroll(...args),
      scrollStop: (...args: any[]) => osInstace.value?.scrollStop(...args),
    };
  },
  render() {
    return h('div', { ref: 'el', class: 'os-host s-scrollbars' }, [
      h('div', { class: 'os-resize-observer-host' }),
      h('div', { class: `os-padding ${this.paddingClass || ''}` }, [
        h('div', { class: `os-viewport ${this.viewportClass || ''}` }, [
          h('div', { class: `os-content ${this.contentClass || ''}` }, this.$slots.default)
        ])
      ]),
      h('div', { class: 'os-scrollbar os-scrollbar-horizontal' }, [
        h('div', { class: 'os-scrollbar-track' }, [
          h('div', { class: 'os-scrollbar-handle' })
        ])
      ]),
      h('div', { class: 'os-scrollbar os-scrollbar-vertical' }, [
        h('div', { class: 'os-scrollbar-track' }, [
          h('div', { class: 'os-scrollbar-handle' })
        ])
      ]),
      h('div', { class: 'os-scrollbar-corner' })
    ]);
  }
});


export default Scrollbars;
export type ScrollbarsProps = typeof scrollbarsProps;
