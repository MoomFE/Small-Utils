import isFunction from './isFunction';


/**
 * 判断传入参数是否是类似于 Promise 的对象
 *
 * @param {any} value 需要判断的参数
 * @returns {Boolean}
 * @example
 *
 * isPromise(new Promise(() => {})) // -> true
 * isPromise(Promise.resolve()) // -> true
 * isPromise(Promise.reject()) // -> true
 * isPromise({ then() {}, catch() {} }) // -> true
 * isPromise({ then: true, catch: true }) // -> false
 * isPromise({ then: true }) // -> false
 * isPromise({}) // -> false
 * isPromise(null) // -> false
 */
function isPromise(value) {
  return value != null && isFunction(value.then) && isFunction(value.catch);
}

export { isPromise }
export default isPromise