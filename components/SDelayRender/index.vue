<script>
  import { defineComponent } from '@vue/composition-api';
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
    data: () => ({
      /** 是否渲染 */
      render: false
    }),
    render(create) {
      return this.render ? create(this.tag, null, [].concat(this.$slots.default)) : null;
    },
    mounted() {
      const delayTime = this.delayTime;

      useTimeoutFn(
        () => (this.render = true),
        isNumeric(delayTime) ? delayTime : 0
      );
    }
  });
</script>
