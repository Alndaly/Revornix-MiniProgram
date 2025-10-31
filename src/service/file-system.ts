import { request } from '@/lib/request'
import fileSystemApi from '@/api/file_system'
import type { AliyunOSSPresignUploadURLRequest, AliyunOSSPresignUploadURLResponse, FileSystemInfo, FileSystemInfoRequest, FileSystemInstallRequest, FileSystemInstallResponse, FileSystemSearchRequest, FileUrlPrefixRequest, FileUrlPrefixResponse, MineFileSystemSearchResponse, NormalResponse, ProvideFileSystemSearchResponse, S3PresignUploadURLRequest, S3PresignUploadURLResponse, UserFileSystemDeleteRequest, UserFileSystemInfo, UserFileSystemInfoRequest, UserFileSystemUpdateRequest } from '@/generated'

export const getProvideFileSystems = async (data: FileSystemSearchRequest): Promise<ProvideFileSystemSearchResponse> => {
    return await request({
        url: fileSystemApi.getProvideFileSystems,
        method: 'POST',
        data
    })
}

export const getMineFileSystems = async (data: FileSystemSearchRequest): Promise<MineFileSystemSearchResponse> => {
    return await request({
        url: fileSystemApi.getMineFileSystems,
        method: 'POST',
        data
    })
}

export const installFileSystem = async (data: FileSystemInstallRequest): Promise<FileSystemInstallResponse> => {
    return await request({
        url: fileSystemApi.installFileSystem,
        method: 'POST',
        data
    })
}

export const updateFileSystem = async (data: UserFileSystemUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: fileSystemApi.updateFileSystem,
        method: 'POST',
        data
    })
}

export const deleteUserFileSystem = async (data: UserFileSystemDeleteRequest): Promise<NormalResponse> => {
    return await request({
        url: fileSystemApi.deleteUserFileSystem,
        method: 'POST',
        data
    })
}

export const getFileSystemDetail = async (data: FileSystemInfoRequest): Promise<FileSystemInfo> => {
    return await request({
        url: fileSystemApi.getFileSystemDetail,
        method: 'POST',
        data
    })
}

export const getUserFileSystemDetail = async (data: UserFileSystemInfoRequest): Promise<UserFileSystemInfo> => {
    return await request({
        url: fileSystemApi.getUserFileSystemDetail,
        method: 'POST',
        data
    })
}

export const getAliyunOSSPresignUploadURL = async (data: AliyunOSSPresignUploadURLRequest): Promise<AliyunOSSPresignUploadURLResponse> => {
    return await request({
        url: fileSystemApi.getAliyunOSSPresignUploadURL,
        method: 'POST',
        data
    })
}

export const getAWSS3PresignUploadURL = async (data: S3PresignUploadURLRequest): Promise<S3PresignUploadURLResponse> => {
    return await request({
        url: fileSystemApi.getAWSS3PresignUploadURL,
        method: 'POST',
        data
    })
}

export const getBuiltInPresignUploadURL = async (data: S3PresignUploadURLRequest): Promise<S3PresignUploadURLResponse> => {
    return await request({
        url: fileSystemApi.getBuiltInPresignUploadURL,
        method: 'POST',
        data
    })
}

export const getUserFileUrlPrefix = async (data: FileUrlPrefixRequest): Promise<FileUrlPrefixResponse> => {
    return await request({
        url: fileSystemApi.getUserFileUrlPrefix,
        method: 'POST',
        data
    })
}