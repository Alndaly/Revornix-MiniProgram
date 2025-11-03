<template>
    <div class='container bg-muted'>
        <div class='bg-white rounded-lg p-2 mb-1'>
            <div class='flex flex-row justify-between items-center mb-1'>
                <div class='font-bold'>未读文档</div>
                <div class='text-xs' @click='handleNavigateToDocumentList("unread")'>查看更多</div>
            </div>
            <div class='document-list'>
                <div v-if='unreadDocuments.length === 0' class='text-sm'>
                    暂时没有未读文档哦
                </div>
                <div v-else>
                    <div v-for="document in unreadDocuments" :key="document.id"
                        class='line-clamp-2 text-sm document-item' @click='navigateToDocumentDetail(document.id)'>
                        {{ document.title }}
                    </div>
                </div>
            </div>
        </div>
        <div class='bg-white rounded-lg p-2 mb-1'>
            <div class='flex flex-row justify-between items-center mb-1'>
                <div class='font-bold'>最近阅读文档</div>
                <div class='text-xs' @click='handleNavigateToDocumentList("recent-read")'>查看更多</div>
            </div>
            <div class='document-list'>
                <div v-if='recentDocuments.length === 0' class='text-sm'>
                    你最近没有阅读文档哦
                </div>
                <div v-else>
                    <div v-for="document in recentDocuments" :key="document.id"
                        class='line-clamp-2 text-sm document-item' @click='navigateToDocumentDetail(document.id)'>
                        {{ document.title }}
                    </div>
                </div>
            </div>
        </div>
        <div class='bg-white rounded-lg p-2'>
            <div class='flex flex-row justify-between items-center mb-1'>
                <div class='font-bold'>我收藏的文档</div>
                <div class='text-xs' @click='handleNavigateToDocumentList("favorite")'>查看更多</div>
            </div>
            <div class='document-list'>
                <div v-if='starDocuments.length === 0' class='text-sm'>
                    你没有收藏文档哦
                </div>
                <div v-else>
                    <div v-for="document in starDocuments" :key="document.id" class='line-clamp-2 text-sm document-item'
                        @click='navigateToDocumentDetail(document.id)'>
                        {{ document.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script lang='ts' setup>
import type { DocumentInfo } from '@/generated'
import { searchUserUnreadDocument, searchUserRecentReadDocument, searchUserStarDocument } from '@/service/document'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const unreadDocuments = ref<DocumentInfo[]>([])
const recentDocuments = ref<DocumentInfo[]>([])
const starDocuments = ref<DocumentInfo[]>([])

const handleNavigateToDocumentList = (type: string) => {
    switch (type) {
        case 'unread':
            uni.navigateTo({
                url: '/pages/document/unread/index'
            })
            break
        case 'recent-read':
            uni.navigateTo({
                url: '/pages/document/recent-read/index'
            })
            break
        case 'favorite':
            uni.navigateTo({
                url: '/pages/document/favorite/index'
            })
    }
}

const navigateToDocumentDetail = (id: number) => {
    uni.navigateTo({
        url: `/pages/document/detail/index?id=${id}`
    })
}

onLoad(async () => {
    const unreadDocumentsResponse = await searchUserUnreadDocument({
        limit: 5,
    })
    unreadDocuments.value = unreadDocumentsResponse.elements
    const recentDocumentsResponse = await searchUserRecentReadDocument({
        limit: 5,
    })
    recentDocuments.value = recentDocumentsResponse.elements
    const starDocumentsResponse = await searchUserStarDocument({
        limit: 5,
    })
    starDocuments.value = starDocumentsResponse.elements
})

</script>

<style lang='scss'>
.document-list {
    .document-item {
        border-bottom: 1px solid #e5e7eb;
        /* 灰色线 */
        padding: 4px 0;

        &:last-child {
            border-bottom: none;
        }
    }
}
</style>