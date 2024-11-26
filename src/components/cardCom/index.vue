<template>
  <div
    :style="{
      background: `url(${panelSvg(width, height)})`,
      width: width + 2 + 'px',
      height: height + 3 + 'px',
    }"
    :class="[dir, 'ComPlane']"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { panelSvg } from '@/utils/svg/plane'
const props = defineProps({
  /**
   * 左右面板 left right
   */
  dir: {
    type: String,
    default: 'left',
  },
  width: {
    type: Number,
    default: 454,
  },
  height: {
    type: Number,
    default: 920,
  },
})
</script>

<style scoped lang="less">
.left.ComPlane {
  position: absolute;
  left: 10px;
  top: 10px;
}
.right.ComPlane {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
