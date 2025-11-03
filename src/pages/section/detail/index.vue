<template>
  <div class="container bg-muted">
    <div class="description">
      {{ sectionDetail?.description ? sectionDetail.description : '该专栏暂无描述' }}
    </div>
    <div class="content">
      <div v-if='markdownError'>
        {{ markdownError }}
      </div>
      <towxml v-else :nodes="markdownWxml"></towxml>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { FileUrlPrefixResponse, SectionInfo } from '@/generated';
import { getMyInfo } from '@/service/user';
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import { getUserFileSystemDetail, getUserFileUrlPrefix } from '@/service/file-system';
import { storeToRefs } from 'pinia';
import { FileService } from '@/lib/file-service';
import { replaceImagePaths } from '@/lib/utils';
import { getSectionDetail } from '@/service/section';
import { utils } from '@kinda/utils';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const towxmlFunc = require('../../../wxcomponents/towxml/index');

const userStore = useUserStore();

const { userInfo, userFileSystem } = storeToRefs(userStore);

const sectionDetail = ref<SectionInfo | null>(null);

const userRemoteFileUrlPrefix = ref<FileUrlPrefixResponse | null>(null);

const markdown = ref('');

const markdownError = ref('');

const markdownWxml = ref(null);

const onGetMarkdown = async () => {
  if (!sectionDetail.value || !userInfo.value) return;
  if (!userInfo.value?.default_user_file_system) {
    uni.showToast({
      title: '当前用户没有默认文件系统',
    });
    return;
  }
  const fileService = new FileService(userFileSystem.value?.file_system_id!);

  if (!sectionDetail.value?.md_file_name) {
    uni.showToast({
      title: '当前文档没有md文件',
    });
    return;
  }
  let [res, err] = await utils.to(fileService.getFileContent(sectionDetail.value?.md_file_name));
  if (err) {
    markdownError.value = err;
    return;
  }
  if (typeof res === 'string') {
    if (userRemoteFileUrlPrefix.value?.url_prefix) {
      res = replaceImagePaths(res, userRemoteFileUrlPrefix.value.url_prefix);
    }
    markdown.value = res;
  }
  const parsed = towxmlFunc(markdown.value, 'markdown');
  markdownWxml.value = parsed;
};

onLoad(async (options) => {
  if (!options) {
    throw new Error('当前页面缺少参数传递');
  }

  const section = await getSectionDetail({
    section_id: options.id,
  });

  sectionDetail.value = section;
  uni.setNavigationBarTitle({
    title: section?.title || '专栏详情',
  });

  const userInfo = await getMyInfo();

  userStore.setUserInfo(userInfo);

  const userFileSystem = await getUserFileSystemDetail({
    user_file_system_id: userInfo!.default_user_file_system!,
  });

  userStore.setUserFileSystem(userFileSystem);

  const userRemoteFileUrlPrefixResponse = await getUserFileUrlPrefix({
    user_id: section!.creator!.id,
  });
  userRemoteFileUrlPrefix.value = userRemoteFileUrlPrefixResponse;

  await onGetMarkdown();
});

onShareAppMessage((options) => {
  return {
    title: sectionDetail.value?.title ?? '专栏详情',
    path: `/pages/document/detail/index?id=${sectionDetail.value?.id}`,
    imageUrl:
      sectionDetail.value?.cover ??
      'https://qingyon-revornix-public.oss-cn-beijing.aliyuncs.com/images/20251101140344640.png',
  };
});

onShareTimeline(() => {
  return {
    title: sectionDetail.value?.title ?? '专栏详情',
    query: `id=${sectionDetail.value?.id}`,
    imageUrl:
      sectionDetail.value?.cover ??
      'https://qingyon-revornix-public.oss-cn-beijing.aliyuncs.com/images/20251101140344640.png',
  };
});
</script>
<style lang="scss">
.container {
  padding: 20rpx;
  padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx);

  .description {
    background-color: white;
    font-size: 28rpx;
    margin-top: 20rpx;
    border: #e5e5e5 1px solid;
    padding: 30rpx;
    border-radius: 20rpx;
  }

  .content {
    margin-top: 20rpx;
    font-size: 28rpx;
    padding: 30rpx;
    background-color: white;
    border-radius: 20rpx;
    border: #e5e5e5 1px solid;
  }
}
</style>
