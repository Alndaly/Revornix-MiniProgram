<template>
    <div class='container bg-muted'>
        <div class="flex-1">
            <div class='bg-white form rounded-lg overflow-hidden'>
                <wd-cell-group title="文档基础信息">
                    <wd-cell title="文档类型" :value="category && getDocumentCategoryLabel(category)" />
                    <wd-cell title="链接" :value="url" />
                    <wd-cell title="来源" value="wx-mini" />
                </wd-cell-group>
            </div>
        </div>
        <button class='submit-button' @click="handleCreateDocument">创建文档</button>
    </div>

</template>
<script lang="ts" setup>
import { getDocumentCategoryLabel } from '@/enums/document';
import { createDocument } from '@/service/document';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const category = ref<number | null>(null)
const url = ref<string | null>(null)

onLoad(async (options) => {
    if (options?.category) {
        category.value = Number(options.category)
    }
    if (options?.url) {
        url.value = options.url
    }
})

const handleCreateDocument = async () => {
    if (!category.value) {
        throw Error('category is required')
    }
    const res = await createDocument({
        category: category.value,
        from_plat: 'wx-mini',
        url: url.value
    })
    uni.showToast({
        title: '文档创建成功',
        icon: 'success'
    })
}
</script>

<style lang='scss'>
.container {
    display: flex;
    flex-direction: column;
    padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx);

    .form {
        padding: 20rpx;

        .category {
            margin-bottom: 20rpx;
        }

        .url {
            margin-bottom: 20rpx;
        }

    }

    .submit-button {
        margin-top: 20rpx;
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background-color: #007aff;
        color: #fff;
        border-radius: 50rpx;
        font-size: 32rpx;
    }
}
</style>