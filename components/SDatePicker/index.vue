<script>
  import { defineComponent, h as create, ref } from '@vue/composition-api';
  import VMenu from 'vuetify/lib/components/VMenu/VMenu';
  import VDatePicker from 'vuetify/lib/components/VDatePicker/VDatePicker';
  import mergeData from 'vuetify/lib/util/mergeData';
  import { entries } from 'lodash';
  import SInput from '../SInput/index.vue';
  import useValue from '../_composables/useValue';
  import useInputGenerate from '../_composables/useInputGenerate';


  export default defineComponent({
    name: 's-date-picker',
    setup(props, ctx) {
      const { internalValue, setValue } = useValue(props, ctx);
      const { getInputData } = useInputGenerate(props, ctx, { internalValue, setValue });

      /** 菜单激活状态 */
      const isMenuActive = ref(false);

      /**
       * 生成组件的输入框部分
       */
      function genInput({ attrs, on }) {
        const data = mergeData(getInputData(), {
          on,
          attrs: {
            ...attrs,
            readonly: true
          }
        });
        const children = entries(ctx.slots).map(([slot, fn]) => {
          return create('template', { slot }, fn());
        });

        return create(SInput, data, children);
      }

      /**
       * 生成组件的日期选择器部分
       */
      function genDatePicker() {
        return create(VDatePicker, {
          attrs: {
            value: internalValue.value,
            locale: 'zh-cn'
          },
          on: {
            input: [
              setValue,
              () => (isMenuActive.value = false)
            ]
          }
        });
      }

      return () => create(VMenu, {
        ref: 'menu',
        attrs: {
          value: isMenuActive.value,
          offsetY: true,
          closeOnContentClick: false,
          minWidth: 'auto'
        },
        on: {
          input: (value) => (isMenuActive.value = value)
        },
        scopedSlots: {
          activator: genInput,
          default: genDatePicker
        }
      });
    }
  });
</script>
