<template>
    <view class="mine-tab-bar">
        <view v-for="(tab, index) in tabs" :key='index' class="tab-item" @click='onSwitchTab(index)'>
            <img :src="tab.iconPath" alt="" mode="aspectFit" v-if='tabStore.selected !== index' class='icon' />
            <img :src="tab.selectedIconPath" mode="aspectFit" alt="" class='icon' v-else />
            <view class='text'>{{ tab.text }}</view>
        </view>
    </view>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import { useTabStore } from '@/store/tab'

const tabStore = useTabStore()

const tabs = ref([
    {
        pagePath: "/pages/document/index",
        text: '文档',
        iconPath: '/static/icon/tabBar/document.png',
        selectedIconPath: '/static/icon/tabBar/document_on.png'
    },
    {
        pagePath: "/pages/section/index",
        text: '专栏',
        iconPath: '/static/icon/tabBar/section.png',
        selectedIconPath: '/static/icon/tabBar/section_on.png'
    },
    {
        pagePath: '/pages/mine/index',
        text: '我的',
        iconPath: '/static/icon/tabBar/mine.png',
        selectedIconPath: '/static/icon/tabBar/mine_on.png'

    },
])

const onSwitchTab = (index: number) => {
    tabStore.switchTab(index)
    uni.switchTab({ url: tabs.value[index].pagePath })
}

</script>
<style scoped lang='scss'>
.mine-tab-bar {
    z-index: 100;
    padding-top: 10rpx;
    width: 100vw;
    pointer-events: auto;
    position: fixed;
    background-color: white;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: max(env(safe-area-inset-bottom), 10rpx);
    border-top: 1rpx solid #f5f5f5;

    .tab-item {
        display: flex;
        flex-direction: column;
        gap: 10rpx;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100rpx;

        .icon {
            width: 100rpx;
            height: 100rpx;
            aspect-ratio: 1/1;
            object-fit: cover;
        }

        .text {
            font-size: 12px;
            color: #ccc;
        }
    }
}
</style>