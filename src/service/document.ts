import documentApi from '@/api/document'
import { InifiniteScrollPagnitionDocumentInfo, LabelListResponse, DocumentDetailResponse, NormalResponse, ReadRequest, StarRequest, DocumentDeleteRequest, DocumentCreateRequest, DocumentCreateResponse, CreateLabelResponse, SearchAllMyDocumentsRequest, SearchMyStarDocumentsRequest, SearchRecentReadRequest, VectorSearchRequest, VectorSearchResponse, DocumentMonthSummaryResponse, DocumentNoteCreateRequest, DocumentNoteDeleteRequest, InifiniteScrollPagnitionDocumentNoteInfo, SearchDocumentNoteRequest, DocumentMarkdownTransformRequest, DocumentAiSummaryRequest, SearchUnreadListRequest, LabelSummaryResponse, DocumentUpdateRequest } from '@/generated'
import { request } from '@/utils/request'

export const transformToMarkdown = async (data: DocumentMarkdownTransformRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.transformToMarkdown,
        data
    })
}

export const summaryDocumentContentByAi = async (data: DocumentAiSummaryRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.summaryContent,
        data
    })
}

export const createDocumentNote = async (data: DocumentNoteCreateRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.createDocumentNote,
        data
    })
}

export const deleteDocumentNote = async (data: DocumentNoteDeleteRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.deleteDocumentNotes,
        data
    })
}

export const searchDocumentNotes = async (data: SearchDocumentNoteRequest): Promise<InifiniteScrollPagnitionDocumentNoteInfo> => {
    return await request({
        url: documentApi.searchDocumentNotes,
        data
    })
}

export const summaryMonthDocumentCount = async (): Promise<DocumentMonthSummaryResponse> => {
    return await request({ url: documentApi.summaryMonthDocumentCount })
}

export const getLabels = async (): Promise<LabelListResponse> => {
    return await request({ url: documentApi.listLabel })
}

export const searchDocumentVector = async (data: VectorSearchRequest): Promise<VectorSearchResponse> => {
    return await request({
        url: documentApi.searchDocumentVector,
        data
    })
}

export const createDocument = async (data: DocumentCreateRequest): Promise<DocumentCreateResponse> => {
    return await request({
        url: documentApi.createDocument,
        data
    })
}

export const createLabel = async ({ name }: { name: string }): Promise<CreateLabelResponse> => {
    return await request({
        url: documentApi.createLabel,
        data: {
            name
        }
    })
}

export const searchUserUnreadDocument = async (data: SearchUnreadListRequest): Promise<InifiniteScrollPagnitionDocumentInfo> => {
    return await request({
        url: documentApi.searchUserUnreadDocument,
        data
    })
}

export const searchAllMyDocument = async (data: SearchAllMyDocumentsRequest): Promise<InifiniteScrollPagnitionDocumentInfo> => {
    return await request({ url: documentApi.searchMyDocuments, data })
}

export const searchUserRecentReadDocument = async (data: SearchRecentReadRequest): Promise<InifiniteScrollPagnitionDocumentInfo> => {
    return await request({
        url: documentApi.searchUserRecentReadDocument,
        data
    })
}

export const searchUserStarDocument = async (data: SearchMyStarDocumentsRequest): Promise<InifiniteScrollPagnitionDocumentInfo> => {
    return await request({ url: documentApi.searchStarDocument, data })
}

export const getDocumentDetail = async ({ document_id }: { document_id: number }): Promise<DocumentDetailResponse> => {
    return await request({
        url: documentApi.documentDetail,
        data: {
            document_id
        }
    })
}

export const updateDocument = async (data: DocumentUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.updateDocument,
        data
    })
}

export const readDocument = async (data: ReadRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.readDocument,
        data
    })
}

export const starDocument = async (data: StarRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.starDocument,
        data
    })
}

export const deleteDocument = async (data: DocumentDeleteRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.deleteDocument,
        data
    })
}

export const getDocumentLabelSummary = async (): Promise<LabelSummaryResponse> => {
    return await request({ url: documentApi.getDocumentLabelSummary })
}