<template>
    <div>
        document create page
    </div>
    <div>
        {{ category }}
    </div>
    <div>
        {{ url }}
    </div>
</template>
<script lang='ts' setup>
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
</script>