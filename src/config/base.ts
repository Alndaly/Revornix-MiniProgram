console.log("当前小程序环境:", uni.getAccountInfoSync().miniProgram.envVersion);

// 1. Define a type for the environment versions
type EnvironmentVersion = 'release' | 'trial' | 'develop';

// 2. Type the version object with the EnvironmentVersion keys
export const version: Record<EnvironmentVersion, { WS_URL: string; API_URL: string }> = {
    // 正式版
    release: {
        WS_URL: "wss://api.revornix.com/ws",
        API_URL: "https://prod.revornix.com/main-service"
    },
    // 体验版
    trial: {
        WS_URL: "wss://api.revornix.com/ws",
        API_URL: "https://api.revornix.com/main-service"
    },
    // 开发版
    develop: {
        WS_URL: "wss://api.revornix.com/ws",
        API_URL: "https://api.revornix.com/main-service"
        // WS_URL: "ws://localhost:8001/ws",
        // API_URL: "http://localhost:8001",
    },
};


export const URL = version[uni.getAccountInfoSync().miniProgram.envVersion as EnvironmentVersion];
