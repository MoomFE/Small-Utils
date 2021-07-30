<script>
  import './index.scss';
  import VSelect from 'vuetify/lib/components/VSelect';
  import mixins from 'vuetify/lib/util/mixins';
  import Value from '../_mixins/value/index';
  import InputGenerate from '../_mixins/input-generate/index';


  export default mixins(Value, InputGenerate).extend({
    name: 's-select',
    inheritAttrs: false,
    props: {
      /** 是否必填 */
      required: { type: Boolean, default: false },
      /** 输入框标签 */
      label: { type: String, default: '' },
      /** 将输入框标签显示到输入框外部的前面 */
      labelPrepend: { type: Boolean, default: false },
      /** 设置 'items' 属性的文本值 */
      itemText: { type: String, default: 'label' }
    },
    render(create) {
      const data = this.getRootNodeData();

      data.props.itemText = this.itemText;
      data.ref = 'select';
      data.staticClass = `s-select ${data.staticClass || ''}`.trim();

      return create(VSelect, data, this.getRootNodeChildren());
    }
  });
</script>
