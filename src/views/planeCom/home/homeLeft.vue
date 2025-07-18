<template>
  <cardCom dir="left" :width="450" :height="915">
    <div @click="change">yui</div>
  </cardCom>
</template>

<script setup lang="ts">
import cardCom from '@/components/cardCom/index.vue'
import { usePlaneStore } from '@/stores/planeStore'
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
</script>

<style scoped></style>
