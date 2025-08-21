<template>
    <mine-tab-bar />
    <custom-header>
        <template #content>Documents</template>
    </custom-header>
    document page
    <scroll-view scroll-y class='document-list'>111</scroll-view>
</template>
<style lang='scss'>
.document-list {
    background-color: aqua;
    height: 100%;
}
</style>
