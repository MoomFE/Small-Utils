/**
 * 判断字符串是否是电子邮件地址的正则字符串
 */
export const isEmailRegStr = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

/**
 * 判断字符串是否是电子邮件地址的正则
 */
export const isEmailReg = new RegExp(isEmailRegStr);

/**
 * 判断字符串是否是电子邮件地址
 * @param {any}} value 需要判断的参数
 * @returns {Boolean}
 */
export function isEmail(value) {
  return isEmailReg.test(value);
}
