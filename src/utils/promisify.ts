// 提取成功回调的参数类型
type SuccessParam<T> = T extends { success?: (res: infer R) => void } ? R : never;

// Promise 化函数类型
type Promisified<T extends (options: any) => any> = (
    options?: Omit<Parameters<T>[0], 'success' | 'fail' | 'complete'>
) => Promise<SuccessParam<Parameters<T>[0]>>;

// Promise 化装饰器
function promisify<T extends (options: any) => any>(fn: T): Promisified<T> {
    return function (options?: Omit<Parameters<T>[0], 'success' | 'fail' | 'complete'>): Promise<SuccessParam<Parameters<T>[0]>> {
        return new Promise((resolve, reject) => {
            fn({
                ...options,
                success: (res: any) => resolve(res),
                fail: (err: any) => reject(err),
            });
        });
    };
}

export { promisify };