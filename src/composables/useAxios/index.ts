import type { ShallowRef, Ref, ComputedRef } from 'vue-demi';
import type { MaybeRef, EventHookOn } from '@vueuse/core';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { Get } from 'type-fest';
import axios from 'axios';
import { shallowRef, ref, computed, unref } from 'vue-demi';
import { createEventHook, useTimeoutFn, tryOnUnmounted } from '@vueuse/core';
import { deepUnref } from '@/utils';


export interface UseAxiosConfig{
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
  resetDataOnExecute?: boolean;
}


export interface UseAxiosReturn<T = any, D = AxiosRequestConfig> {
  /** 服务器响应 */
  response: ShallowRef<AxiosResponse<T, D> | undefined>;
  /** 服务器响应数据 */
  responseData: ShallowRef<T | undefined>;
  /** 服务器返回的数据 */
  data: ShallowRef<Get<T, 'data'> | undefined>;
  /** 服务器返回的错误 */
  error: ShallowRef<AxiosError<T, D> | undefined>;

  /** 是否发起过请求 */
  isExecuted: Ref<boolean>;
  /** 是否在请求中 */
  isLoading: Ref<boolean>;
  /** 是否已请求完成 */
  isFinished: Ref<boolean>;
  /** 是否已取消请求 */
  isAborted: Ref<boolean>;
  /** 是否可以取消当前请求 */
  canAbort: ComputedRef<boolean>;

  /** 用于取消当前请求的方法 */
  abort: (message?: string) => any;
  /** 执行 Ajax 请求的方法 */
  execute: () => Promise<AxiosResponse<T, D>>;

  /** 请求成功事件钩子 */
  onSuccess: EventHookOn<AxiosResponse<T, D>>;
  /** 请求失败事件钩子 */
  onError: EventHookOn<AxiosError<T, D>>;
  /** 请求完成事件钩子 */
  onFinally: EventHookOn<any>;
}


export function useAxios<T = any, D = AxiosRequestConfig>(url: MaybeRef<string>, config?: MaybeRef<D>, useAxiosConfig?: UseAxiosConfig) {
  /** axios 实例 */
  const axiosInstance = useAxiosConfig?.instance || axios;


  /** 请求成功事件钩子 */
  const successEvent = createEventHook<AxiosResponse<T, D>>();
  /** 请求失败事件钩子 */
  const errorEvent = createEventHook<AxiosError<T, D>>();
  /** 请求完成事件钩子 */
  const finallyEvent = createEventHook<any>();


  /** 服务器响应 */
  const response = shallowRef<AxiosResponse<T, D>>();
  /** 服务器响应数据 */
  const responseData = shallowRef<T>();
  /** 服务器返回的数据 */
  const data = shallowRef<Get<T, 'data'>>();
  /** 服务器返回的错误 */
  const error = shallowRef<AxiosError<T, D>>();
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
  /** 执行 Ajax 请求的方法 */
  function execute(): Promise<AxiosResponse<T, D>> {
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
      responseData.value = undefined;
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
          responseData.value = res.data;
          // @ts-ignore
          data.value = res.data?.data ?? {};

          successEvent.trigger(res);
          resolve(res);
        })
        .catch((err: AxiosError<T, D>) => {
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


  const shell: UseAxiosReturn<T, D> = {
    response,
    responseData,
    data,
    error,

    isExecuted,
    isLoading,
    isFinished,
    isAborted,
    canAbort,

    abort,
    execute,

    // 事件钩子
    onSuccess: successEvent.on,
    onError: errorEvent.on,
    onFinally: finallyEvent.on
  };


  return shell;
}


export function createUseAxios<D = AxiosRequestConfig>(initConfig?: MaybeRef<D>, initUseAxiosConfig?: UseAxiosConfig) {
  return (url: MaybeRef<string>, config?: MaybeRef<AxiosRequestConfig>, useAxiosConfig?: UseAxiosConfig) => {
    return useAxios(
      url,
      { ...initConfig, ...config },
      { ...initUseAxiosConfig, ...useAxiosConfig }
    );
  }
}