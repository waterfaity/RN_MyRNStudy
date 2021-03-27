/**
 * 判断字符串是否为空
 * @param {String} params
 */
export default function isEmpty(params: String) {
  return typeof (params) != 'number' && (!params || params === ' ' || params === undefined || typeof (params) == 'undefined');
}