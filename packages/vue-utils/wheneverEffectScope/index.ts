import type { EffectScope, WatchCallback, WatchOptions, WatchSource, WatchStopHandle } from 'vue-demi';
import { effectScope, watch } from 'vue-demi';

/**
 * 监听传入值为 truthy 时, 创建一个 effect 作用域
 * 当值变为 falsy 时, 将会停止之前创建的 effect 作用域
 */
export function wheneverEffectScope<T>(source: WatchSource<T | false | null | undefined>, run: WatchCallback<T>, options?: WatchOptions): WatchStopHandle {
  let scope: EffectScope | void;

  const dispose = () => {
    scope?.stop();
    scope = undefined;
  };

  const unWatch = watch(
    source,
    (value, oldValue, onCleanup) => {
      if (value) {
        scope && dispose();
        scope = effectScope();
        scope.run(() => run(value, oldValue, onCleanup));
      }
      else {
        dispose();
      }
    },
    options,
  );

  return () => {
    dispose();
    unWatch();
  };
}
