<template>
    <view class="document-item" @click='onNavigateToDetail()'>
        <image class='cover'
            :src="document.cover ? document.cover : 'https://qingyon-revornix-public.oss-cn-beijing.aliyuncs.com/images/20251101140344640.png'"
            mode="aspectFill" />
        <view class='info'>
            <view class="title line-clamp-2">{{ document.title }}</view>
            <view class="description line-clamp-3">{{ document.description ? document.description : '该文档暂无描述' }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { DocumentInfo } from '@/generated'

const props = defineProps<{
    document: DocumentInfo
}>()

const { document } = props

const onNavigateToDetail = () => {
    uni.navigateTo({
        url: `/pages/document/detail/index?id=${document.id}`
    })
}
</script>

<style scoped lang="scss">
.document-item {

    background-color: white;
    padding: 30rpx;
    border-radius: 20rpx;
    display: flex;
    flex-direction: row;

    .cover {
        width: 100rpx;
        height: 100rpx;
        border-radius: 20rpx;
        object-fit: cover;
        flex-shrink: 0;
        margin: auto 0;
        margin-right: 30rpx;
    }

    .info {

        .title {
            font-weight: bold;
            font-size: 30rpx;
        }

        .description {
            color: #666;
            font-size: 26rpx;
            margin-top: 8rpx;
        }
    }

}
</style>