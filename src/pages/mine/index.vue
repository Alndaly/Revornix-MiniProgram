<template>
    <mine-tab-bar />
    <view class='user-info'>
        <img :src="'https://qingyon-revornix-public.oss-cn-beijing.aliyuncs.com/images/20251019202656912.png'"
            class='avatar' />
        <view>
            {{ myInfo?.nickname }}
        </view>
    </view>
</template>

<script lang='ts' setup>
import type { PrivateUserInfo } from '@/generated';
import { getMyInfo } from '@/service/user';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useTabStore } from '@/store/tab'

const tabStore = useTabStore()
tabStore.switchTab(2)

let myInfo = ref<PrivateUserInfo | null>(null);

onLoad(async () => {
    const res = await getMyInfo();
    myInfo.value = res;
})
</script>

<style lang='scss'>
.user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    gap: 20px;
    padding-top: 20px;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
    }
}
</style>