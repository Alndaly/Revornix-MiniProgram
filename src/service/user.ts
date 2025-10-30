import userApi from '@/api/user'
import type { BindEmailVerifyRequest, BindPhoneCodeCreateRequest, BindPhoneCodeVerifyRequest, DefaultEngineUpdateRequest, DefaultFileSystemUpdateRequest, DefaultModelUpdateRequest, DefaultReadMarkReasonUpdateRequest, EmailUserCreateVerifyRequest, FollowUserRequest, GithubUserBind, GithubUserCreate, GoogleUserBind, GoogleUserCreate, InifiniteScrollPagnitionUserPublicInfo, InitialPasswordResponse, NormalResponse, PasswordUpdateRequest, PrivateUserInfo, SearchUserFansRequest, SearchUserFollowsRequest, SearchUserRequest, SmsUserCodeCreateRequest, SmsUserCodeVerifyCreate, TokenResponse, UserInfoRequest, UserInfoUpdateRequest, UserLoginRequest, UserPublicInfo, WeChatUserBindRequest, WeChatUserCreateRequest } from '@/generated';
import { request } from '@/lib/request';

export const searchUser = async (data: SearchUserRequest): Promise<InifiniteScrollPagnitionUserPublicInfo> => {
    return await request({
        url: userApi.searchUser,
        method: 'POST',
        data
    })
}

export const getUserFans = async (data: SearchUserFansRequest): Promise<InifiniteScrollPagnitionUserPublicInfo> => {
    return await request({
        url: userApi.getUserFans,
        method: 'POST',
        data
    })
}

export const getUserFollows = async (data: SearchUserFollowsRequest): Promise<InifiniteScrollPagnitionUserPublicInfo> => {
    return await request({
        url: userApi.getUserFollows,
        method: 'POST',
        data
    })
}

export const followUser = async (data: FollowUserRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.followUser,
        method: 'POST',
        data
    })
}

export const getUserInfo = async (data: UserInfoRequest): Promise<UserPublicInfo> => {
    return await request({
        url: userApi.userInfo,
        method: 'POST',
        data
    })
}

export const updateToken = async (refresh_token: string): Promise<TokenResponse> => {
    return await request({
        url: userApi.updateToken,
        method: 'POST',
        data: {
            refresh_token
        }
    })
}

export const unBindEmail = async () => {
    return await request({ url: userApi.unBindEmail })
}

export const createEmailUserVerify = async (data: EmailUserCreateVerifyRequest): Promise<TokenResponse> => {
    return await request({
        url: userApi.createEmailUserVerify,
        method: 'POST',
        data
    })
}

export const deleteUser = async (): Promise<NormalResponse> => {
    return await request({
        url: userApi.deleteUser,
        method: 'POST',
    })
}

export const loginUser = async (data: UserLoginRequest): Promise<TokenResponse> => {
    return await request({
        url: userApi.loginUser,
        method: 'POST',
        data
    })
}

export const getMyInfo = async (): Promise<PrivateUserInfo> => {
    return await request({
        url: userApi.myInfo,
        method: 'POST'
    })
}

export const getMyInitialPassword = async (): Promise<InitialPasswordResponse> => {
    return await request({
        url: userApi.initialPassword,
        method: 'POST'
    })
}

export const updateUserInfo = async (data: UserInfoUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.updateUserInfo,
        method: 'POST', data
    })
}

export const updateUserDefaultReadMarkReason = async (data: DefaultReadMarkReasonUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.updateDefaultReadMarkReason,
        method: 'POST',
        data
    })
}

export const updateUserDefaultModel = async (data: DefaultModelUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.updateDefaultModel,
        method: 'POST',
        data
    })
}

export const updateUserDefaultFileSystem = async (data: DefaultFileSystemUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.updateDefaultFileSystem,
        method: 'POST',
        data
    })
}

export const updateUserDefaultEngine = async (data: DefaultEngineUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.updateDefaultEngine,
        method: 'POST',
        data
    })
}

export const updatePasswordEmailCode = async (): Promise<NormalResponse> => {
    return await request({
        url: userApi.updatePasswordEmailCode,
        method: 'POST',
    })
}

export const updatePassword = async (data: PasswordUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.updatePassword,
        method: 'POST',
        data
    })
}

export const bindEmailVerify = async (data: BindEmailVerifyRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.bindEmailVerify,
        method: 'POST',
        data
    })
}

export const createUserByGoogle = async (data: GoogleUserCreate): Promise<TokenResponse> => {
    return await request({
        url: userApi.createUserByGoogle,
        method: 'POST',
        data
    })
}

export const createUserByGithub = async (data: GithubUserCreate): Promise<TokenResponse> => {
    return await request({
        url: userApi.createUserByGithub,
        method: 'POST',
        data
    })
}

export const bindGitHub = async (data: GithubUserBind) => {
    return await request({
        url: userApi.bindGitHub,
        method: 'POST',
        data
    })
}

export const bindGoogle = async (data: GoogleUserBind) => {
    return await request({
        url: userApi.bindGoogle,
        method: 'POST',
        data
    })
}

export const unBindGitHub = async () => {
    return await request({
        url: userApi.unBindGitHub,
        method: 'POST',
    })
}

export const unBindGoogle = async () => {
    return await request({
        url: userApi.unBindGoogle,
        method: 'POST',
    })
}

export const createUserSMSCode = async (data: SmsUserCodeCreateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.createSMSCode,
        method: 'POST',
        data
    })
}

export const createSMSUserVerify = async (data: SmsUserCodeVerifyCreate): Promise<TokenResponse> => {
    return await request({
        url: userApi.createSMSUserVerify,
        method: 'POST',
        data
    })
}

export const bindPhoneCode = async (data: BindPhoneCodeCreateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.bindPhoneCode,
        method: 'POST',
        data
    })
}

export const bindPhoneVerify = async (data: BindPhoneCodeVerifyRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.bindPhoneVerify,
        method: 'POST',
        data
    })
}

export const unBindPhone = async () => {
    return await request({
        url: userApi.unBindPhone,
        method: 'POST',
    })
}

export const createUserByWechat = async (data: WeChatUserCreateRequest): Promise<TokenResponse> => {
    return await request({
        url: userApi.createUserByWechat,
        method: 'POST',
        data
    })
}

export const bindWeChat = async (data: WeChatUserBindRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.bindWeChat,
        method: 'POST',
        data
    })
}

export const unBindWeChat = async () => {
    return await request({
        url: userApi.unBindWeChat,
        method: 'POST',
    })
}