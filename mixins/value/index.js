import Vue from 'vue';


export default Vue.extend({
  props: {
    /** 父组件传入值 */
    value: null
  },
  data() {
    return {
      /** 当前组件值 */
      currentValue: this.value
    };
  },
  methods: {
    /** 设置当前组件值 */
    setValue(value) {
      this.currentValue = value;
    }
  },
  watch: {
    // 父组件传入值更改后, 更改当前组件值
    value(value) {
      this.currentValue = value;
    },
    // 当前组件值更改后, 通知父组件更新值
    currentValue(value) {
      this.$emit('input', value);
    }
  }
});
