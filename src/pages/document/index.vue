<template>
    <mine-tab-bar />
    <scroll-view scroll-y>
        <document-item v-for='document, idx in documents' :key='idx' :document='document' />
    </scroll-view>
</template>
<script lang='ts' setup>
import DocumentItem from '@/components/documentItem/index.vue';
import type { DocumentInfo } from '@/generated';
import { searchAllMyDocument } from '@/service/document';
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useTabStore } from '@/store/tab'

const tabStore = useTabStore()
tabStore.selected = 0

let start = ref<number | null>(null);
let limit = ref(10);
let keyword = ref('');
let desc = ref(true);
let has_more = ref(true);
let documents = ref<DocumentInfo[]>([]);

onLoad(async () => {
    const data = await searchAllMyDocument({
        start: start.value,
        limit: limit.value,
        keyword: keyword.value,
        desc: desc.value
    })

    documents.value = data.elements
    has_more.value = data.has_more
    if (data.next_start) {
        start.value = data.next_start
    }
})

onPullDownRefresh(async () => {
    console.log('下拉刷新')
    start.value = null
    has_more.value = true

    const data = await searchAllMyDocument({
        start: start.value,
        limit: limit.value,
        keyword: keyword.value,
        desc: desc.value
    })

    documents.value = data.elements
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
    const data = await searchAllMyDocument({
        start: start.value,
        limit: limit.value,
        keyword: keyword.value,
        desc: desc.value
    })

    documents.value = documents.value.concat(data.elements)
    has_more.value = data.has_more
    if (data.next_start) {
        start.value = data.next_start
    }
})

</script>