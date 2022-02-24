import { test, expect } from 'vitest';
import { ref, isRef, computed, unref } from 'vue';
import { deepUnref } from '@/utils';


test('deepUnref: 最基础的作用和 Vue 的 unref 相同', () => {
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

test('deepUnref: 如果传入的是普通对象, 那么会返回副本', () => {
  const a = { a: 1 };
  const refA = ref(a);
  const computedA = computed(() => a);

  expect(unref(refA)).not.toBe(a);
  expect(deepUnref(computedA)).not.toBe(a);

  expect(unref(refA).a).toBe(1);
  expect(deepUnref(computedA).a).toBe(1);
});

test('deepUnref: 如果传入的不是普通对象, 那么直接返回传入值的 `unref` 结果', () => {
  const a = /123/;
  const refA = ref(a);
  const computedA = computed(() => a);

  expect(unref(refA)).toBe(a);
  expect(deepUnref(computedA)).toBe(a);
});

test('deepUnref: 会解包普通对象内的 ref 对象', () => {
  const a = {
    b: ref(1)
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

test('deepUnref: 会解包普通对象内的 ref 对象 ( 二 )', () => {
  const a = {
    b: {
      c: ref(1)
    }
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
