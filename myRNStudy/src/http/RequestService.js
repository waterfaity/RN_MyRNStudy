import HttpRequest from "./HttpRequest";
import BaseCallback from "./BaseCallback";
import CookMenu from "../data/CookMenu";
import BaseListPageBean from "./BaseListPageBean";
import BaseResponse from "./BaseResponse";

class RequestService {
    /**
     * 登陆
     * @param account
     * @param password
     * @param callback
     */
    login(account, password, callback) {
        const api = "/user/login";
        HttpRequest.requestPost(api, {account: account, password: password}, callback);
    }

    /**
     * 查询轮播图
     */
    queryBanner(callback: BaseCallback<BaseResponse<Array<CookMenu>>>) {
        const api = "/banner/queryBannerList";
        HttpRequest.requestGet(api, null, callback);
    }

    /**
     * 查询菜谱
     * @param pageNo
     * @param pageSize
     * @param callback
     */
    queryCookList(pageNo: number, pageSize: number, callback: BaseCallback<BaseResponse<BaseListPageBean<CookMenu>>>) {
        const api = "/cookMenu/queryCookMenuList";
        HttpRequest.requestGet(api, {pageNo: pageNo, pageSize: pageSize}, callback);
    }

    /**
     * 查询菜谱详情
     * @param cookMenuId
     * @param callBack
     */
    queryCookMenuDetail(cookMenuId: number, callBack: BaseCallback<BaseResponse<CookMenu>>) {
        const api = "/cookMenu/queryCookMenuDetailById";
        HttpRequest.requestGet(api, {cookMenuId: cookMenuId}, callBack);
    }
}

const requestService = new RequestService();
export default requestService;