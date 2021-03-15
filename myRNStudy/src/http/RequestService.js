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
        const url = "/user/login";
        HttpRequest.requestPost(url, {account: account, password: password}, callback);
    }

    /**
     * 查询轮播图
     */
    queryBanner(callback: BaseCallback<BaseResponse<Array<CookMenu>>>) {
        const url = "/banner/queryBannerList";
        HttpRequest.requestGet(url, null, callback);
    }

    /**
     * 查询菜谱
     * @param pageNo
     * @param pageSize
     * @param callback
     */
    queryCookList(pageNo: number, pageSize: number, callback: BaseCallback<BaseResponse<BaseListPageBean<CookMenu>>>) {
        const url = "/cookMenu/queryCookMenuList";
        HttpRequest.requestGet(url, {pageNo: pageNo, pageSize: pageSize}, callback);
    }
}

const requestService = new RequestService();
export default requestService;