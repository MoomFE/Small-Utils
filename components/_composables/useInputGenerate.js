import { ref, computed, watch, h as create } from '@vue/composition-api';
import { omit } from 'lodash';


export default function useInputGenerate(
  props,
  { listeners: allListeners, attrs, slots },
  { internalValue, setValue, name }
) {
  /**
   * 输入框 VNode 选项
   */
  function getInputData() {
    const listeners = omit(allListeners, ['input']);

    return {
      ref: 'input',
      attrs: {
        ...attrs
      },
      props: {
        value: internalValue.value
      },
      on: {
        ...listeners,
        input: setValue
      }
    };
  }

  return {
    getInputData
  };
}
