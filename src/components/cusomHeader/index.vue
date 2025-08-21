<template>
    <view class='custom-header-container' :style="{ height: navBarHeight + 'px' }">
        <view :style="{ paddingTop: statusBarHeight + 'px', height: navBarHeight + 'px' }" class="custom-header">
            <view class="content" :style="{ top: statusBarHeight + 'px' }">
                <slot name="content" />
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const statusBarHeight = ref(0)
const navBarHeight = ref(0)
const menuInfoRef = ref()

onMounted(() => {
    const sys = uni.getSystemInfoSync()
    const menuInfo = uni.getMenuButtonBoundingClientRect()

    console.log('menuInfo:', menuInfo)

    menuInfoRef.value = menuInfo

    if (sys.statusBarHeight) {
        statusBarHeight.value = sys.statusBarHeight
    }

    if (menuInfo && sys.statusBarHeight) {
        navBarHeight.value = menuInfo.bottom + menuInfo.top - sys.statusBarHeight
    }
})
</script>

<style scoped lang='scss'>
.custom-header-container {
    display: block;
    position: relative;

    .custom-header {
        width: 100vw;
        position: fixed;
        border-bottom: 1px solid #eee;
        min-height: 0px;
        padding-right: 220rpx;
        box-shadow: 0rpx 0rpx 0rpx;
        z-index: 9999;

        .content {
            position: absolute;
            text-align: center;
            width: calc(100% - 340rpx);
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;
            height: 60rpx;
            font-size: 32rpx;
            line-height: 60rpx;
            cursor: none;
            pointer-events: none;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
}
</style>