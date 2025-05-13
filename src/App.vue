<script setup lang="tsx">
import { RouterView } from 'vue-router'
import { getSub } from '@/api/test'
import { onMounted, ref } from 'vue'
onMounted(() => {
  getSub().then(res => {
    console.log('res', res)
  })
})
</script>

<template>
  <div>
    <!-- <RouterView /> -->
  </div>
</template>

<style lang="less"></style>
