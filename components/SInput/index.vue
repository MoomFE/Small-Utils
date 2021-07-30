<script>
  import './index.scss';
  import VTextField from 'vuetify/lib/components/VTextField';
  import mixins from 'vuetify/lib/util/mixins';
  import Value from '../_mixins/value/index';
  import InputGenerate from '../_mixins/input-generate/index';


  export default mixins(Value, InputGenerate).extend({
    name: 's-input',
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

      data.ref = 'input';
      data.staticClass = `s-input ${data.staticClass || ''}`.trim();

      return create(VTextField, data, this.getRootNodeChildren());
    },
    methods: {
      focus() {
        this.$refs.input.focus();
      },
      blur() {
        this.$refs.input.blur();
      }
    }
  });
</script>
