<script setup lang="tsx">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import Yui from './views/yui.vue'
</script>

<template>
  <div>
    <RouterView />
    <!-- <Yui></Yui>
    <Yui></Yui> -->
    <VueQueryDevtools></VueQueryDevtools>
  </div>
</template>

<style lang="less"></style>
