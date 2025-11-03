<template>
    <view class="bg-muted container">
        <view class="rounded-lg p-2 mb-1 flex flex-col justify-center items-center">
            <img :src="myInfo?.avatar ? myInfo?.avatar : '/static/icon/Revornix_logo_inverted_output.png'"
                class="avatar" />
            <div class='flex flex-row text-sm'>
                <div>粉丝 {{ myInfo?.fans ? myInfo.fans : 0 }}</div>
                <div class='mx-1'>|</div>
                <div>关注 {{ myInfo?.follows ? myInfo.follows : 0 }}</div>
            </div>
        </view>
        <view class='rounded-lg bg-white p-1 mb-1'>
            <wd-cell title="昵称" :value='myInfo?.nickname ? myInfo.nickname : "暂无昵称"' />
            <wd-cell title="个性签名" :value='myInfo?.slogan ? myInfo.slogan : "暂无签名"' />
        </view>
        <view class='rounded-lg bg-white p-1 mb-1'>
            <wd-cell title="帮助文档" is-link to="/pages/webview/revornix.cn/index" />
            <wd-cell title="交流群组" is-link @click='onShowGroupCode' />
            <wd-action-sheet v-model="showGroupCode" title="交流群组" @close="onHideGroupCode">
                <view class='code-box'>
                    <image show-menu-by-longpress src="/static/wechat_group_qr.png" alt="wechat group code"
                        class='code' />
                </view>
            </wd-action-sheet>
        </view>
        <view class='rounded-lg bg-white p-1 mb-1'>
            <wd-cell title="UUID" center>
                <view class='text-xs' selectable="true">
                    {{ myInfo?.uuid ? myInfo.uuid : '暂无UUID' }}
                </view>
            </wd-cell>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { PrivateUserInfo } from '@/generated';
import { getMyInfo } from '@/service/user';
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useTabStore } from '@/store/tab';
import { utils } from '@kinda/utils';

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
    const [res, err] = await utils.to(getMyInfo());
    if (err) {
        uni.showToast({
            title: '获取用户信息失败',
            icon: 'error'
        })
        return
    }
    myInfo.value = res;
});

onPullDownRefresh(async () => {
    const res = await getMyInfo();
    myInfo.value = res;
    uni.stopPullDownRefresh();
})
</script>

<style lang="scss">
.avatar {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20rpx;
    border: 2rpx solid #eaeaea;
}
</style>
