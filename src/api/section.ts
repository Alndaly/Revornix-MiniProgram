import { URL } from "@/config/base"

export default {
    getDayDocumentSummarySection: URL.API_URL + "/section/date",
    searchMySection: URL.API_URL + "/section/mine/search",
    searchUserSection: URL.API_URL + "/section/user/search",
    searchPublicSection: URL.API_URL + "/section/public/search",
    createSection: URL.API_URL + "/section/create",
    deleteSection: URL.API_URL + "/section/delete",
    getAllMineSections: URL.API_URL + "/section/mine/all",
    getSectionDetail: URL.API_URL + "/section/detail",
    updateSection: URL.API_URL + "/section/update",
    subscribeSection: URL.API_URL + "/section/subscribe",
    createComment: URL.API_URL + "/section/comment/create",
    deleteComment: URL.API_URL + "/section/comment/delete",
    searchComment: URL.API_URL + "/section/comment/search",
    mySubscribedSecitions: URL.API_URL + "/section/subscribed",
    createLabel: URL.API_URL + "/section/label/create",
    getMineLabels: URL.API_URL + "/section/label/list",
}