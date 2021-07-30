<script>
  import mixins from 'vuetify/lib/util/mixins';
  import Textarea from './components/Textarea.vue';
  import Value from '../_mixins/value/index';
  import InputGenerate from '../_mixins/input-generate/index';


  export default mixins(Value, InputGenerate).extend({
    name: 's-textarea',
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
      const data = this.getRootNodeData();

      data.ref = 'textarea';
      data.staticClass = `s-textarea ${data.staticClass || ''}`.trim();

      return create(Textarea, data, this.getRootNodeChildren());
    }
  });
</script>
