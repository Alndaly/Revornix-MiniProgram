<template>
    <view class='container flex' :class='sections.length > 0 && "bg-muted"'>
        <div v-if='sections.length === 0' class='flex flex-col justify-center items-center flex-1 text-sm'>
            <uni-icons class='mb-1 opacity-50' custom-prefix="iconfont" type="icon-empty" size="70"></uni-icons>
            你当前没订阅任何专栏
        </div>
        <scroll-view scroll-y class='section-list' v-else>
            <view v-for="(section, idx) in sections" :key="idx" class="section-wrapper">
                <section-item :section="section" />
            </view>
        </scroll-view>
    </view>
</template>
<script lang='ts' setup>
import type { SectionInfo } from '@/generated';
import { getMySubscribedSecitions } from '@/service/section';
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
import SectionItem from '@/components/sectionItem/index.vue'
import { useTabStore } from '@/store/tab'

const tabStore = useTabStore()
tabStore.switchTab(1)

let start = ref<number | null>(null);
let limit = ref(10);
let keyword = ref('');
let desc = ref(true);
let has_more = ref(true);
let sections = ref<SectionInfo[]>([]);

onLoad(async () => {
    const data = await getMySubscribedSecitions({
        start: start.value,
        limit: limit.value,
        keyword: keyword.value,
        desc: desc.value
    })

    sections.value = data.elements
    has_more.value = data.has_more
    if (data.next_start) {
        start.value = data.next_start
    }
})

onPullDownRefresh(async () => {
    console.log('下拉刷新')
    start.value = null
    has_more.value = true

    const data = await getMySubscribedSecitions({
        start: start.value,
        limit: limit.value,
        keyword: keyword.value,
        desc: desc.value
    })

    sections.value = data.elements
    has_more.value = data.has_more
    if (data.next_start) {
        start.value = data.next_start
    }
    uni.stopPullDownRefresh()
})

onReachBottom(async () => {
    console.log('上拉触底')
    if (!has_more.value) {
        return
    }
    const data = await getMySubscribedSecitions({
        start: start.value,
        limit: limit.value,
        keyword: keyword.value,
        desc: desc.value
    })

    sections.value = sections.value.concat(data.elements)
    has_more.value = data.has_more
    if (data.next_start) {
        start.value = data.next_start
    }
})
</script>
<style lang="scss">
.section-list {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .section-wrapper {
        margin-bottom: 20rpx;
    }

    .section-wrapper:last-child {
        margin-bottom: 0;
    }
}
</style>