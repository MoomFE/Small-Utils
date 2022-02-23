import { h, computed, defineComponent } from 'vue-demi';
import './responsive.scss';


/** 当前浏览器是否支持纵横比属性 */
const supportsAspectRatio = CSS.supports('aspect-ratio: 1');


const responsiveProps = {
  /** ( 宽度 / 高度 ) 计算的基本长宽比 */
  aspectRatio: {
    type: [String, Number],
    default: 1
  },
  /** 尺寸调整容器样式类 */
  sizerClass: String,
  /** 内容容器样式类 */
  contentClass: String,
};


const Responsive = defineComponent({
  name: 's-responsive',
  props: responsiveProps,
  setup(props) {
    /** 数字格式长宽比 */
    const computedAspectRatio = computed(() => Number(props.aspectRatio));
    /** 尺寸调整容器样式 */
    const sizerStyle = computed(() => {
      if (!supportsAspectRatio && computedAspectRatio.value) {
        return {
          paddingBottom: `${(1 / computedAspectRatio.value) * 100}%`
        };
      }
      return undefined;
    });
    /** 内容容器样式 */
    const contentStyle = computed(() => {
      if (supportsAspectRatio && computedAspectRatio.value) {
        return {
          aspectRatio: `${computedAspectRatio.value}`
        };
      }
      return undefined;
    });

    return {
      computedAspectRatio,
      sizerStyle,
      contentStyle
    };
  },
  render() {
    const { sizerStyle } = this;

    return h('div', { class: 's-responsive' }, [
      sizerStyle && h('div', {
        class: ['s-responsive-sizer', this.sizerClass],
        style: sizerStyle
      }),
      h('div', {
        class: ['s-responsive-content', this.contentClass],
        style: this.contentStyle
      }, this.$slots.default)
    ]);
  }
});


export default Responsive;
export type ResponsiveProps = typeof responsiveProps;
