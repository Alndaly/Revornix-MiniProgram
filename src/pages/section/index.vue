<template>
    <mine-tab-bar />
    <scroll-view scroll-y>
        <section-item v-for='section, idx in sections' :key='idx' :section='section' />
    </scroll-view>
</template>
<script lang='ts' setup>
import type { SectionInfo } from '@/generated';
import { searchMineSection } from '@/service/section';
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
    const data = await searchMineSection({
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

    const data = await searchMineSection({
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
    const data = await searchMineSection({
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