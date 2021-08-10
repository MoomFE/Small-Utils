<script>
  import { defineComponent, h as create } from '@vue/composition-api';
  import VMenu from 'vuetify/lib/components/VMenu/VMenu';
  import VDatePicker from 'vuetify/lib/components/VDatePicker/VDatePicker';
  import SInput from '../SInput/index.vue';
  import ValueMixin from '../_mixins/value/index';

  export default defineComponent({
    name: 's-date-picker',
    data: () => ({
      /** 菜单激活状态 */
      isMenuActive: false
    }),
    render() {
      return create(VMenu, {
        ref: 'menu',
        props: {
          value: this.isMenuActive,
          offsetY: true,
          closeOnContentClick: false,
          transition: 'scale-transition',
          minWidth: 'auto'
        },
        on: {
          'input': (value) => (this.isMenuActive = value)
        },
        scopedSlots: {
          activator: this.genInput
        }
      }, [
        this.genDatePicker()
      ])
    },
    methods: {
      /**
       * 生成组件的输入框部分
       */
      genInput({ attrs, on }) {
        return create(SInput, {
          attrs: {
            ...attrs
          },
          props: {
            value: this.internalValue,
            readonly: true
          },
          on: {
            input: this.setValue
          },
          nativeOn: {
            ...on
          }
        })
      },
      /**
       * 生成组件的日期选择器部分
       */
      genDatePicker() {
        return create(VDatePicker, {
          props: {
            value: this.internalValue,
            scrollable: true
          },
          on: {
            input: [
              this.setValue,
              () => (this.isMenuActive = false)
            ]
          }
        })
      }
    },
    mixins: [
      ValueMixin
    ]
  });
</script>