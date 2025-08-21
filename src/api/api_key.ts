import { URL } from "@/config/base";

export default {
    createApiKey: URL.API_URL + '/api-key/create',
    deleteApiKey: URL.API_URL + '/api-key/delete',
    searchApiKey: URL.API_URL + '/api-key/search'
}