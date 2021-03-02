import { BASE_URL } from "./HttpConfig";
import ResponseError from "./ResponseError";

export default function HttpRequest() {

}

HttpRequest.requestGet = function(api, params, callback, baseUrl) {
    if (baseUrl === undefined) baseUrl = BASE_URL;
    let url = baseUrl + api;

    if (params !== null && params !== undefined) {
        url += "?";
        Object.keys(params).forEach((key, index) => {
            url += ((index === 0 ? "" : "&") + key + "=" + params[key]);
        });
    }
    //console.log("request: " + url);
    request(fetch(url), callback);
};

HttpRequest.requestPost = function(api, params, callback, baseUrl) {
    if (baseUrl === undefined) baseUrl = BASE_URL;
    let url = baseUrl + api;
    let urlLog = url;
    const formParams = new FormData();
    if (params !== undefined) {
        urlLog += "?";
        Object.keys(params).forEach((key, index) => {
            formParams.append(key, params[key]);
            urlLog += ((index === 0 ? "" : "&") + key + "=" + params[key]);
        });
    }
    //console.log("request: " + urlLog);
    request(fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data", //数据格式 json或者key-value形式
        },
        body: formParams,
    }), callback);
};


function request(responsePromise, callback) {
    responsePromise
        .then(response => {
            if (response.status !== 200) {
                throw new ResponseError(response.status, "请求失败");
            }
            return response.json();
        })
        .then((result) => {
            if (result.resultCode !== 0) {
                throw new ResponseError(result.resultCode, result.msg);
            }
            //console.log("result: " + JSON.stringify(result));
            callback.onSuccess(result);
        })
        .catch((err) => {
            //console.log("result: " + (err.errCode || -1) + ":" + err.message);
            callback.onError(err.errCode || -1, err.message);
        });
}


