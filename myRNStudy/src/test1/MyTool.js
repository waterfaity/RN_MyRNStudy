import MyListener from './MyListener';
import MyParam from './MyParam';
import MyData from './MyData';
import Response from './Response';

export default class MyTool {
  listener: MyListener;

  /**
   *
   * @param myParam
   */
  request(myParam: MyParam): Promise<Response<MyData>> {
    return new Promise(function (resolve, reject) {
      if (myParam.id !== 0) {
        resolve(new Response(new MyData(myParam.id, 12, '李磊')));
      } else {
        reject({ resultCode: -1, msg: '未查询到数据' });
      }
    });
  }

  /**
   * 获取数据
   */
  getData(myParam: MyParam) {
    console.log('这是 listener:' + this.listener);
    //function (myData) {
    //         _this.setState({
    //           myData: JSON.stringify(myData.name)
    //         });
    //       }
    this.listener.onGetData(new MyData(myParam.id, 12, '李磊'));
  }
}