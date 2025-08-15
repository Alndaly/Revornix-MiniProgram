<template>
    <view class="custom-tab-bar">custom tab bar</view>
</template>
<style scoped>
.custom-tab-bar {
    width: 100vw;
    pointer-events: auto;
    position: absolute;
    left: 0;
    bottom: 0;
    padding-bottom: max(env(safe-area-inset-bottom), 10rpx);
}
</style>