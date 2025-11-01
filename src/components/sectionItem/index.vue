<template>
    <view class="section-item" @click='onNavigateToDetail()'>
        <image class='cover'
            :src="section.cover ? section.cover : 'https://qingyon-revornix-public.oss-cn-beijing.aliyuncs.com/images/20251101140344640.png'"
            mode="aspectFill" />
        <view class='info'>
            <view class="title line-clamp-2">{{ section.title }}</view>
            <view class="description">{{ section.description }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { SectionInfo } from '@/generated'

const props = defineProps<{
    section: SectionInfo
}>()

const { section } = props

const onNavigateToDetail = () => {
    uni.navigateTo({
        url: `/pages/section/detail/index?id=${section.id}`
    })
}
</script>

<style scoped lang="scss">
.section-item {
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