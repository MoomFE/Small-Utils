<script>
  import { defineComponent, ref, onMounted } from '@vue/composition-api';
  import { useTimeoutFn } from '@vueuse/core';
  import isNumeric from '../../utils/isNumeric';


  export default defineComponent({
    name: 's-delay-render',
    props: {
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
    },
    setup(props) {
      /** 是否渲染 */
      const render = ref(false);

      // 实例挂载后开始计时, 计时结束后进行渲染
      onMounted(() => {
        const delayTime = props.delayTime;
        const interval = isNumeric(delayTime) ? delayTime : 0;

        useTimeoutFn(
          () => (render.value = true),
          interval
        );
      });

      return {
        render
      };
    },
    render(create) {
      return this.render ? create(this.tag, null, [].concat(this.$slots.default)) : null;
    }
  });
</script>
