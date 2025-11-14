<template>
  <div @click="change">testLeft</div>
</template>

<script setup lang="ts">
import { usePlaneStore } from '@/stores/planeStore'
import { onActivated, onMounted } from 'vue'
const planeStore = usePlaneStore()
const change = () => {
  if (planeStore.planeMsg.nowPlane.left == 'test') {
    planeStore.changeNowPlane(
      planeStore.planePreSetWithTheme.oneTheme.home.plane,
    )
  } else {
    planeStore.changeNowPlane(
      planeStore.planePreSetWithTheme.twoTheme.test.plane,
    )
  }
}
onMounted(() => {
  console.log('onMounted')
})
</script>

<style scoped></style>
