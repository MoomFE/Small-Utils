import CssRender from 'css-render';

const { c } = CssRender();
const style = c('.s-responsive', {
  maxWidth: '100%',
  display: 'flex',
  flex: '1 0 auto',
  position: 'relative',
  overflow: 'hidden',
}, [
  c('.s-responsive-sizer', { flex: '1 0 0px' }, [
    c('~ .s-responsive-content', { marginLeft: '-100%' }),
  ]),
  c('.s-responsive-content', { maxWidth: '100%', flex: '1 0 0px' }),
]);

style.mount();
