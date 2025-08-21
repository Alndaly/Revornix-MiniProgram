import { URL } from "@/config/base"

export default {
    createMCPServer: URL.API_URL + '/mcp/server/create',
    updateMCPServer: URL.API_URL + '/mcp/server/update',
    deleteMCPServer: URL.API_URL + '/mcp/server/delete',
    searchMCPServer: URL.API_URL + '/mcp/server/search',
    getMCPServerDetail: URL.API_URL + '/mcp/server/detail',
}