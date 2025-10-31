import { utils } from "@kinda/utils";
import { getMyInfo } from "./user";
import { getBuiltInPresignUploadURL } from "./file-system";

export class BuiltInFileService implements FileServiceProtocol {

    public async initFileSystemConfig() {
        const [res_user, err_user] = await utils.to(getMyInfo());
        if (err_user || !res_user) {
            throw err_user || new Error("init file system config failed");
        }
        if (!res_user.default_user_file_system) {
            throw new Error("You have not set the default file system");
        }
    }

    async getFileContent(file_path: string): Promise<string | ArrayBuffer | AnyObject> {
        const url = `${file_path}`;
        const res = await uni.request({ url });
        if (res.statusCode >= 300 || res.statusCode < 200) {
            throw new Error(`Request failed with status ${res.statusCode}: ${res.errMsg}`);
        }
        return res.data;
    }

    async uploadFile(file_path: string, file: File, content_type?: string): Promise<any> {
        const finalContentType = content_type || file.type || 'application/octet-stream';
        const [res_presign_url, err_presign_url] = await utils.to(getBuiltInPresignUploadURL({
            file_path: file_path,
            content_type: finalContentType
        }));
        if (err_presign_url || !res_presign_url) {
            throw err_presign_url || new Error("get presign url failed");
        }
        const { upload_url, fields } = res_presign_url;
        const formData = new FormData();

        // 将 fields 中所有键值填入 formData
        Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // 最后 append 文件
        formData.append('file', file);

        const uploadRes = await uni.request({
            url: upload_url,
            method: 'POST',
            body: formData
        });

        if (uploadRes.statusCode >= 300 || uploadRes.statusCode < 200) {
            throw new Error('Upload failed: ' + uploadRes.errMsg);
        }

    }
}