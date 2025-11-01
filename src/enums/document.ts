export enum DocumentCategory {
    FILE = 0,
    WEBSITE = 1,
    QUICK_NOTE = 2,
}

export function getDocumentCategoryLabel(value: DocumentCategory | number): string {
    switch (value) {
        case DocumentCategory.FILE:
            return "文件";
        case DocumentCategory.WEBSITE:
            return "网站";
        case DocumentCategory.QUICK_NOTE:
            return "速记";
        default:
            return "未知类型";
    }
}

export enum DocumentMdConvertStatus {
    WAIT_TO = 0,
    CONVERTING = 1,
    SUCCESS = 2,
    FAILED = 3,
}

export enum DocumentEmbeddingConvertStatus {
    WAIT_TO = 0,
    Embedding = 1,
    SUCCESS = 2,
    FAILED = 3,
}

export enum DocumentProcessStatus {
    WAIT_TO = 0,
    PROCESSING = 1,
    SUCCESS = 2,
    FAILED = 3,
}

export enum DocumentGraphStatus {
    WAIT_TO = 0,
    BUILDING = 1,
    SUCCESS = 2,
    FAILED = 3
}