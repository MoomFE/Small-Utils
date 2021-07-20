import Vue from 'vue';


export default Vue.extend({
  props: {
    /** 父组件传入值 */
    value: null
  },
  data() {
    return {
      /** 组件内部值 ( 修改时不通知父组件 ) */
      lazyValue: this.value
    };
  },
  computed: {
    /** 组件内部值 */
    internalValue: {
      get() {
        return this.lazyValue;
      },
      set(value) {
        this.lazyValue = value;
        this.$emit('input', value);
      }
    }
  },
  methods: {
    /** 设置当前组件值 */
    setValue(value) {
      this.internalValue = value;
    }
  },
  watch: {
    // 父组件传入值更改后, 更新当前组件值
    value(value) {
      this.lazyValue = value;
    }
  }
});
