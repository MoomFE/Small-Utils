import Vue from 'vue';


export default Vue.extend({
  props: {
    /** 输入框标签 */
    label: { type: String, default: '' },
    /** 将输入框标签显示到输入框外部的前面 */
    labelPrepend: { type: Boolean, default: false }
  },
  methods: {
    /**
     * 生成输入框的 label 插槽
     */
    genLabelScopedSlot() {
      const labelSlot = this.$slots.label;

      if (labelSlot) {
        return labelSlot;
      }

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
    /**
     * 生成输入框的 prepend 插槽
     */
    genPrependScopedSlot() {
      const prependSlot = this.$slots.prepend;

      if (prependSlot) {
        return prependSlot;
      }

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
