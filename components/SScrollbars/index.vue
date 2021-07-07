<script>
  import 'overlayscrollbars/css/OverlayScrollbars.min.css';
  import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';

  export default {
    functional: true,
    render(create, { data, children }) {
      // 添加样式类
      data.staticClass = `s-scrollbars ${data.staticClass || ''}`.trim();

      return create(OverlayScrollbarsComponent, data, children);
    }
  };
</script>
