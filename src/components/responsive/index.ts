import { computed, defineComponent, h } from 'vue-demi';
import { isBrowser } from '@/utils/evn';
import './index.scss';

/** 当前浏览器是否支持纵横比属性 */
const supportsAspectRatio = isBrowser && CSS.supports('aspect-ratio: 1');

const responsiveProps = {
  /** ( 宽度 / 高度 ) 计算的基本长宽比 */
  aspectRatio: {
    type: [String, Number],
    default: 1,
  },
};

export type ResponsiveProps = typeof responsiveProps;
export const SResponsive = defineComponent({
  name: 'SResponsive',
  props: responsiveProps,
  setup(props, { slots }) {
    /** 数字格式长宽比 */
    const computedAspectRatio = computed(() => Number(props.aspectRatio));
    /** 尺寸调整容器样式 */
    const sizerStyle = computed(() => {
      if (!supportsAspectRatio && computedAspectRatio.value) {
        return {
          paddingBottom: `${(1 / computedAspectRatio.value) * 100}%`,
        };
      }
      return undefined;
    });
    /** 内容容器样式 */
    const contentStyle = computed(() => {
      if (supportsAspectRatio && computedAspectRatio.value) {
        return {
          aspectRatio: `${computedAspectRatio.value}`,
        };
      }
      return undefined;
    });

    return () => {
      return h('div', { class: 's-responsive' }, [
        sizerStyle.value && h('div', {
          class: 's-responsive-sizer',
          style: sizerStyle.value,
        }),
        h('div', {
          class: 's-responsive-content',
          style: contentStyle.value,
        }, slots.default?.()),
      ]);
    };
  },
});
