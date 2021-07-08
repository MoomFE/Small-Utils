<script>
  import VTextField from 'vuetify/lib/components/VTextField';
  import { omit } from 'lodash';
  import Value from '../../mixins/value/index';


  export default Value.extend({
    inheritAttrs: false,
    props: {
      /** 输入框标签 */
      label: { type: String, default: '' },
      /** 将输入框标签显示到输入框外部的前面 */
      labelPrepend: { type: Boolean, default: false },
      /** 是否必填 */
      required: { type: Boolean, default: false }
    },
    render(create) {
      const listeners = omit(this.$listeners, ['input']);
      const data = {
        ref: 'input',
        props: {
          ...this.$attrs,
          value: this.currentValue
        },
        on: {
          ...listeners,
          input: this.setValue
        }
      };

      const labelSlot = this.$slots.label || this.genLabelScopedSlot();
      const prependSlot = this.$slots.prepend || this.genPrependScopedSlot();

      return create(VTextField, data, [].concat(
        labelSlot && create('template', { slot: 'label' }, [].concat(labelSlot)),
        prependSlot && create('template', { slot: 'prepend' }, [].concat(prependSlot))
      ));
    },
    methods: {
      /** 生成输入框的 label 插槽 */
      genLabelScopedSlot() {
        const label = this.label;

        // 未定义标签或者设定了标签前置
        if (!label || this.labelPrepend) {
          return null;
        }

        return this.$createElement('div', [
          this.required && this.$createElement('span', { staticClass: 'red--text mr-1' }, ['*']),
          label
        ]);
      },
      /** 生成输入框的 prepend 插槽 */
      genPrependScopedSlot() {
        const content = this.labelPrepend ? this.label : null;

        if (!content) {
          return null;
        }

        return this.$createElement('div', { staticClass: 'text-truncate' }, [
          this.required && this.$createElement('span', { staticClass: 'red--text mr-1' }, ['*']),
          content
        ]);
      }
    }
  });
</script>
