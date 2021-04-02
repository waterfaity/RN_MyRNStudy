import HttpRequest from './HttpRequest';
import BaseCallback from './BaseCallback';
import CookMenu from '../data/CookMenu';
import UserBean from '../data/UserBean';
import BaseListPageBean from './BaseListPageBean';
import BaseResponse from './BaseResponse';
import CommendBean from '../data/CommendBean';

class RequestService {
  /**
   * 登陆
   * @param account
   * @param password
   * @param callback
   */
  login(account, password, callback: BaseCallback<BaseResponse<UserBean>>) {
    const api = '/user/login';
    HttpRequest.requestPost(api, { account: account, password: password }, callback);
  }

  /**
   * 查询轮播图
   */
  queryBanner(callback: BaseCallback<BaseResponse<Array<CookMenu>>>) {
    const api = '/banner/queryBannerList';
    HttpRequest.requestGet(api, null, callback);
  }

  /**
   * 查询菜谱
   * @param pageNo
   * @param pageSize
   * @param callback
   */
  queryCookList(pageNo: number, pageSize: number, callback: BaseCallback<BaseResponse<BaseListPageBean<CookMenu>>>) {
    const api = '/cookMenu/queryCookMenuList';
    HttpRequest.requestGet(api, { pageNo: pageNo, pageSize: pageSize }, callback);
  }

  /**
   * 查询菜谱详情
   * @param cookMenuId
   * @param callBack
   */
  queryCookMenuDetail(cookMenuId: number, callBack: BaseCallback<BaseResponse<CookMenu>>) {
    const api = '/cookMenu/queryCookMenuDetailById';
    HttpRequest.requestGet(api, { cookMenuId: cookMenuId }, callBack);
  }

  /**
   * 查询菜谱评论
   * @param userId
   * @param cookMenuId
   * @param pageNo
   * @param pageSize
   * @param callback
   */
  queryCookCommendList(userId: String, cookMenuId: number, pageNo: number, pageSize: number, callback: BaseCallback<BaseResponse<BaseListPageBean<CommendBean>>>) {
    const api = '/cookMenu/queryCommentList';
    HttpRequest.requestGet(api, {
      userId: userId,
      cookMenuId: cookMenuId,
      pageNo: pageNo,
      pageSize: pageSize
    }, callback);
  }

  /**
   * 点赞
   * @param userId
   * @param commentId
   * @param praise
   * @param callback
   */
  cookMenuCommentPraise(userId: String, commentId: number, praise: number, callback: BaseCallback<BaseResponse<{
    commentId: number,
    userId: String,
    praise: number
  }>>) {
    const api = '/cookMenu/praise';
    HttpRequest.requestPost(api, { userId: userId, commentId: commentId, praise: praise }, callback);
  }

  /**
   * 添加评论
   * @param userId
   * @param cookMenuId
   * @param parentId
   * @param content
   * @param callback
   */
  cookMenuCommentAddComment(userId: String, cookMenuId: number, parentId: number, content: String, callback: BaseCallback<BaseResponse<{
    commentId: number,
    userId: String,
    praise: number
  }>>) {
    const api = '/cookMenu/addComment';
    HttpRequest.requestPost(api, { userId: userId, cookMenuId: cookMenuId, parentId: parentId, content: content }, callback);
  }
}

const requestService = new RequestService();
export default requestService;