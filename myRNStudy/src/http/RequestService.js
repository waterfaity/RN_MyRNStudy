import HttpRequest from "./HttpRequest";

class RequestService {
    /**
     * 登陆
     * @param account
     * @param password
     * @param callback
     */
    login(account, password, callback) {
        const url = "/user/login";
        HttpRequest.requestPost(url, { account: account, password: password }, callback);
    }

    /**
     * 查询轮播图
     */
    queryBanner(callback) {
        const url = "/banner/queryBannerList";
        HttpRequest.requestGet(url, null, callback);
    }
}

const requestService = new RequestService();
export default requestService;