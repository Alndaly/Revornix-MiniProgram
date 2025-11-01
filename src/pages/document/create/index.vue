<template>
    <div class='container'>
        <div class="form">
            <div class='category'>
                <div class='font-bold'>
                    文档类型：
                </div>
                <div class='input text-sm'>
                    {{ category && getDocumentCategoryLabel(category) }}
                </div>
            </div>
            <div class='url'>
                <div class='font-bold'>
                    链接：
                </div>
                <div class='input text-sm'>
                    {{ url }}
                </div>
            </div>
        </div>
        <button class='submit-button' @click="handleCreateDocument">创建文档</button>
    </div>

</template>
<script lang="ts" setup>
import { DocumentCategory, getDocumentCategoryLabel } from '@/enums/document';
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
.text-sm {
    font-size: 28rpx;
}

.input {
    margin-top: 10rpx;
    padding: 10rpx;
    border: 1px solid #ccc;
    border-radius: 10rpx;
    background-color: #f4f4f4;
}

.font-bold {
    font-weight: bold;
}

.container {
    padding: 30rpx;
    box-sizing: border-box;
    word-break: break-all;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-bottom: calc(env(safe-area-inset-bottom) + 10rpx);

    .form {
        flex: 1;

        .category {
            margin-bottom: 20rpx;
        }

        .url {
            margin-bottom: 20rpx;
        }

    }

    .submit-button {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background-color: #007aff;
        color: #fff;
        border-radius: 10rpx;
        font-size: 32rpx;
    }
}
</style>