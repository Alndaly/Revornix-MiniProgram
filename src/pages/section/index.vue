<template>
    <div class='container bg-muted'>
        <div class='bg-white rounded-lg p-2 mb-1'>
            <div class='flex flex-row justify-between items-center mb-1'>
                <div class='font-bold'>我的专栏</div>
                <div class='text-xs' @click='handleNavigateToSectionList("mine")'>查看更多</div>
            </div>
            <div class='section-list'>
                <div v-if='mineSections.length === 0' class='text-sm flex flex-col justify-center items-center'>
                    <uni-icons class='mb-1 opacity-50' custom-prefix="iconfont" type="icon-empty" size="50"></uni-icons>
                    你暂时没有任何专栏哦
                </div>
                <div v-else>
                    <div v-for="section in mineSections" :key="section.id" class='line-clamp-2 text-sm section-item'
                        @click='navigateToSectionDetail(section.id)'>
                        {{ section.title }}
                    </div>
                </div>
            </div>
        </div>
        <div class='bg-white rounded-lg p-2 mb-1'>
            <div class='flex flex-row justify-between items-center mb-1'>
                <div class='font-bold'>订阅专栏</div>
                <div class='text-xs' @click='handleNavigateToSectionList("subscribed")'>查看更多</div>
            </div>
            <div class='section-list'>
                <div v-if='subscribedSections.length === 0' class='text-sm flex flex-col justify-center items-center'>
                    <uni-icons class='mb-1 opacity-50' custom-prefix="iconfont" type="icon-empty" size="50"></uni-icons>
                    你暂时没订阅任何专栏哦
                </div>
                <div v-else>
                    <div v-for="section in subscribedSections" :key="section.id"
                        class='line-clamp-2 text-sm section-item' @click='navigateToSectionDetail(section.id)'>
                        {{ section.title }}
                    </div>
                </div>
            </div>
        </div>
        <div class='bg-white rounded-lg p-2'>
            <div class='flex flex-row justify-between items-center mb-1'>
                <div class='font-bold'>社区专栏</div>
                <div class='text-xs' @click='handleNavigateToSectionList("community")'>查看更多</div>
            </div>
            <div class='section-list'>
                <div v-if='communitySections.length === 0' class='text-sm flex flex-col justify-center items-center'>
                    <uni-icons class='mb-1 opacity-50' custom-prefix="iconfont" type="icon-empty" size="50"></uni-icons>
                    社区目前还没有任何专栏哦
                </div>
                <div v-else>
                    <div v-for="section in communitySections" :key="section.id"
                        class='line-clamp-2 text-sm section-item' @click='navigateToSectionDetail(section.id)'>
                        {{ section.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script lang='ts' setup>
import type { SectionInfo } from '@/generated'
import { getMySubscribedSecitions, searchMineSection, searchPublicSection, searchUserSection } from '@/service/section'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const mineSections = ref<SectionInfo[]>([])
const subscribedSections = ref<SectionInfo[]>([])
const communitySections = ref<SectionInfo[]>([])

const handleNavigateToSectionList = (type: string) => {
    switch (type) {
        case 'subscribed':
            uni.navigateTo({
                url: '/pages/section/subscribed/index'
            })
            break
        case 'mine':
            uni.navigateTo({
                url: '/pages/section/mine/index'
            })
            break
        case 'community':
            uni.navigateTo({
                url: '/pages/section/community/index'
            })
    }
}

const navigateToSectionDetail = (id: number) => {
    uni.navigateTo({
        url: `/pages/section/detail/index?id=${id}`
    })
}

onLoad(async () => {
    const mineSectionsResponse = await searchMineSection({
        limit: 5,
    })
    mineSections.value = mineSectionsResponse.elements
    const mySubscribedSectionsResponse = await getMySubscribedSecitions({
        limit: 5,
    })
    subscribedSections.value = mySubscribedSectionsResponse.elements
    const publicSectionsResponse = await searchPublicSection({
        limit: 5,
    })
    communitySections.value = publicSectionsResponse.elements
})

</script>

<style lang='scss'>
.section-list {
    .section-item {
        border-bottom: 1px solid #e5e7eb;
        /* 灰色线 */
        padding: 4px 0;

        &:last-child {
            border-bottom: none;
        }
    }
}
</style>