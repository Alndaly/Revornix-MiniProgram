import cache from "./cache";
import { URL } from "../config/base";
import type { TokenResponse } from "@/generated";
import { utils } from "@kinda/utils";

// 定义请求参数接口
interface RequestParams {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD" | "TRACE" | "CONNECT";
    data?: any;
    header?: Record<string, string>;
}

let isRefreshing = false;
let tokenRefreshTimes = 0;
let subscribers: Array<() => void> = [];

// 无需token的API路径列表
const NO_AUTH_APIS: string[] = [];

// 检查URL是否需要认证
function requiresAuth(url: string): boolean {
    return !NO_AUTH_APIS.some((api: string) => {
        return url.endsWith(api) || (api.includes('*') && new RegExp(api.replace('*', '.*')).test(url))
    });
}

// 处理token过期或无token情况
function handleTokenIssue(params: RequestParams): Promise<any> {
    const promise = new Promise((resolve) => {
        // 将当前请求加入订阅队列
        addSubscriber(() => resolve(request(params)));
    });
    // 如果不在刷新中，则开始刷新/获取token
    if (!isRefreshing) {
        updateToken();
    }
    return promise
}

// 添加请求到订阅队列
function addSubscriber(callback: () => void): void {
    subscribers.push(callback);
}

// 执行所有被推迟的请求
function onAccessTokenFetched(): void {
    subscribers.forEach(callback => callback());
    subscribers = []
}

// 请求函数封装
export const request = function (args: RequestParams): Promise<any> {
    // 如果正在刷新 那么直接将任务加入延迟队列
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            addSubscriber(() => resolve(request(args)))
        })
    }
    // 构建请求头
    let header: Record<string, string> = {
        "Accept-Encoding": "gzip, deflate, br",
        "content-type": "application/json"
    };

    // 添加认证头（如果需要）
    if (requiresAuth(args.url)) {
        const authData = cache.directGet("access_token");
        if (authData && authData.data) {
            header.Authorization = "Bearer " + authData.data;
        }
    }

    return new Promise((resolve, reject) => {
        uni.request({
            header,
            ...args,
            success: (res) => {
                if (res.statusCode === 401) {
                    resolve(handleTokenIssue(args));
                    return;
                } else if (res.statusCode >= 300 || res.statusCode < 200) {
                    reject(res);
                    return;
                }
                resolve(res.data);
            },
            fail: (err) => {
                reject(err);
                return;
            },
            complete: (res) => {
                console.log("请求结果:", res, "参数:", args);
            }
        });
    });
};

// 更新Token
async function updateToken(): Promise<any> {
    if (tokenRefreshTimes >= 3) {
        uni.showModal({
            title: "提示",
            content: "Token刷新次数过多，需要重新登录",
            showCancel: false,
            success: (res) => {
                if (res.confirm) {
                    cache.clear()
                    uni.reLaunch({ url: "/pages/document/index" })
                }
            }
        })
        return
    }
    isRefreshing = true;
    tokenRefreshTimes += 1;
    console.log(`开始更新Token, 当前第${tokenRefreshTimes}次`);

    // 如果连access_token都没有的话就说明用户本地认证信息没有，直接获取新Token
    const accessToken = cache.directGet("access_token");
    if (!accessToken) {
        return getToken();
    }

    const refreshToken = cache.get("refresh_token");
    if (!refreshToken) {
        return Promise.reject("无刷新Token，需要重新登录");
    }

    const [res_token, err_token] = await utils.to(uni.request({
        url: URL.API_URL + "/user/token/update",
        data: { refresh_token: refreshToken },
        method: "POST",
    }));

    if (err_token || !res_token || res_token.statusCode !== 200) {
        console.error("Token刷新失败", err_token || res_token);
        return Promise.resolve(updateToken());
    }

    console.log("Token刷新结果:", res_token);

    if (res_token.statusCode === 200) {
        const res_token_data = res_token.data as TokenResponse;
        // 存储新的Token
        cache.set(
            "access_token",
            res_token_data.access_token,
            res_token_data.expires_in
        );
        cache.set("refresh_token", res_token_data.refresh_token);
        console.log("Token刷新完成");
        isRefreshing = false;
        tokenRefreshTimes = 0;

        // 执行所有等待的请求
        onAccessTokenFetched();
    }

}

// 获取Token
async function getToken(): Promise<any> {
    const loginResult = await uni.login();

    const res_token = await uni.request({
        url: URL.API_URL + "/user/create/wechat/mini",
        data: {
            code: loginResult.code,
        },
        method: "POST",
    });
    console.log("获取个人唯一识别Token: ", res_token);

    if (res_token.statusCode !== 200) {
        return Promise.reject(`Token获取失败，${res_token}`)
    }

    const res_token_data = res_token.data as TokenResponse;
    // 存储Token
    cache.set(
        "access_token",
        res_token_data.access_token,
        res_token_data.expires_in
    );
    cache.set("refresh_token", res_token_data.refresh_token);

    console.log("Token获取完成");

    // 执行所有等待的请求
    onAccessTokenFetched();
}
