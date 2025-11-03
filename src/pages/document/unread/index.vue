<template>
    <view class='container flex' :class='documents.length > 0 && "bg-muted"'>
        <div v-if='documents.length === 0' class='flex flex-col justify-center items-center flex-1 text-sm'>
            <uni-icons class='mb-1 opacity-50' custom-prefix="iconfont" type="icon-empty" size="70"></uni-icons>
            没有任何未读文档啦
        </div>
        <scroll-view scroll-y class='document-list' v-else>
            <view v-for="(document, idx) in documents" :key="idx" class="document-wrapper">
                <document-item :document="document" />
            </view>
        </scroll-view>
    </view>
</template>
<script lang='ts' setup>
import DocumentItem from '@/components/documentItem/index.vue';
import type { DocumentInfo } from '@/generated';
import { searchUserUnreadDocument } from '@/service/document';
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useTabStore } from '@/store/tab'

const tabStore = useTabStore()
tabStore.switchTab(0)

let start = ref<number | null>(null);
let limit = ref(10);
let keyword = ref('');
let desc = ref(true);
let has_more = ref(true);
let documents = ref<DocumentInfo[]>([]);

onLoad(async () => {
    const data = await searchUserUnreadDocument({
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

    const data = await searchUserUnreadDocument({
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
    const data = await searchUserUnreadDocument({
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

<style lang='scss'>
.document-list {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .document-wrapper {
        margin-bottom: 20rpx;
    }

    .document-wrapper:last-child {
        margin-bottom: 0;
    }
}
</style>