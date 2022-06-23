import { describe, expect, test } from 'vitest';
import { computed, isRef, ref, unref } from 'vue';
import { types } from '@@/test/shared';
import { deepUnref } from '@/vue-utils';

describe('deepUnref', () => {

  test('最基础的作用和 Vue 的 unref 相同', () => {
    const a = ref(1);
    const b = computed(() => a.value + 1);

    expect(unref(a)).toBe(1);
    expect(deepUnref(a)).toBe(1);

    expect(unref(b)).toBe(2);
    expect(deepUnref(b)).toBe(2);

    a.value++;

    expect(unref(a)).toBe(2);
    expect(deepUnref(a)).toBe(2);

    expect(unref(b)).toBe(3);
    expect(deepUnref(b)).toBe(3);
  });

  test('如果传入的是普通对象, 那么会返回对象的副本', () => {
    const a = { a: 1 };
    const refA = ref(a);
    const computedA = computed(() => a);

    expect(unref(refA)).not.toBe(a);
    expect(deepUnref(computedA)).not.toBe(a);

    expect(unref(refA).a).toBe(1);
    expect(deepUnref(computedA).a).toBe(1);
  });

  test('如果传入的是数组, 那么会返回数组的副本', () => {
    const a = [1];
    const refA = ref(a);
    const computedA = computed(() => a);

    expect(unref(refA)).not.toBe(a);
    expect(deepUnref(computedA)).not.toBe(a);

    expect(unref(refA)[0]).toBe(1);
    expect(deepUnref(computedA)[0]).toBe(1);
  });

  test('如果传入的不是普通对象和数组, 那么直接返回传入值的 `unref` 结果', () => {
    Object.entries(types).forEach(([type, values]) => {
      if (['nan', 'object', 'array', 'promiseLike'].includes(type)) return;

      values.forEach((value) => {
        const refValue = ref(value);
        const computedValue = computed(() => value);

        expect(deepUnref(refValue)).equals(value);
        expect(deepUnref(computedValue)).equals(value);
      });
    });
  });

  test('会解包普通对象内的 ref 对象', () => {
    const a = {
      b: ref(1),
    };

    const unrefA = deepUnref(a);

    expect(isRef(a.b)).toBe(true);
    expect(isRef(unrefA.b)).toBe(false);
    expect(a.b.value).toBe(1);
    expect(unrefA.b).toBe(1);

    const computedA = computed(() => a);
    const unrefComputedA = deepUnref(a);

    expect(isRef(computedA)).toBe(true);
    expect(isRef(unrefComputedA)).toBe(false);
    expect(isRef(computedA.value.b)).toBe(true);
    expect(isRef(unrefComputedA.b)).toBe(false);
    expect(computedA.value.b.value).toBe(1);
    expect(unrefComputedA.b).toBe(1);
  });

  test('会解包普通对象内的 ref 对象 ( 二 )', () => {
    const a = {
      b: {
        c: ref(1),
      },
    };

    const unrefA = deepUnref(a);

    expect(isRef(a.b.c)).toBe(true);
    expect(isRef(unrefA.b.c)).toBe(false);
    expect(a.b.c.value).toBe(1);
    expect(unrefA.b.c).toBe(1);

    const computedA = computed(() => a);
    const unrefComputedA = deepUnref(a);

    expect(isRef(computedA)).toBe(true);
    expect(isRef(unrefComputedA)).toBe(false);
    expect(isRef(computedA.value.b.c)).toBe(true);
    expect(isRef(unrefComputedA.b.c)).toBe(false);
    expect(computedA.value.b.c.value).toBe(1);
    expect(unrefComputedA.b.c).toBe(1);
  });

  test('会解包数组内的 ref 对象', () => {
    const a = [
      ref(1),
    ];

    const unrefA = deepUnref(a);

    expect(isRef(a[0])).toBe(true);
    expect(isRef(unrefA[0])).toBe(false);
    expect(a[0].value).toBe(1);
    expect(unrefA[0]).toBe(1);

    const computedA = computed(() => a);
    const unrefComputedA = deepUnref(a);

    expect(isRef(computedA)).toBe(true);
    expect(isRef(unrefComputedA)).toBe(false);
    expect(isRef(computedA.value[0])).toBe(true);
    expect(isRef(unrefComputedA[0])).toBe(false);
    expect(computedA.value[0].value).toBe(1);
    expect(unrefComputedA[0]).toBe(1);
  });

  test('会解包数组内的 ref 对象 ( 二 )', () => {
    const a = [
      {
        c: ref(1),
      },
    ];

    const unrefA = deepUnref(a);

    expect(isRef(a[0].c)).toBe(true);
    expect(isRef(unrefA[0].c)).toBe(false);
    expect(a[0].c.value).toBe(1);
    expect(unrefA[0].c).toBe(1);

    const computedA = computed(() => a);
    const unrefComputedA = deepUnref(a);

    expect(isRef(computedA)).toBe(true);
    expect(isRef(unrefComputedA)).toBe(false);
    expect(isRef(computedA.value[0].c)).toBe(true);
    expect(isRef(unrefComputedA[0].c)).toBe(false);
    expect(computedA.value[0].c.value).toBe(1);
    expect(unrefComputedA[0].c).toBe(1);
  });

});
