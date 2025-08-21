import { URL } from "@/config/base"

export default {
    getMineFileSystems: URL.API_URL + '/file-system/mine',
    getProvideFileSystems: URL.API_URL + '/file-system/provide',
    installFileSystem: URL.API_URL + '/file-system/install',
    updateFileSystem: URL.API_URL + '/file-system/update',
    getFileSystemDetail: URL.API_URL + '/file-system/detail',
    getUserFileSystemDetail: URL.API_URL + '/file-system/user-file-system/detail',
    getAliyunOSSPresignUploadURL: URL.API_URL + "/file-system/aliyun-oss/presign-upload-url",
    getAWSS3PresignUploadURL: URL.API_URL + "/file-system/aws-s3/presign-upload-url",
    getBuiltInPresignUploadURL: URL.API_URL + "/file-system/built-in/presign-upload-url",
    getUserFileUrlPrefix: URL.API_URL + "/file-system/url-prefix",
    deleteUserFileSystem: URL.API_URL + "/file-system/user-file-system/delete",
    uploadFileToGenericFileSystem: URL.API_URL + "/file-system/generic-s3/upload",
}