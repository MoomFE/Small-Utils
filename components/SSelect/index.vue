<script>
/* eslint-disable brace-style */


  import './index.scss';
  import VSelect from 'vuetify/lib/components/VSelect';
  import VAutocomplete from 'vuetify/lib/components/VAutocomplete';
  import VCombobox from 'vuetify/lib/components/VCombobox';
  import mixins from 'vuetify/lib/util/mixins';
  import { find } from 'lodash';
  import Value from '../_mixins/value/index';
  import InputGenerate from '../_mixins/input-generate/index';
  import isString from '../../utils/isString';


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
      /** 选项数组 */
      items: { type: Array, default: () => [] },
      /** 设置 'items' 属性的文本值 */
      itemText: { type: String, default: 'label' },
      /** 可过滤 */
      filterable: { type: Boolean, default: false },
      /** 可创建 */
      creatable: { type: Boolean, default: false }
    },
    render(create) {
      const data = this.getRootNodeData();
      const component = this.filterable ? (this.creatable ? VCombobox : VAutocomplete) : VSelect; // eslint-disable-line no-nested-ternary

      data.props.items = this.items;
      data.props.itemText = this.itemText;
      data.ref = 'select';
      data.staticClass = `s-select ${data.staticClass || ''}`.trim();

      return create(component, data, this.getRootNodeChildren());
    },
    methods: {
      /** 设置当前组件值 */
      setValue(value) {
        // 如果当前是可创建模式
        if (this.filterable && this.creatable && value) {
          const { items, itemText } = this;

          // 如果传入的是字符串, 那么根据文本字段名进行查找
          // 如果没有找到, 那么直接使用该字符串作为组合框值
          if (isString(value)) {
            value = find(items, { [itemText]: value }) || value;
          }
          // 如果传入的对象值在选项数组中未找到, 那么根据文本字段名进行查找
          // 如果没有找到, 那么直接取出原本值的文本作为组合框值
          else if (!items.includes(value)) {
            value = find(items, { [itemText]: value[itemText] }) || value[itemText];
          }
        }

        this.internalValue = value == null ? null : value;
      }
    }
  });
</script>
