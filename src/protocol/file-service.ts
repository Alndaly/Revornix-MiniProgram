interface FileServiceProtocol {
    initFileSystemConfig(): Promise<any>;
    getFileContent(file_path: string): Promise<string | AnyObject | ArrayBuffer>;
    uploadFile(file_path: string, file: File, content_type?: string): Promise<any>;
}