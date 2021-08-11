import { ref, computed, watch } from '@vue/composition-api';


export default function useValue(props, { emit }) {
  /** 组件内部值 ( 修改时不通知父组件 ) */
  const lazyValue = ref(props.value);
  /** 组件内部值 */
  const internalValue = computed({
    get: () => lazyValue.value,
    set: (value) => {
      lazyValue.value = value;
      emit('input', value);
    }
  });

  /** 设置当前组件值 */
  function setValue(value) {
    internalValue.value = value;
  }

  // 父组件传入值更改后, 更新当前组件值
  watch(() => props.value, (value) => {
    lazyValue.value = value;
  });

  return {
    lazyValue,
    internalValue,
    setValue
  };
}
