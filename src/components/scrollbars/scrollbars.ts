import {
  h,
  ref, watchEffect,
  onMounted, onUnmounted,
  defineComponent, renderSlot
} from 'vue-demi';
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
  setup(props, { slots, expose }) {
    const osInstace = ref();
    const el = ref<HTMLDivElement | null>(null);

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

    expose({
      scroll: (...args: any[]) => osInstace.value?.scroll(...args),
      scrollStop: (...args: any[]) => osInstace.value?.scrollStop(...args),
    });

    return () => {
      return h('div', { ref: el, class: 'os-host s-scrollbars' }, [
        h('div', { class: 'os-resize-observer-host' }, [
          h('div', { class: `os-padding ${props.paddingClass || ''}` }, [
            h('div', { class: `os-viewport ${props.viewportClass || ''}` }, [
              h('div', { class: `os-content ${props.contentClass || ''}` }, [
                renderSlot(slots, 'default')
              ])
            ])
          ])
        ])
      ]);
    };
  }
});


export default Scrollbars;
export type ScrollbarsProps = typeof scrollbarsProps;
