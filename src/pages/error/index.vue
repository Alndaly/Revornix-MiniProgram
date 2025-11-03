<template>
    <div class="h-screen flex flex-col justify-center items-center">
        <uni-icons type="info" size="75" class='opacity-75' />
        <div class="font-bold mb-1 text-lg">{{ title ?? '警告' }}</div>
        <div class="text-sm">{{ description ?? '发生未知错误' }}</div>
    </div>
</template>
<script lang="ts" setup>
import { useErrorStore } from '@/store/error';
import { storeToRefs } from 'pinia';

const errorStore = useErrorStore();

const { title, description } = storeToRefs(errorStore);
</script>
