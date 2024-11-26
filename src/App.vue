<script setup lang="ts">
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
  <RouterView />
</template>

<style scoped></style>
