<template>
    <view class="custom-tab-bar">
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
        pagePath: "/pages/index",
        text: '首页',
        iconPath: '/static/icon/tabBar/1.png',
        selectedIconPath: '/static/icon/tabBar/1_on.png'
    },
    {
        pagePath: "/pages/coach/list/index",
        text: '教练',
        iconPath: '/static/icon/tabBar/2.png',
        selectedIconPath: '/static/icon/tabBar/2_on.png'
    },
    {
        pagePath: "/pages/appointment/index",
        text: '',
        iconPath: '/static/icon/tabBar/3.png',
        selectedIconPath: '/static/icon/tabBar/3_on.png'
    },
    {
        pagePath: "/pages/user/appointment/index",
        text: '预约',
        iconPath: '/static/icon/tabBar/4.png',
        selectedIconPath: '/static/icon/tabBar/4_on.png'
    },
    {
        pagePath: '/pages/user/index',
        text: '我的',
        iconPath: '/static/icon/tabBar/5.png',
        selectedIconPath: '/static/icon/tabBar/5_on.png'

    },
])

const onSwitchTab = (index: number) => {
    tabStore.selected = index
    uni.switchTab({ url: tabs.value[index].pagePath })
}

</script>
<style scoped lang='scss'>
.custom-tab-bar {
    padding-top: 10rpx;
    width: 100vw;
    pointer-events: auto;
    position: absolute;
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