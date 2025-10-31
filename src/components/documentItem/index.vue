<template>
    <view class="document-item" @click='onNavigateToDetail()'>
        <view class="title">{{ document.title }}</view>
        <view class="description">{{ document.description }}</view>
        <view class="content">
            <slot name="content" />
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

    .title {
        font-weight: bold;
        font-size: 30rpx;
    }

    .description {
        color: #666;
        font-size: 26rpx;
        margin-top: 8rpx;
    }

    .content {
        margin-top: 12rpx;
    }
}
</style>