/**
 * 判断字符串是否为空
 * @param {String} params 
 */
export default function isEmpty(params) {
    console.log("_"+params+"_");
    if (params == null) {
        return true;
    } else if (params instanceof String) {
        return params.trim.isEmpty
    } else return false;
}