import Vue from 'vue';
import { omit } from 'lodash';


export default Vue.extend({
  methods: {
    /** 根节点 VNode 选项 */
    getRootNodeData() {
      const listeners = omit(this.$listeners, ['input']);

      return {
        ref: 'input',
        attrs: {
          ...this.$attrs
        },
        props: {
          value: this.internalValue
        },
        on: {
          ...listeners,
          input: this.setValue
        }
      };
    },
    /** 根节点 children 选项 */
    getRootNodeChildren() {
      const slots = [];
      const labelSlot = this.genLabelScopedSlot();
      const prependSlot = this.genPrependScopedSlot();

      // 写入传入的其他插槽
      Object.entries(omit(this.$slots, ['label', 'prepend'])).forEach(([slot, node]) => {
        slots.push(this.$createElement('template', { slot }, node));
      });

      return slots.concat(
        labelSlot && this.$createElement('template', { slot: 'label' }, [].concat(labelSlot)),
        prependSlot && this.$createElement('template', { slot: 'prepend' }, [].concat(prependSlot))
      );
    },

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
