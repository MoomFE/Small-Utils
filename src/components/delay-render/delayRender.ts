import { h, ref, onMounted, defineComponent, renderSlot } from 'vue-demi';
import { useTimeoutFn } from '@vueuse/core';
import { isNumeric } from '@/utils';


const delayRenderProps = {
  /** 标签 */
  tag: {
    type: String,
    default: 'span'
  },
  /** 延迟时间 */
  delayTime: {
    type: [Number, String],
    default: 0
  }
};


const DelayRender = defineComponent({
  name: 's-delay-render',
  props: delayRenderProps,
  setup(props, { slots }) {
    /** 是否渲染 */
    const render = ref(false);

    onMounted(() => {
      const delayTime = props.delayTime;
      const interval = isNumeric(delayTime) ? +delayTime : 0;

      useTimeoutFn(
        () => (render.value = true),
        interval
      );
    });

    return () => {
      return render.value
        ? h(props.tag, [renderSlot(slots, 'default')])
        : null;
    };
  }
});


export default DelayRender;
export const DelayRenderProps = typeof delayRenderProps;
