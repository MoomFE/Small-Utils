/* eslint-disable max-len */


import type { ShallowRef, Ref, ComputedRef } from 'vue-demi';
import type { MaybeRef, EventHookOn } from '@vueuse/core';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { Get, Except, Merge } from 'type-fest';
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


export interface UseAxiosReturn<Data = any, AxiosConfig = AxiosRequestConfig<Data>> {
  /** 服务器响应 */
  response: ShallowRef<AxiosResponse<Data, AxiosConfig> | undefined>;
  /** 服务器响应数据 */
  responseData: ShallowRef<Data | undefined>;
  /** 服务器返回的数据 */
  data: ShallowRef<Get<Data, 'data'> | undefined>;
  /** 服务器返回的错误 */
  error: ShallowRef<AxiosError<Data, AxiosConfig> | undefined>;

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
  execute: () => Promise<AxiosResponse<Data, AxiosConfig>>;

  /** 请求成功事件钩子 */
  onSuccess: EventHookOn<AxiosResponse<Data, AxiosConfig>>;
  /** 请求失败事件钩子 */
  onError: EventHookOn<AxiosError<Data, AxiosConfig>>;
  /** 请求完成事件钩子 */
  onFinally: EventHookOn<any>;
}

/**
 * 对 axios 的封装
 * @param url 请求地址
 * @param config axios 配置项
 * @param useAxiosConfig 配置项
 */
function baseUseAxios<
  Data = any,
  AxiosConfig = AxiosRequestConfig<Data>
>(
  url: MaybeRef<string>,
  config?: MaybeRef<AxiosConfig>,
  useAxiosConfig?: UseAxiosConfig
) {
  /** axios 实例 */
  const axiosInstance = useAxiosConfig?.instance || axios;


  /** 请求成功事件钩子 */
  const successEvent = createEventHook<AxiosResponse<Data, AxiosConfig>>();
  /** 请求失败事件钩子 */
  const errorEvent = createEventHook<AxiosError<Data, AxiosConfig>>();
  /** 请求完成事件钩子 */
  const finallyEvent = createEventHook<any>();


  /** 服务器响应 */
  const response = shallowRef<AxiosResponse<Data, AxiosConfig>>();
  /** 服务器响应数据 */
  const responseData = shallowRef<Data>();
  /** 服务器返回的数据 */
  const data = shallowRef<Get<Data, 'data'>>();
  /** 服务器返回的错误 */
  const error = shallowRef<AxiosError<Data, AxiosConfig>>();
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
  function execute(): Promise<AxiosResponse<Data, AxiosConfig>> {
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
        .then((res: AxiosResponse<Data, AxiosConfig>) => {
          response.value = res;
          responseData.value = res.data;
          // @ts-ignore
          data.value = res.data?.data ?? {};

          successEvent.trigger(res);
          resolve(res);
        })
        .catch((err: AxiosError<Data, AxiosConfig>) => {
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


  const shell: UseAxiosReturn<Data, AxiosConfig> = {
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


export interface UseAxios<InitAxiosConfig = AxiosRequestConfig>{
  /** 使用 axios 发起请求 */
  <Data = any, UserAxiosConfig = AxiosRequestConfig<Data>>(url: MaybeRef<string>, config?: MaybeRef<UserAxiosConfig>, useAxiosConfig?: UseAxiosConfig): UseAxiosReturn<Data, Merge<InitAxiosConfig, UserAxiosConfig>>;
  /** 使用 axios 发起 GET 请求 */
  get: <Data = any, UserAxiosConfig = AxiosRequestConfig<Data>>(url: MaybeRef<string>, params?: any, config?: MaybeRef<UserAxiosConfig>, useAxiosConfig?: UseAxiosConfig) => UseAxiosReturn<Data, Merge<InitAxiosConfig, UserAxiosConfig>>;
  /** 使用 axios 发起 DELETE 请求 */
  delete: <Data = any, UserAxiosConfig = AxiosRequestConfig<Data>>(url: MaybeRef<string>, params?: any, config?: MaybeRef<UserAxiosConfig>, useAxiosConfig?: UseAxiosConfig) => UseAxiosReturn<Data, Merge<InitAxiosConfig, UserAxiosConfig>>;
  /** 使用 axios 发起 POST 请求 */
  post: <Data = any, UserAxiosConfig = AxiosRequestConfig<Data>>(url: MaybeRef<string>, data?: Data, config?: MaybeRef<UserAxiosConfig>, useAxiosConfig?: UseAxiosConfig) => UseAxiosReturn<Data, Merge<InitAxiosConfig, UserAxiosConfig>>;
  /** 使用 axios 发起 PUT 请求 */
  put: <Data = any, UserAxiosConfig = AxiosRequestConfig<Data>>(url: MaybeRef<string>, data?: Data, config?: MaybeRef<UserAxiosConfig>, useAxiosConfig?: UseAxiosConfig) => UseAxiosReturn<Data, Merge<InitAxiosConfig, UserAxiosConfig>>;
  /** 使用 axios 发起 PATCH 请求 */
  patch: <Data = any, UserAxiosConfig = AxiosRequestConfig<Data>>(url: MaybeRef<string>, data?: Data, config?: MaybeRef<UserAxiosConfig>, useAxiosConfig?: UseAxiosConfig) => UseAxiosReturn<Data, Merge<InitAxiosConfig, UserAxiosConfig>>;
}

/**
 * 创建一个自定义配置的 axios 封装实例
 * @param initConfig 初始化 axios 配置项
 * @param useAxiosConfig 初始化配置项
 */
export function createUseAxios<
  InitAxiosConfig = AxiosRequestConfig
>(
  initConfig?: MaybeRef<InitAxiosConfig>,
  initUseAxiosConfig?: UseAxiosConfig
): UseAxios<InitAxiosConfig> {
  /** 使用 axios 发起请求 */
  function newUseAxios<Data = any, UserAxiosConfig = AxiosRequestConfig<Data>>(url: MaybeRef<string>, config?: MaybeRef<UserAxiosConfig>, useAxiosConfig?: UseAxiosConfig) {
    return baseUseAxios(
      url,
      computed(() => Object.assign({}, unref(initConfig), unref(config))),
      Object.assign({}, initUseAxiosConfig, useAxiosConfig)
    );
  }
  /** 使用 axios 发起 GET, DELETE 请求 */
  ['get', 'delete'].forEach((method) => {
    // @ts-ignore
    newUseAxios[method] = function<Data = any, UserAxiosConfig = AxiosRequestConfig<Data>> (url: MaybeRef<string>, params?: any, config?: MaybeRef<UserAxiosConfig>, useAxiosConfig?: UseAxiosConfig) {
      return newUseAxios(
        url,
        computed(() => Object.assign({}, unref(config), { method, params })),
        Object.assign({}, initUseAxiosConfig, useAxiosConfig)
      );
    };
  });
  /** 使用 axios 发起 POST, PUT, PATCH 请求 */
  ['post', 'put', 'patch'].forEach((method) => {
    // @ts-ignore
    newUseAxios[method] = function<Data = any, UserAxiosConfig = AxiosRequestConfig<Data>> (url: MaybeRef<string>, data?: Data, config?: MaybeRef<UserAxiosConfig>, useAxiosConfig?: UseAxiosConfig) {
      return newUseAxios(
        url,
        computed(() => Object.assign({}, unref(config), { method, data })),
        Object.assign({}, initUseAxiosConfig, useAxiosConfig)
      );
    };
  });

  return newUseAxios as UseAxios<InitAxiosConfig>;
}


export const useAxios: UseAxios = createUseAxios();
