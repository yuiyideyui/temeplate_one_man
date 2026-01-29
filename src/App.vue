<script setup lang="tsx">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import Yui from './views/yui.vue'
import { onMounted } from 'vue'
import { usePlaneStore } from './stores/planeStore'
const planeStore = usePlaneStore()
onMounted(() => {
    // planeStore.changeNowPlane(planeStore.planePreSetWithTheme.oneTheme.home.plane)
})
</script>

<template>
    <div>
        <RouterView />
        <!-- <Yui></Yui>
    <Yui></Yui> -->
        <VueQueryDevtools></VueQueryDevtools>
    </div>
</template>

<style lang="less">
* {
    font-family: 'webfont';
}
</style>
