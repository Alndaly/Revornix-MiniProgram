<template>
    <div>
        文档类型：
        {{ category }}
    </div>
    <div>
        链接：
        {{ url }}
    </div>
    <button @click="handleCreateDocument">创建文档</button>
</template>
<script lang="ts" setup>
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
