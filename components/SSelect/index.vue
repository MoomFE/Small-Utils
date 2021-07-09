<script>
  import VSelect from 'vuetify/lib/components/VSelect';
  import mixins from 'vuetify/lib/util/mixins';
  import Value from '../../mixins/value/index';
  import InputGenerate from '../../mixins/input-generate/index';


  export default mixins(Value, InputGenerate).extend({
    inheritAttrs: false,
    props: {
      /** 是否必填 */
      required: { type: Boolean, default: false },
      /** 输入框标签 */
      label: { type: String, default: '' },
      /** 将输入框标签显示到输入框外部的前面 */
      labelPrepend: { type: Boolean, default: false }
    },
    render(create) {
      return create(VSelect, this.getRootNodeData(), this.getRootNodeChildren());
    }
  });
</script>
