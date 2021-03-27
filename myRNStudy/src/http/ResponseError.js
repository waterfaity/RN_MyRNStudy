export default function ResponseError(errCode, errMsg) {
  this.name = 'ResponseError';
  this.message = errMsg || '请求异常';
  this.errCode = errCode;
}
ResponseError.prototype = Object.create(Error.prototype);
ResponseError.prototype.constructor = ResponseError;