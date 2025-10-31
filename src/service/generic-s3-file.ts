import fileSystemApi from '@/api/file_system';
import { utils } from "@kinda/utils";
import { getMyInfo } from "./user";

export class GenericFileService implements FileServiceProtocol {

    public async initFileSystemConfig() {
        const [res_user, err_user] = await utils.to(getMyInfo());
        if (err_user || !res_user) {
            throw err_user || new Error("init file system config failed");
        }
        if (!res_user.default_user_file_system) {
            throw new Error("You have not set the default file system");
        }
    }

    async getFileContent(file_path: string): Promise<string | Blob | ArrayBuffer> {
        const url = `${file_path}`;
        const res = await uni.request({ url });
        if (res.statusCode >= 300 || res.statusCode < 200) {
            throw new Error(`Request failed with status ${res.statusCode}: ${res.errMsg}`);
        }
        return res.data;
    }

    async uploadFile(file_path: string, file: File, content_type?: string): Promise<any> {
        const finalContentType = content_type || file.type || 'application/octet-stream';
        const formData = new FormData();

        formData.append('file_path', file_path);
        formData.append('content_type', finalContentType);

        // 最后 append 文件
        formData.append('file', file);

        await uni.request({
            url: fileSystemApi.uploadFileToGenericFileSystem,
            method: 'POST',
            formData: formData
        });

    }
}