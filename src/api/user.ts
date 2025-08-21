import { URL } from "@/config/base"

export default {
    getUserFans: URL.API_URL + '/user/fans',
    getUserFollows: URL.API_URL + '/user/follows',
    createEmailCode: URL.API_URL + '/user/create/email/code',
    createEmailUserVerify: URL.API_URL + '/user/create/email/verify',
    myInfo: URL.API_URL + '/user/mine/info',
    userInfo: URL.API_URL + '/user/info',
    followUser: URL.API_URL + '/user/follow',
    loginUser: URL.API_URL + '/user/login',
    updateToken: URL.API_URL + '/user/token/update',
    updateUserInfo: URL.API_URL + '/user/update',
    updatePassword: URL.API_URL + '/user/password/update',
    updatePasswordEmailCode: URL.API_URL + '/user/password/update/email/code',
    deleteUser: URL.API_URL + '/user/delete',
    bindEmailCode: URL.API_URL + '/user/bind/email/code',
    bindEmailVerify: URL.API_URL + '/user/bind/email/verify',
    unBindEmail: URL.API_URL + '/user/unbind/email',
    initialPassword: URL.API_URL + '/user/password/initial-see',
    updateDefaultModel: URL.API_URL + '/user/default-model/update',
    updateDefaultEngine: URL.API_URL + '/user/default-engine/update',
    updateDefaultReadMarkReason: URL.API_URL + '/user/read-mark-reason/update',
    updateDefaultFileSystem: URL.API_URL + '/user/default-file-system/update'
} 