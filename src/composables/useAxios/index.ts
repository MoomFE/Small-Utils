import type { MaybeRef } from '@vueuse/core';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { shallowRef, ref, computed, unref } from 'vue-demi';
import { createEventHook, useTimeoutFn, tryOnUnmounted } from '@vueuse/core';
import { deepUnref } from '@/utils';


interface UseAxiosConfig{
  /**
   * 使用的 Axios 实例
   */
  instance?: AxiosInstance;
  /**
   * 是否在执行 `useAxios` 时立即发起请求
   * @default false
   */
  immediate?: boolean;
  /**
   * 是否在组件被卸载时取消当前请求
   * @default true
   */
  abortOnUnmounted?: boolean;
  /**
   * 是否在发起请求时重置数据
   * @default true
   */
  resetDataOnExecute: boolean;
}


export function useAxios<T = any, D = AxiosRequestConfig>(url: MaybeRef<string>, config: MaybeRef<D>, useAxiosConfig?: UseAxiosConfig) {
  /** axios 实例 */
  const axiosInstance = useAxiosConfig?.instance || axios;


  /** 请求成功事件钩子 */
  const successEvent = createEventHook<any>();
  /** 请求失败事件钩子 */
  const errorEvent = createEventHook<any>();
  /** 请求完成事件钩子 */
  const finallyEvent = createEventHook<any>();


  /** 服务器响应 */
  const response = shallowRef<AxiosResponse<T, D>>();
  /** 服务器响应数据 */
  const data = shallowRef<T>();
  /** 服务器返回的错误 */
  const error = shallowRef<AxiosError<T>>();
  /** 是否发起过请求 */
  const isExecuted = ref(false);
  /** 是否在请求中 */
  const isLoading = ref(false);
  /** 是否已请求完成 */
  const isFinished = ref(false);
  /** 是否已取消请求 */
  const isAborted = ref(false);


  /** axios 请求取消令牌 */
  let cancelToken = axios.CancelToken.source();
  /** 是否可以取消当前请求 */
  const canAbort = computed(() => isExecuted.value && (!isFinished.value || isLoading.value));
  /** 用于取消当前请求的方法 */
  function abort(message?: string) {
    if (!canAbort.value) return;

    cancelToken.cancel(message);
    cancelToken = axios.CancelToken.source();
    isAborted.value = true;
    isLoading.value = false;
    isFinished.value = false;
  }

  function execute() {
    // 尝试取消当前已经发起的请求
    abort();


    // 标记发起过请求
    isExecuted.value = true;
    // 标记请求中
    isLoading.value = true;
    // 重置状态
    isFinished.value = false;
    isAborted.value = false;
    // 重置变量
    if (useAxiosConfig?.resetDataOnExecute !== false) {
      response.value = undefined;
      data.value = undefined;
      data.value = undefined;
      error.value = undefined;
    }


    /** axios 请求 URL */
    const axiosUrl = unref(url);
    /** axios 请求配置 */
    const axiosConfig = {
      ...deepUnref(config),
      cancelToken: cancelToken.token
    };


    return new Promise((resolve, reject) => {
      axiosInstance(axiosUrl, axiosConfig)
        .finally(() => {
          isLoading.value = false;
          isFinished.value = true;

          finallyEvent.trigger(null);
        })
        .then((res: AxiosResponse<T, D>) => {
          response.value = res;
          data.value = res.data;

          successEvent.trigger(res);
          resolve(res);
        })
        .catch((err: AxiosError<T>) => {
          error.value = err;

          errorEvent.trigger(err);
          reject(err);
        });
    });
  }


  // 是否立即触发请求
  if (useAxiosConfig?.immediate) {
    useTimeoutFn(execute, 0);
  }
  // 是否在组件被卸载时取消当前请求
  if (useAxiosConfig?.abortOnUnmounted !== false) {
    tryOnUnmounted(abort);
  }


  const shell = {
    response,
    data,
    error,

    isExecuted,
    isLoading,
    isFinished,
    isAborted,

    canAbort,
    execute,
    abort,

    // 事件钩子
    onSuccess: successEvent.on,
    onError: errorEvent.on,
    onFinally: finallyEvent.on
  };


  return shell;
}
