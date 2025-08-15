<template>
  <image class="logo" src="/static/logo.png" />
  <view class="text-area">
    <text class="title" @click="handleNavigate">{{ title }}</text>
  </view>
  <custom-tab-bar />
</template>

<script setup lang="ts">
import customTabBar from '@/components/customTabBar/index.vue';
import { ref } from 'vue';
const title = ref('Hello');

const handleNavigate = () => {
  uni.switchTab({
    url: '/pages/appointment/index',
  });
};
</script>

<style scoped>

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
