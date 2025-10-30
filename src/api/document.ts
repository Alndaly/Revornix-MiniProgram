import { URL } from "@/config/base"

export default {
    createDocument: URL.API_URL + '/document/create',
    createLabel: URL.API_URL + '/document/label/create',
    listLabel: URL.API_URL + '/document/label/list',
    searchUserUnreadDocument: URL.API_URL + '/document/unread/search',
    searchUserRecentReadDocument: URL.API_URL + '/document/recent/search',
    documentDetail: URL.API_URL + '/document/detail',
    updateDocument: URL.API_URL + '/document/update',
    starDocument: URL.API_URL + '/document/star',
    readDocument: URL.API_URL + '/document/read',
    deleteDocument: URL.API_URL + '/document/delete',
    searchMyDocuments: URL.API_URL + '/document/search/mine',
    searchStarDocument: URL.API_URL + '/document/star/search',
    searchDocumentVector: URL.API_URL + '/document/vector/search',
    summaryMonthDocumentCount: URL.API_URL + '/document/month/summary',
    searchDocumentNotes: URL.API_URL + '/document/note/search',
    createDocumentNote: URL.API_URL + '/document/note/create',
    deleteDocumentNotes: URL.API_URL + '/document/note/delete',
    transformToMarkdown: URL.API_URL + '/document/markdown/transform',
    summaryContent: URL.API_URL + '/document/ai/summary',
    getDocumentLabelSummary: URL.API_URL + '/document/label/summary'
} 