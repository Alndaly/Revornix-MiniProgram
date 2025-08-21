import { URL } from "@/config/base"

export default {
    createRssServer: URL.API_URL + '/rss/add',
    deleteRssServer: URL.API_URL + '/rss/delete',
    searchMineRssServer: URL.API_URL + '/rss/search',
    updateRssServer: URL.API_URL + '/rss/update',
    getRssServerDetail: URL.API_URL + '/rss/detail',
    searchRssDocuments: URL.API_URL + '/rss/document',
}