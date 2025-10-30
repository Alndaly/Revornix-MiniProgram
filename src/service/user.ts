import userApi from '@/api/user'
import { BindEmailVerifyRequest, BindPhoneCodeCreateRequest, BindPhoneCodeVerifyRequest, DefaultEngineUpdateRequest, DefaultFileSystemUpdateRequest, DefaultModelUpdateRequest, DefaultReadMarkReasonUpdateRequest, EmailUserCreateVerifyRequest, FollowUserRequest, GithubUserBind, GithubUserCreate, GoogleUserBind, GoogleUserCreate, InifiniteScrollPagnitionUserPublicInfo, InitialPasswordResponse, NormalResponse, PasswordUpdateRequest, PrivateUserInfo, SearchUserFansRequest, SearchUserFollowsRequest, SearchUserRequest, SmsUserCodeCreateRequest, SmsUserCodeVerifyCreate, TokenResponse, UserInfoRequest, UserInfoUpdateRequest, UserLoginRequest, UserPublicInfo, WeChatUserBindRequest, WeChatUserCreateRequest } from '@/generated';
import { request } from '@/utils/request';

export const searchUser = async (data: SearchUserRequest): Promise<InifiniteScrollPagnitionUserPublicInfo> => {
    return await request({
        url: userApi.searchUser,
        data
    })
}

export const getUserFans = async (data: SearchUserFansRequest): Promise<InifiniteScrollPagnitionUserPublicInfo> => {
    return await request({
        url: userApi.getUserFans,
        data
    })
}

export const getUserFollows = async (data: SearchUserFollowsRequest): Promise<InifiniteScrollPagnitionUserPublicInfo> => {
    return await request({
        url: userApi.getUserFollows,
        data
    })
}

export const followUser = async (data: FollowUserRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.followUser,
        data
    })
}

export const getUserInfo = async (data: UserInfoRequest): Promise<UserPublicInfo> => {
    return await request({
        url: userApi.userInfo,
        data
    })
}

export const updateToken = async (refresh_token: string): Promise<TokenResponse> => {
    return await request({
        url: userApi.updateToken,
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
        data
    })
}

export const deleteUser = async (): Promise<NormalResponse> => {
    return await request({ url: userApi.deleteUser })
}

export const loginUser = async (data: UserLoginRequest): Promise<TokenResponse> => {
    return await request({
        url: userApi.loginUser,
        data
    })
}

export const getMyInfo = async (): Promise<PrivateUserInfo> => {
    return await request({ url: userApi.myInfo })
}

export const getMyInitialPassword = async (): Promise<InitialPasswordResponse> => {
    return await request({ url: userApi.initialPassword })
}

export const updateUserInfo = async (data: UserInfoUpdateRequest): Promise<NormalResponse> => {
    return await request({ url: userApi.updateUserInfo, data })
}

export const updateUserDefaultReadMarkReason = async (data: DefaultReadMarkReasonUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.updateDefaultReadMarkReason,
        data
    })
}

export const updateUserDefaultModel = async (data: DefaultModelUpdateRequest): Promise<NormalResponse> => {
    return await request(userApi.updateDefaultModel, { data })
}

export const updateUserDefaultFileSystem = async (data: DefaultFileSystemUpdateRequest): Promise<NormalResponse> => {
    return await request(userApi.updateDefaultFileSystem, { data })
}

export const updateUserDefaultEngine = async (data: DefaultEngineUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.updateDefaultEngine,
        data
    })
}

export const updatePasswordEmailCode = async (): Promise<NormalResponse> => {
    return await request({ url: userApi.updatePasswordEmailCode })
}

export const updatePassword = async (data: PasswordUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.updatePassword,
        data
    })
}

export const bindEmailVerify = async (data: BindEmailVerifyRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.bindEmailVerify,
        data
    })
}

export const createUserByGoogle = async (data: GoogleUserCreate): Promise<TokenResponse> => {
    return await request({
        url: userApi.createUserByGoogle,
        data
    })
}

export const createUserByGithub = async (data: GithubUserCreate): Promise<TokenResponse> => {
    return await request({
        url: userApi.createUserByGithub,
        data
    })
}

export const bindGitHub = async (data: GithubUserBind) => {
    return await request({
        url: userApi.bindGitHub,
        data
    })
}

export const bindGoogle = async (data: GoogleUserBind) => {
    return await request({
        url: userApi.bindGoogle,
        data
    })
}

export const unBindGitHub = async () => {
    return await request({ url: userApi.unBindGitHub })
}

export const unBindGoogle = async () => {
    return await request({ url: userApi.unBindGoogle })
}

export const createUserSMSCode = async (data: SmsUserCodeCreateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.createSMSCode,
        data
    })
}

export const createSMSUserVerify = async (data: SmsUserCodeVerifyCreate): Promise<TokenResponse> => {
    return await request({
        url: userApi.createSMSUserVerify,
        data
    })
}

export const bindPhoneCode = async (data: BindPhoneCodeCreateRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.bindPhoneCode,
        data
    })
}

export const bindPhoneVerify = async (data: BindPhoneCodeVerifyRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.bindPhoneVerify,
        data
    })
}

export const unBindPhone = async () => {
    return await request({ url: userApi.unBindPhone })
}

export const createUserByWechat = async (data: WeChatUserCreateRequest): Promise<TokenResponse> => {
    return await request({
        url: userApi.createUserByWechat,
        data
    })
}

export const bindWeChat = async (data: WeChatUserBindRequest): Promise<NormalResponse> => {
    return await request({
        url: userApi.bindWeChat,
        data
    })
}

export const unBindWeChat = async () => {
    return await request({ url: userApi.unBindWeChat })
}