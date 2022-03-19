import { isFunction } from '@/utils';

/**
 * 判断传入参数是否是 Promise 对象
 *
 * @param value 需要判断的参数
 * @example
 *
 * isNativePromise(new Promise(() => {})) // -> true
 * isNativePromise(Promise.resolve()) // -> true
 * isNativePromise(Promise.reject()) // -> true
 * isNativePromise({ then() {}, catch() {} }) // -> false
 */
export function isNativePromise<T = unknown>(value: unknown): value is Promise<T> {
  return Object.prototype.toString.call(value) === '[object Promise]';
}

/**
 * 判断传入参数是否是 Promise 对象或是类似于 Promise 的对象
 *
 * @param value 需要判断的参数
 * @example
 *
 * isPromise(new Promise(() => {})) // -> true
 * isPromise(Promise.resolve()) // -> true
 * isPromise(Promise.reject()) // -> true
 * isPromise({ then() {}, catch() {} }) // -> true
 */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return isNativePromise(value) || (
    isFunction((value as Promise<T>)?.then) && isFunction((value as Promise<T>)?.catch)
  );
}
