import { URL } from "@/config/base";

export default {
    askAi: URL.API_URL + '/ai/ask',
    createAiModel: URL.API_URL + '/ai/model/create',
    createAiModelProvider: URL.API_URL + '/ai/model-provider/create',
    deleteAiModel: URL.API_URL + '/ai/model/delete',
    deleteAiModelProvider: URL.API_URL + '/ai/model-provider/delete',
    searchAiModel: URL.API_URL + '/ai/model/search',
    searchAiModelProvider: URL.API_URL + '/ai/model-provider/search',
    updateAiModel: URL.API_URL + '/ai/model/update',
    updateAiModelProvider: URL.API_URL + '/ai/model-provider/update',
    getAiModelDetail: URL.API_URL + '/ai/model/detail',
    getAiModelProviderDetail: URL.API_URL + '/ai/model-provider/detail',
} 