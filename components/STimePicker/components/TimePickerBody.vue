<script>
  import { defineComponent, computed, h as create, onMounted } from '@vue/composition-api';
  import { templateRef } from '@vueuse/core';
  import VRow from 'vuetify/lib/components/VGrid/VRow';
  import VCol from 'vuetify/lib/components/VGrid/VCol';
  import mergeData from 'vuetify/lib/util/mergeData';
  import dayjs from 'dayjs';
  import customParseFormat from 'dayjs/plugin/customParseFormat';
  import SScrollbars from '../../SScrollbars/index.vue';
  import isString from '../../../utils/isString';
  import isNumeric from '../../../utils/isNumeric';
  import useValue from '../../_composables/useValue';


  dayjs.extend(customParseFormat);


  const name = 's-time-picker-body';


  const defaultRowData = {
    ref: 'root',
    staticClass: name,
    staticStyle: {
      'background-color': '#FFF'
    },
    attrs: {
      noGutters: true
    }
  };

  const defaultColData = {
    attrs: {
      cols: 8
    }
  };

  const defaultScrollbarData = {
    ref: 'scrollbars',
    refInFor: true,
    staticStyle: {
      height: '100%'
    }
  };

  const hours = Array(24).fill().map((_, index) => index);
  const minutes = Array(60).fill().map((_, index) => index);
  const seconds = [...minutes];

  const itemHeight = 32;


  export default defineComponent({
    name,
    props: {
      /** 宽度 */
      width: { type: [Number, String], default: 180 },
      /** 高度 */
      height: { type: [Number, String], default: 220 }
    },
    setup(props, ctx) {
      /** 时分秒的滚动条 */
      const scrollbars = templateRef('scrollbars');
      /** 组件内部值 */
      const internalValue = useValue(props, ctx).internalValue;
      /** 组件宽度 */
      const finalWidth = computed(() => (isNumeric(props.width) ? `${props.width}px` : props.width));
      /** 组件高度 */
      const finalHeight = computed(() => (isNumeric(props.height) ? `${props.height}px` : props.height));
      /** 时分秒数组 */
      const times = computed(() => {
        const { value } = internalValue;
        const [hour = 0, minute = 0, second = 0] = isString(value) ? value.split(':') : [];

        return [
          Number(hour),
          Number(minute),
          Number(second)
        ];
      });

      /**
       * 设置时分秒的值, 并且滚动到指定位置
       */
      function setValue(index, value) {
        const newTimes = [...times.value];

        newTimes[index] = value;
        internalValue.value = dayjs(newTimes.join(':'), 'HH:mm:ss').format('HH:mm:ss');
        scrollbars.value[index].scroll({ y: itemHeight * value }, 100);
      }

      onMounted(() => {
        scrollbars.value.forEach((item, index) => {
          item.osInstace.options('callbacks.onScrollStop', () => {
            const y = item.scroll().position.y;
            const isCeil = y % itemHeight > itemHeight / 2;

            setValue(
              index,
              Math[isCeil ? 'ceil' : 'floor'](y / itemHeight)
            );
          });
        });
      });

      return () => {
        const rowData = mergeData(defaultRowData, {
          staticStyle: {
            'width': finalWidth.value,
            'height': finalHeight.value,
            '--height': finalHeight.value
          }
        });

        return create(VRow, rowData, [hours, minutes, seconds].map((list, index) => {
          const scrollbarData = mergeData(defaultScrollbarData);
          const colData = mergeData(defaultColData);

          return create(VCol, colData, [
            create(SScrollbars, scrollbarData, [
              create('ul', list.map((value) => {
                const data = {
                  class: {
                    active: times.value[index] === value
                  },
                  on: {
                    click: () => setValue(index, value)
                  }
                };

                return create('li', data, [value]);
              }))
            ])
          ]);
        }));
      };
    }
  });
</script>

<style lang="scss" scoped>
  @import "~vuetify/src/styles/styles.sass";

  $item-height: 32px;

  .s-time-picker-body{
    position: relative;

    // 选择器中间的选择区域显示
    &::before{
      content: '';
      width: calc(100% - 12%);
      height: $item-height + 2;
      position: absolute; top: 0; right: 0; bottom: 0; left: 0;
      margin: auto;
      border-top: 1px solid map-get($grey, 'lighten-2');
      border-bottom: 1px solid map-get($grey, 'lighten-2');
      pointer-events: none;
    }

    // 单个选择区域容器
    ul{
      list-style: none;
      padding-left: 0;

      // 单个选择区域上下的空白
      &::before, &::after{
        content: '';
        width: 100%;
        height: calc((var(--height) - #{$item-height}) / 2);
        display: block;
      }

      li{
        height: $item-height;
        line-height: $item-height;
        font-size: 80%;
        text-align: center;
        cursor: pointer;
        position: relative;

        &.active{
          font-weight: bolder;
        }
      }
    }
  }
</style>
