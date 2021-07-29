<script>
  /* eslint-disable brace-style */


  import { defineComponent, ref, h as create } from '@vue/composition-api';
  import { templateRef, useResizeObserver } from '@vueuse/core';
  import VTextField from 'vuetify/lib/components/VTextField/VTextField';
  import VTextarea from 'vuetify/lib/components/VTextarea/VTextarea';
  import SScrollbars from '../../SScrollbars/index.vue';


  const VTextareaOptions = VTextarea.options;


  export default defineComponent({
    name: VTextareaOptions.name,
    props: VTextareaOptions.props,
    setup(props) {
      const input = templateRef('input');
      const inputWrap = templateRef('input-wrap');

      /** 滚动条容器高度 */
      const scrollbarsHeight = ref('auto');
      /** 滚动条容器最小高度 */
      let scrollbarsMinHeight = parseInt(props.rows, 10) * parseFloat(props.rowHeight);

      // 监听文本域, 发生变动时, 调整文本域和滚动条容器的高度
      useResizeObserver(inputWrap, () => {
        const el = input.value;
        const elWrap = inputWrap.value;

        // 启用了自动增长高度时
        // 文本域高度随着内容调整
        // 滚动条容器高度随着文本域占用高度调整
        if (props.autoGrow) {
          el.style.height = '0';
          el.style.height = `${Math.max(scrollbarsMinHeight, el.scrollHeight)}px`;
          scrollbarsHeight.value = `${Math.max(scrollbarsMinHeight, elWrap.scrollHeight)}px`;
        }
        // 未启用自动增长高度时
        // 文本域高度随着内容调整
        // 滚动条容器高度默认使用滚动条容器最小高度
        else {
          // 首次计算时, 如果文本域占用高度大于滚动条容器最小高度, 那么将滚动条容器最小高度修改为文本域占用高度
          if (!el.style.height && (elWrap.scrollHeight > scrollbarsMinHeight)) {
            scrollbarsMinHeight = elWrap.scrollHeight;
          }

          el.style.height = `${el.scrollHeight}px`;
          scrollbarsHeight.value = `${scrollbarsMinHeight}px`;
        }
      });

      return {
        scrollbarsHeight
      };
    },
    computed: {
      classes() {
        return Object.assign({}, VTextareaOptions.computed.classes.call(this), {
          'v-textarea--no-resize': true
        });
      },
      noResizeHandle: VTextareaOptions.computed.noResizeHandle
    },
    methods: {
      genInput() {
        const input = VTextareaOptions.methods.genInput.call(this);
        const data = {
          ref: 'scrollbars',
          props: {
            options: {
              resize: this.noResizeHandle ? 'n' : 'v'
            }
          },
          staticStyle: {
            'align-self': 'stretch',
            'width': '100%',
            'height': this.scrollbarsHeight
          }
        };

        return create(SScrollbars, data, [
          create('div', { ref: 'input-wrap', staticClass: 'd-flex' }, [input])
        ]);
      }
    },
    mixins: [
      VTextField
    ]
  });
</script>
