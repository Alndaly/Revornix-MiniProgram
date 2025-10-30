<template>
    <view class="section-item">
        <view class="title">{{ section.title }}</view>
        <view class="description">{{ section.description }}</view>
        <view class="content">
            <slot name="content" />
        </view>
    </view>
</template>

<script setup lang="ts">
import type { SectionInfo } from '@/generated'

const props = defineProps<{
    section: SectionInfo
}>()

const { section } = props
</script>

<style scoped lang="scss">
.section-item {
    padding: 20rpx;

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