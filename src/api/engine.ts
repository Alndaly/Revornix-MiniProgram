import { URL } from "@/config/base"

export default {
    getMineEngines: URL.API_URL + '/engine/mine',
    getProvideEngines: URL.API_URL + '/engine/provide',
    installEngine: URL.API_URL + '/engine/install',
    updateEngine: URL.API_URL + '/engine/update',
    deleteEngine: URL.API_URL + '/engine/delete',
}