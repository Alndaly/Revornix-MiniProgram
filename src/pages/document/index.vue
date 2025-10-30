<template>
    <mine-tab-bar />
    <custom-header>
        <template #content>Documents</template>
    </custom-header>
    document page
    <scroll-view scroll-y class='document-list'>111</scroll-view>
</template>
<script lang='ts' setup>
import { searchAllMyDocument } from '@/service/document';
import { ref } from 'vue';

const start = ref(null);
let limit = ref(10);
let keyword = ref('');
let label_ids = ref([]);
let desc = ref(false);

const data = await searchAllMyDocument({
    start: start.value,
    limit: limit.value,
    keyword: keyword.value,
    label_ids: label_ids.value,
    desc: desc.value
})

</script>
<style lang='scss'>
.document-list {
    background-color: aqua;
    height: 100%;
}
</style>
