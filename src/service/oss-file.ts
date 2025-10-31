import { utils } from "@kinda/utils";
import { getAliyunOSSPresignUploadURL } from "./file-system";
import { getMyInfo } from "./user";

export class OSSFileService implements FileServiceProtocol {

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
        const [res_presign_url, err_presign_url] = await utils.to(getAliyunOSSPresignUploadURL({
            file_path: file_path,
            content_type: finalContentType
        }));
        if (err_presign_url || !res_presign_url) {
            throw err_presign_url || new Error("get presign url failed");
        }
        const { upload_url, fields } = res_presign_url;

        let init: RequestInit = {
            method: 'PUT',
            body: file
        }

        if (content_type) {
            init.headers = {
                "Content-Type": content_type
            };
        }

        const response = await uni.request({
            url: upload_url,
            init
        });

        if (response.statusCode >= 300 || response.statusCode < 200) {
            throw new Error('Upload failed: ' + response.errMsg);
        }
    }
}