<template>
  <div @click="change">testLeft</div>
</template>

<script setup lang="ts">
import { usePlaneStore } from '@/stores/planeStore'
import { onActivated, onMounted } from 'vue'
const planeStore = usePlaneStore()
const change = () => {
  if (planeStore.planeMsg.nowPlane.left == 'test') {
    planeStore.changeNowPlane({
      left: 'home',
      right: 'home',
      center: 'home',
    })
  } else {
    planeStore.changeNowPlane({
      left: 'test',
      right: 'test',
    })
  }
}
onMounted(() => {
  console.log('onMounted')
})
</script>

<style scoped></style>
