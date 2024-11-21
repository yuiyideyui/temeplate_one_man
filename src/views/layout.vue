<template>
  <div id="mainBox">
    <div id="topTitle" @click="testChangePlane">11111111111111111111111</div>
    <div @click="backPlane">backPlane</div>
    <div id="planeBox">
      <leftPlane></leftPlane>
      <centerPlane></centerPlane>
      <rightPlane></rightPlane>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import leftPlane from '@/components/plane/leftPlane.vue'
import rightPlane from '@/components/plane/rightPlane.vue'
import centerPlane from '@/components/plane/centerPlane.vue'

import { usePlaneStore } from '@/stores/planeStore'
const planeStore = usePlaneStore()
const testChangePlane = () => {
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
const backPlane = () => {
  planeStore.backPlane()
}
</script>

<style scoped></style>
