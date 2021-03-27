export default class Response<T> {

  constructor(data: T) {
    this.data = data;
    this.resultCode = 0;
    this.msg = '成功';
  }

  resultCode: number;
  data: T;
  msg: String;

}
