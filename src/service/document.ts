import documentApi from '@/api/document'
import type { InifiniteScrollPagnitionDocumentInfo, LabelListResponse, DocumentDetailResponse, NormalResponse, ReadRequest, StarRequest, DocumentDeleteRequest, DocumentCreateRequest, DocumentCreateResponse, CreateLabelResponse, SearchAllMyDocumentsRequest, SearchMyStarDocumentsRequest, SearchRecentReadRequest, VectorSearchRequest, VectorSearchResponse, DocumentMonthSummaryResponse, DocumentNoteCreateRequest, DocumentNoteDeleteRequest, InifiniteScrollPagnitionDocumentNoteInfo, SearchDocumentNoteRequest, DocumentMarkdownTransformRequest, DocumentAiSummaryRequest, SearchUnreadListRequest, LabelSummaryResponse, DocumentUpdateRequest } from '@/generated'
import { request } from '@/utils/request'

export const transformToMarkdown = async (data: DocumentMarkdownTransformRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.transformToMarkdown,
        method: 'POST',
        data
    })
}

export const summaryDocumentContentByAi = async (data: DocumentAiSummaryRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.summaryContent,
        method: 'POST',
        data
    })
}

export const createDocumentNote = async (data: DocumentNoteCreateRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.createDocumentNote,
        method: 'POST',
        data
    })
}

export const deleteDocumentNote = async (data: DocumentNoteDeleteRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.deleteDocumentNotes,
        method: 'POST',
        data
    })
}

export const searchDocumentNotes = async (data: SearchDocumentNoteRequest): Promise<InifiniteScrollPagnitionDocumentNoteInfo> => {
    return await request({
        url: documentApi.searchDocumentNotes,
        method: 'POST',
        data
    })
}

export const summaryMonthDocumentCount = async (): Promise<DocumentMonthSummaryResponse> => {
    return await request({
        url: documentApi.summaryMonthDocumentCount,
        method: 'POST',
    })
}

export const getLabels = async (): Promise<LabelListResponse> => {
    return await request({
        url: documentApi.listLabel,
        method: 'POST'
    })
}

export const searchDocumentVector = async (data: VectorSearchRequest): Promise<VectorSearchResponse> => {
    return await request({
        url: documentApi.searchDocumentVector,
        method: 'POST',
        data
    })
}

export const createDocument = async (data: DocumentCreateRequest): Promise<DocumentCreateResponse> => {
    return await request({
        url: documentApi.createDocument,
        method: 'POST',
        data
    })
}

export const createLabel = async ({ name }: { name: string }): Promise<CreateLabelResponse> => {
    return await request({
        url: documentApi.createLabel,
        method: 'POST',
        data: {
            name
        }
    })
}

export const searchUserUnreadDocument = async (data: SearchUnreadListRequest): Promise<InifiniteScrollPagnitionDocumentInfo> => {
    return await request({
        url: documentApi.searchUserUnreadDocument,
        method: 'POST',
        data
    })
}

export const searchAllMyDocument = async (data: SearchAllMyDocumentsRequest): Promise<InifiniteScrollPagnitionDocumentInfo> => {
    return await request({
        url: documentApi.searchMyDocuments,
        method: 'POST',
        data
    })
}

export const searchUserRecentReadDocument = async (data: SearchRecentReadRequest): Promise<InifiniteScrollPagnitionDocumentInfo> => {
    return await request({
        url: documentApi.searchUserRecentReadDocument,
        method: 'POST',
        data
    })
}

export const searchUserStarDocument = async (data: SearchMyStarDocumentsRequest): Promise<InifiniteScrollPagnitionDocumentInfo> => {
    return await request({
        url: documentApi.searchStarDocument,
        method: 'POST',
        data
    })
}

export const getDocumentDetail = async ({ document_id }: { document_id: number }): Promise<DocumentDetailResponse> => {
    return await request({
        url: documentApi.documentDetail,
        method: 'POST',
        data: {
            document_id
        }
    })
}

export const updateDocument = async (data: DocumentUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.updateDocument,
        method: 'POST',
        data
    })
}

export const readDocument = async (data: ReadRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.readDocument,
        method: 'POST',
        data
    })
}

export const starDocument = async (data: StarRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.starDocument,
        method: 'POST',
        data
    })
}

export const deleteDocument = async (data: DocumentDeleteRequest): Promise<NormalResponse> => {
    return await request({
        url: documentApi.deleteDocument,
        method: 'POST',
        data
    })
}

export const getDocumentLabelSummary = async (): Promise<LabelSummaryResponse> => {
    return await request({
        url: documentApi.getDocumentLabelSummary,
        method: 'POST',
    })
}