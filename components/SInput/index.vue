<script>
  import { omit } from 'lodash';
  import VTextField from 'vuetify/lib/components/VTextField';
  import mixins from 'vuetify/lib/util/mixins';
  import Value from '../../mixins/value/index';
  import InputLabel from '../../mixins/input-label/index';

  export default mixins(Value, InputLabel).extend({
    inheritAttrs: false,
    props: {
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

      const labelSlot = this.genLabelScopedSlot();
      const prependSlot = this.genPrependScopedSlot();

      return create(VTextField, data, [].concat(
        labelSlot && create('template', { slot: 'label' }, [].concat(labelSlot)),
        prependSlot && create('template', { slot: 'prepend' }, [].concat(prependSlot))
      ));
    }
  });
</script>
