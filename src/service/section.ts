import sectionApi from '@/api/section'
import type { AllMySectionsResponse, CreateLabelResponse, DaySectionRequest, DaySectionResponse, GetSectionDetailSectionDetailPostRequest, InifiniteScrollPagnitionSectionCommentInfo, InifiniteScrollPagnitionSectionDocumentInfo, InifiniteScrollPagnitionSectionInfo, LabelAddRequest, LabelListResponse, NormalResponse, SearchMineSectionsRequest, SearchSubscribedSectionRequest, SearchUserSectionsRequest, SectionCommentCreateRequest, SectionCommentDeleteRequest, SectionCommentSearchRequest, SectionCreateRequest, SectionCreateResponse, SectionDeleteRequest, SectionDetailRequest, SectionDocumentRequest, SectionInfo, SectionPublishGetRequest, SectionPublishGetResponse, SectionPublishRequest, SectionRePublishRequest, SectionSeoDetailRequest, SectionSubscribeRequest, SectionUpdateRequest, SectionUserAddRequest, SectionUserDeleteRequest, SectionUserModifyRequest, SectionUserRequest, SectionUserResponse } from '@/generated';
import { request } from '@/lib/request';

export const getMineLabels = async (): Promise<LabelListResponse> => {
    return await request({
        url: sectionApi.getMineLabels,
        method: 'POST',
    })
}

export const createLabel = async (data: LabelAddRequest): Promise<CreateLabelResponse> => {
    return await request({
        url: sectionApi.createLabel,
        method: 'POST',
        data
    })
}

export const subscribeSection = async (data: SectionSubscribeRequest): Promise<NormalResponse> => {
    return await request({
        url: sectionApi.subscribeSection,
        method: 'POST',
        data
    })
}

export const updateSection = async (data: SectionUpdateRequest): Promise<NormalResponse> => {
    return await request({
        url: sectionApi.updateSection,
        method: 'POST',
        data
    })
}

export const getDayDocumentsSummarySection = async (data: DaySectionRequest): Promise<DaySectionResponse> => {
    return await request({
        url: sectionApi.getDayDocumentSummarySection,
        method: 'POST',
        data
    })
}

export const getAllMineSections = async (): Promise<AllMySectionsResponse> => {
    return await request({ url: sectionApi.getAllMineSections })
}

export const searchMineSection = async (data: SearchMineSectionsRequest): Promise<InifiniteScrollPagnitionSectionInfo> => {
    return await request({
        url: sectionApi.searchMySection,
        method: 'POST',
        data
    })
}

export const searchUserSection = async (data: SearchUserSectionsRequest): Promise<InifiniteScrollPagnitionSectionInfo> => {
    return await request({
        url: sectionApi.searchUserSection,
        method: 'POST',
        data
    })
}

export const searchPublicSection = async (data: SearchMineSectionsRequest): Promise<InifiniteScrollPagnitionSectionInfo> => {
    return await request({
        url: sectionApi.searchPublicSection,
        method: 'POST',
        data
    })
}

export const createSection = async (data: SectionCreateRequest): Promise<SectionCreateResponse> => {
    return await request({
        url: sectionApi.createSection,
        method: 'POST',
        data
    })
}

export const deleteSection = async (data: SectionDeleteRequest): Promise<NormalResponse> => {
    return await request({
        url: sectionApi.deleteSection,
        method: 'POST',
        data
    })
}

export const getSectionDetail = async (data: SectionDetailRequest): Promise<SectionInfo> => {
    return await request({
        url: sectionApi.getSectionDetail,
        method: 'POST',
        data
    })
}

export const getSEOSectionDetail = async (data: SectionSeoDetailRequest): Promise<SectionInfo> => {
    return await request({
        url: sectionApi.getSEOSectionDetail,
        method: 'POST',
        data
    })
}

export const createSectionComment = async (data: SectionCommentCreateRequest): Promise<NormalResponse> => {
    return await request({
        url: sectionApi.createComment,
        method: 'POST',
        data
    })
}

export const deleteSectionComment = async (data: SectionCommentDeleteRequest): Promise<NormalResponse> => {
    return await request({
        url: sectionApi.deleteComment,
        method: 'POST',
        data
    })
}

export const searchSectionComment = async (data: SectionCommentSearchRequest): Promise<InifiniteScrollPagnitionSectionCommentInfo> => {
    return await request({
        url: sectionApi.searchComment,
        method: 'POST',
        data
    })
}

export const getMySubscribedSecitions = async (data: SearchSubscribedSectionRequest): Promise<InifiniteScrollPagnitionSectionInfo> => {
    return await request({
        url: sectionApi.mySubscribedSecitions,
        method: 'POST',
        data
    })
}

export const addSectionUser = async (data: SectionUserAddRequest): Promise<NormalResponse> => {
    return await request({
        url: sectionApi.addSectionUser,
        method: 'POST',
        data
    })
}

export const modifySectionUser = async (data: SectionUserModifyRequest): Promise<NormalResponse> => {
    return await request({
        url: sectionApi.modifySectionUser,
        method: 'POST',
        data
    })
}

export const deleteSectionUser = async (data: SectionUserDeleteRequest): Promise<NormalResponse> => {
    return await request({
        url: sectionApi.deleteSectionUser,
        method: 'POST',
        data
    })
}

export const getSectionUser = async (data: SectionUserRequest): Promise<SectionUserResponse> => {
    return await request({
        url: sectionApi.getSectionUser,
        method: 'POST',
        data
    })
}

export const publishSection = async (data: SectionPublishRequest): Promise<NormalResponse> => {
    return await request({
        url: sectionApi.publishSection,
        method: 'POST',
        data
    })
}

export const republishSection = async (data: SectionRePublishRequest): Promise<NormalResponse> => {
    return await request({
        url: sectionApi.republishSection,
        method: 'POST',
        data
    })
}

export const getSectionPublish = async (data: SectionPublishGetRequest): Promise<SectionPublishGetResponse> => {
    return await request({
        url: sectionApi.getSectionPublish,
        method: 'POST',
        data
    })
}

export const searchSectionDocuments = async (data: SectionDocumentRequest): Promise<InifiniteScrollPagnitionSectionDocumentInfo> => {
    return await request({
        url: sectionApi.searchSectionDocuments,
        method: 'POST',
        data
    })
}