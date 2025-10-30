interface StorageData<T = any> {
    data: T;
    saveTime: number;
    expire: number | null;
}

class CacheManager {
    /**
     * 设置缓存
     * @param key 存储键
     * @param val 存储值
     * @param expire 过期时间（分钟）
     */
    set<T>(key: string, val: T, expire?: number): void {
        try {
            const saveTime = new Date().getTime();
            const expireTime = expire ? 1000 * 60 * expire : null;

            uni.setStorageSync(key, JSON.stringify({
                data: val,
                saveTime,
                expire: expireTime
            }));
        } catch (e) {
            console.error('设置缓存失败:', e);
        }
    }

    /**
     * 判断缓存是否过期
     * @param key 存储键
     * @returns 是否过期
     */
    expired(key: string): boolean {
        try {
            const dataStr = uni.getStorageSync(key);
            if (!dataStr) return true;

            const dataObj: StorageData = JSON.parse(dataStr);

            // 永不过期或未过期
            if (dataObj.expire === null) return false;
            if (new Date().getTime() - dataObj.saveTime <= dataObj.expire) return false;

            // 已过期，自动清理
            this.remove(key);
            return true;
        } catch (e) {
            console.error('检查缓存过期状态失败:', e);
            return true;
        }
    }

    /**
     * 直接获取存储的原始数据（不做过期判断）
     * @param key 存储键
     * @returns 存储数据或null
     */
    directGet<T = any>(key: string): StorageData<T> | null {
        try {
            const dataStr = uni.getStorageSync(key);
            if (!dataStr) return null;

            return JSON.parse(dataStr) as StorageData<T>;
        } catch (e) {
            console.error('获取缓存失败:', e);
            return null;
        }
    }

    /**
     * 获取缓存值（会自动判断是否过期）
     * @param key 存储键
     * @returns 存储值或null
     */
    get<T = any>(key: string): T | null {
        try {
            if (this.expired(key)) return null;

            const dataObj = this.directGet<T>(key);
            return dataObj ? dataObj.data : null;
        } catch (e) {
            console.error('获取缓存值失败:', e);
            return null;
        }
    }

    /**
     * 移除指定缓存
     * @param key 存储键
     */
    remove(key: string): void {
        try {
            uni.removeStorageSync(key);
        } catch (e) {
            console.error('移除缓存失败:', e);
        }
    }

    /**
     * 清空所有缓存
     */
    clear(): void {
        try {
            uni.clearStorageSync();
        } catch (e) {
            console.error('清空缓存失败:', e);
        }
    }

    /**
     * 获取所有缓存键
     * @returns 缓存键列表
     */
    getAllKeys(): string[] {
        try {
            const { keys } = uni.getStorageInfoSync();
            return keys;
        } catch (e) {
            console.error('获取缓存键列表失败:', e);
            return [];
        }
    }

    /**
     * 获取缓存信息（大小、限制等）
     * @returns 缓存信息
     */
    getStorageInfo() {
        try {
            return uni.getStorageInfoSync();
        } catch (e) {
            console.error('获取缓存信息失败:', e);
        }
    }
}

// 创建单例实例
const cache = new CacheManager();

export default cache;