<template>
    <div class="container bg-muted">
        <div class="description">
            {{ documentDetail?.description ? documentDetail?.description : '该文档暂无描述' }}
        </div>
        <div class='content'>
            <towxml :nodes="markdownWxml"></towxml>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { DocumentDetailResponse, FileUrlPrefixResponse } from '@/generated';
import { getDocumentDetail } from '@/service/document';
import { getMyInfo } from '@/service/user';
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import { getUserFileSystemDetail, getUserFileUrlPrefix } from '@/service/file-system';
import { storeToRefs } from 'pinia';
import { FileService } from '@/lib/file-service';
import { replaceImagePaths } from '@/lib/utils';
import { DocumentCategory } from '@/enums/document';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const towxmlFunc = require('../../../wxcomponents/towxml/index')

const userStore = useUserStore();

const { userInfo, userFileSystem } = storeToRefs(userStore);

const documentDetail = ref<DocumentDetailResponse | null>(null);

const userRemoteFileUrlPrefix = ref<FileUrlPrefixResponse | null>(null);

const markdown = ref('');

const markdownWxml = ref(null);

const onGetMarkdown = async () => {
    if (!documentDetail.value || !userInfo.value) return;
    if (!userInfo.value?.default_user_file_system) {
        uni.showToast({
            title: '当前用户没有默认文件系统',
        })
        return;
    }
    const fileService = new FileService(userFileSystem.value?.file_system_id!);
    let res = null;
    switch (documentDetail.value?.category) {
        case DocumentCategory.FILE:
            if (!documentDetail.value.file_info?.md_file_name) {
                uni.showToast({
                    title: '当前文档没有md文件',
                })
                return;
            }
            res = await fileService.getFileContent(documentDetail.value.file_info?.md_file_name)
            break;
        case DocumentCategory.QUICK_NOTE:
            if (!documentDetail.value.quick_note_info?.content) {
                uni.showToast({
                    title: '当前文档没有详情内容',
                })
                return;
            }
            res = documentDetail.value.quick_note_info?.content
            break;
        case DocumentCategory.WEBSITE:
            if (!documentDetail.value.website_info?.md_file_name) {
                uni.showToast({
                    title: '当前文档没有md文件',
                })
                return;
            }
            res = await fileService.getFileContent(documentDetail.value.website_info?.md_file_name)
            break;
        default:
            break;
    }
    if (typeof res === 'string') {
        if (userRemoteFileUrlPrefix.value?.url_prefix) {
            res = replaceImagePaths(res, userRemoteFileUrlPrefix.value.url_prefix);
        }
        markdown.value = res;
    }
    const parsed = towxmlFunc(markdown.value, 'markdown');
    markdownWxml.value = parsed
};

onLoad(async (options) => {
    if (!options) {
        throw new Error('当前页面缺少参数传递');
    }

    const document = await getDocumentDetail({
        document_id: options.id,
    });

    documentDetail.value = document;
    uni.setNavigationBarTitle({
        title: document?.title || '文档详情',
    });

    const userInfo = await getMyInfo();

    userStore.setUserInfo(userInfo);

    const userFileSystem = await getUserFileSystemDetail({
        user_file_system_id: userInfo!.default_user_file_system!,
    });

    userStore.setUserFileSystem(userFileSystem);

    const userRemoteFileUrlPrefixResponse = await getUserFileUrlPrefix({ user_id: document!.creator!.id });
    userRemoteFileUrlPrefix.value = userRemoteFileUrlPrefixResponse;

    await onGetMarkdown();
});

onShareAppMessage((options) => {
    return {
        title: documentDetail.value?.title ?? '文档详情',
        path: `/pages/document/detail/index?id=${documentDetail.value?.id}`,
        imageUrl: documentDetail.value?.cover ?? 'https://qingyon-revornix-public.oss-cn-beijing.aliyuncs.com/images/20251101140344640.png',
    };
})

onShareTimeline(() => {
    return {
        title: documentDetail.value?.title ?? '文档详情',
        query: `id=${documentDetail.value?.id}`,
        imageUrl: documentDetail.value?.cover ?? 'https://qingyon-revornix-public.oss-cn-beijing.aliyuncs.com/images/20251101140344640.png',
    }
})

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
