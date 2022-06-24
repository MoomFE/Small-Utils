import { describe, expect, test } from 'vitest';
import { nextTick, onScopeDispose, ref, watch } from 'vue';
import { wheneverEffectScope } from '@/vue-utils';

describe('wheneverEffectScope', () => {

  test('本质上是创建一个 watch', async () => {
    const source = ref(1);
    const value = ref();
    const unWatch = wheneverEffectScope(source, (v) => {
      value.value = v;
    });

    expect(value.value).is.undefined;

    source.value = 2;
    expect(value.value).is.undefined;
    await nextTick();
    expect(value.value).is.equal(2);

    source.value = 3;
    expect(value.value).is.equal(2);
    await nextTick();
    expect(value.value).is.equal(3);

    unWatch();

    source.value = 4;
    expect(value.value).is.equal(3);
    await nextTick();
    expect(value.value).is.equal(3);
  });

  test('为创建的 watch 传递 options', () => {
    const source = ref(1);
    const value = ref();
    const unWatch = wheneverEffectScope(source, (v) => {
      value.value = v;
    }, {
      flush: 'sync',
    });

    expect(value.value).is.undefined;

    source.value = 2;
    expect(value.value).is.equal(2);

    source.value = 3;
    expect(value.value).is.equal(3);

    unWatch();

    source.value = 4;
    expect(value.value).is.equal(3);
  });

  test('传递的回调方法用于创建一个 effect 作用域并执行', async () => {
    const source = ref(false);

    const value = ref();
    const value2 = ref();

    const unWatch = wheneverEffectScope(source, () => {
      watch(value, () => {
        value2.value = value.value;
      });
    });

    expect(value.value).is.undefined;
    expect(value2.value).is.undefined;

    value.value = 1;
    expect(value2.value).is.undefined;
    await nextTick();
    expect(value2.value).is.undefined;

    // 当值变为 truthy 时, 创建 effect 作用域
    source.value = true;

    expect(value2.value).is.undefined;
    await nextTick();
    expect(value2.value).is.undefined;

    value.value = 2;
    expect(value2.value).is.undefined;
    await nextTick();
    expect(value2.value).is.equal(2);

    value.value = 3;
    expect(value2.value).is.equal(2);
    await nextTick();
    expect(value2.value).is.equal(3);

    // 当值变为 falsy 时, 停止之前创建的 effect 作用域
    source.value = false;

    expect(value2.value).is.equal(3);
    await nextTick();
    expect(value2.value).is.equal(3);

    value.value = 4;
    expect(value2.value).is.equal(3);
    await nextTick();
    expect(value2.value).is.equal(3);

    unWatch();
  });

  test('传入值为 truthy 但是却发生更改时, 会停止之前创建的 effect 作用域', async () => {
    const source = ref<number | false>(false);

    const value = ref();
    const value2 = ref();

    let index = 0;
    let disposeCount = 0;

    const unWatch = wheneverEffectScope(source, () => {
      index += 1;
      watch(value, (v) => {
        value2.value = v + index;
      });

      onScopeDispose(() => {
        disposeCount++;
      });
    });

    source.value = 123;
    await nextTick();
    expect(index).is.equal(1);
    expect(disposeCount).is.equal(0);

    value.value = 1;
    await nextTick();
    expect(value2.value).is.equal(2);

    source.value = 456;
    await nextTick();
    expect(index).is.equal(2);
    expect(disposeCount).is.equal(1);

    value.value = 2;
    await nextTick();
    expect(value2.value).is.equal(4);

    source.value = 789;
    await nextTick();
    expect(index).is.equal(3);
    expect(disposeCount).is.equal(2);

    value.value = 5;
    await nextTick();
    expect(value2.value).is.equal(8);

    unWatch();
  });

  test('调用返回的 unWatch 方法, 会停止创建的 effect 作用域', async () => {
    const source = ref(false);

    const value = ref();
    const value2 = ref();

    const unWatch = wheneverEffectScope(source, () => {
      watch(value, () => {
        value2.value = value.value;
      });
    });

    source.value = true;
    await nextTick();

    value.value = 1;
    await nextTick();
    expect(value2.value).is.equal(1);

    unWatch();

    value.value = 2;
    await nextTick();
    expect(value2.value).is.equal(1);
  });

});
