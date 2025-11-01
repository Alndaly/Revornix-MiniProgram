<template>
    <view class="bg-background container">
        <view class="user-info">
            <img :src="'https://qingyon-revornix-public.oss-cn-beijing.aliyuncs.com/images/20251019202656912.png'"
                class="avatar" />
            <view class='nickname'>
                {{ myInfo?.nickname }}
            </view>
            <view>
                {{ myInfo?.slogan ? myInfo.slogan : '暂无签名' }}
            </view>
        </view>
        <view class='help'>
            <wd-cell title="帮助文档" is-link to="/pages/webview/revornix.cn/index" />
            <wd-cell title="交流群组" is-link @click='onShowGroupCode' />
            <wd-action-sheet v-model="showGroupCode" title="交流群组" @close="onHideGroupCode">
                <view class='code-box'>
                    <image src="/static/wechat_group_qr.png" alt="wechat group code" class='code' />
                </view>
            </wd-action-sheet>
        </view>
        <view class='extra'>
            <wd-cell title="UUID" :value="myInfo?.uuid" center />
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { PrivateUserInfo } from '@/generated';
import { getMyInfo } from '@/service/user';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useTabStore } from '@/store/tab';

const showGroupCode = ref(false);

const tabStore = useTabStore();
tabStore.switchTab(2);

let myInfo = ref<PrivateUserInfo | null>(null);

const onShowGroupCode = () => {
    uni.hideTabBar();
    showGroupCode.value = true;
}

const onHideGroupCode = () => {
    showGroupCode.value = false;
    uni.showTabBar();
}

onLoad(async () => {
    const res = await getMyInfo();
    myInfo.value = res;
});
</script>

<style lang="scss">
.user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30rpx;
    background-color: white;
    border-radius: 20rpx;
    margin-bottom: 20rpx;

    .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 20rpx;
        border: 2rpx solid #eaeaea;
    }

    .nickname {
        font-size: 36rpx;
        font-weight: bold;
    }
}

.help {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20rpx;
    background-color: white;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
}

.extra {
    display: flex;
    justify-content: space-around;
    padding: 20rpx;
    background-color: white;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
}

.code-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20rpx;

    .code {
        width: 340rpx;
        height: 340rpx;
        object-fit: cover;
        border-radius: 10rpx;
        margin: auto;
    }
}
</style>
