<template>
    <div>
        <towxml :nodes='nodes' />
    </div>
</template>

<script lang='ts' setup>
const nodes = [{ name: 'h1', children: [{ type: 'text', text: 'Hello Towxml 原生组件' }] }]
</script>
