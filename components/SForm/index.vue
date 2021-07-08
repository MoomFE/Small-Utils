<script>
  import VForm from 'vuetify/lib/components/VForm';
  import isFunction from '../../utils/isFunction';


  export default {
    functional: true,
    render(create, { data, children }) {
      const nativeOn = data.nativeOn || (data.nativeOn = {});
      const nativeOnSubmitFn = nativeOn.submit;
      const preventFn = (event) => event.preventDefault();

      // 添加样式类
      data.staticClass = `s-form ${data.staticClass || ''}`.trim();

      // 添加阻止默认行为的方法
      if (!nativeOnSubmitFn) {
        nativeOn.submit = preventFn;
      } else if (isFunction(nativeOnSubmitFn)) {
        nativeOn.submit = [nativeOnSubmitFn, preventFn];
      } else if (Array.isArray(nativeOnSubmitFn)) {
        nativeOn.submit = [...nativeOnSubmitFn, preventFn];
      }

      return create(VForm, data, children);
    }
  };
</script>
