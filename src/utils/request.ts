import cache from "./cache";
import { URL } from "../config/base";

// 定义请求参数接口
interface RequestParams {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD" | "TRACE" | "CONNECT";
    data?: any;
    header?: Record<string, string>;
    dataType?: string;
    responseType?: string;
    success?: (result: any) => void;
    fail?: (error: any) => void;
    complete?: () => void;
}

// 定义API响应接口
interface ApiResponse<T = any> {
    data?: T;
    code: number;
    message: string;
    [key: string]: any;
}

// Token管理状态接口
interface TokenState {
    isRefreshing: boolean;    // 是否正在刷新token
    subscribers: Array<() => void>; // 等待token刷新的请求队列
    hasToken: boolean;        // 是否有有效token
    tokenChecked: boolean;    // 是否已检查过token
}

// Token管理状态
const tokenState: TokenState = {
    isRefreshing: false,
    subscribers: [],
    hasToken: false,
    tokenChecked: false,
};

// 无需token的API路径列表
const NO_AUTH_APIS: string[] = [];

// 检查URL是否需要认证
function requiresAuth(url: string): boolean {
    return !NO_AUTH_APIS.some(api =>
        url.endsWith(api) ||
        (api.includes('*') && new RegExp(api.replace('*', '.*')).test(url))
    );
}

// 处理token过期或无token情况
function handleTokenIssue(params: RequestParams): Promise<any> {
    // 将当前请求加入订阅队列
    return new Promise((resolve) => {
        addSubscriber(() => {
            resolve(request(params));
        });

        // 如果不在刷新中，则开始刷新/获取token
        if (!tokenState.isRefreshing) {
            tokenState.isRefreshing = true;
            updateToken().finally(() => {
                tokenState.isRefreshing = false;
            });
        }
    });
}

// 添加请求到订阅队列
function addSubscriber(callback: () => void): void {
    tokenState.subscribers.push(callback);
}

// 执行所有订阅的请求
function onAccessTokenFetched(): void {
    tokenState.subscribers.forEach(callback => callback());
    tokenState.subscribers = [];
}

// 请求函数封装
export const request = function (args: RequestParams): Promise<any> {
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
            success: (res: any) => {
                console.log("请求结果:", res, "参数:", args);
                if (res.statusCode === 401) {
                    console.log(222)
                    resolve(handleTokenIssue(args));
                    return;
                }
                resolve(res);
            },
            fail: (err: any) => {
                console.error("请求失败:", err, "参数:", args);
                reject(err);
                uni.showToast({
                    title: "网络出错",
                    icon: "error",
                });
            },
        });
    });
};

// 显示重新登录模态框
function showReloginModal(): void {
    uni.showModal({
        showCancel: false,
        title: "提醒",
        content: "请重新登录",
        success(res) {
            cache.clear();
            if (res.confirm) {
                uni.navigateTo({
                    url: "/pages/authPage/index"
                });
            }
        },
    });
}

// 获取Token
async function getToken(): Promise<void> {
    console.log("开始获取Token");
    try {
        const loginResult = await new Promise<UniApp.LoginRes>((resolve, reject) => {
            uni.login({
                success: resolve,
                fail: reject
            });
        });

        const res_token = await uni.request({
            url: URL.API_URL + "/user/create/wechat/mini",
            data: {
                code: loginResult.code,
            },
            method: "POST",
        });
        console.log("获取个人唯一识别Token: ", res_token);

        // 存储Token
        cache.set(
            "access_token",
            res_token.data.access_token,
            res_token.data.expires_in
        );
        cache.set("refresh_token", res_token.data.refresh_token);

        console.log("Token获取完成");
        tokenState.hasToken = true;
        tokenState.tokenChecked = true;

        // 执行所有等待的请求
        onAccessTokenFetched();
    } catch (err) {
        console.error("Token获取失败", err);
    }
}

// 更新Token
async function updateToken(): Promise<void> {
    console.log("开始更新Token");

    const accessToken = cache.directGet("access_token");
    if (!accessToken) {
        console.log("无有效Token，转向获取新Token");
        return getToken();
    }

    const refreshToken = cache.get("refresh_token");
    if (!refreshToken) {
        console.log("无刷新Token，需要重新登录");
        showReloginModal();
        return;
    }

    try {
        const res_token = await new Promise<any>((resolve, reject) => {
            uni.request({
                url: URL.API_URL + "/user/token/update",
                data: { refresh_token: refreshToken },
                method: "POST",
                success: resolve,
                fail: reject,
            });
        });

        console.log("Token刷新结果:", res_token);
        const response: ApiResponse = res_token.data;

        if (response.code === 20003 && response.message === "请重新登录") {
            console.log("刷新Token失败，需要重新登录");
            showReloginModal();
        } else if (response.code === 20000) {
            // 存储新的Token
            cache.set(
                "access_token",
                response.data.access_token,
                response.data.expires_in
            );
            cache.set("refresh_token", response.data.refresh_token);

            console.log("Token更新完成");
            tokenState.hasToken = true;

            // 执行所有等待的请求
            onAccessTokenFetched();
        } else {
            console.error("刷新Token未知错误", res_token);
        }
    } catch (err) {
        console.error("刷新Token请求失败", err);
    }
}