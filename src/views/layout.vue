<template>
  <div id="mainBox">
    <div class="mainBox-container" ref="fullEl">
      <PageHeader
        class="pageHeader"
        title="关键路径识别"
        :fullScreen="true"
        @fullScreen_fn="fullScreen_fn"
      />

      <div id="planeBox">
        <leftPlane></leftPlane>
        <centerPlane></centerPlane>
        <rightPlane></rightPlane>
      </div>

      <div class="footer-button">
        <MultiButton
          v-for="(button, index) in footButtons"
          :key="index"
          :buttonData="button"
          @parentChecked="handleParentChecked($event, index)"
          @toggleGrayscale="handleToggleGrayscale(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import { useFullscreen } from '@vueuse/core'
import '@/utils/screen'
import leftPlane from '@/components/plane/leftPlane.vue'
import rightPlane from '@/components/plane/rightPlane.vue'
import centerPlane from '@/components/plane/centerPlane.vue'
import MultiButton from '@/components/MultiButton/index.vue'
import PageHeader from '@/components/PageHeader/index.vue'
import { usePlaneStore } from '@/stores/planeStore'
import {
  selectAllChildren,
  updateAllParentCheckedStatus,
} from '@/components/MultiButton/selectFn'
import { footButtons } from './layout'
const planeStore = usePlaneStore()

const handleChildChecked = (
  item: {
    item: Type_MultiButton_children
    parent: Type_MultiButton_children | Type_MultiButton
  },
  index: number,
) => {
  if (item.item.checked) {
    if (item.item.showFn) item.item.showFn(item)
  } else {
    if (item.item.closeFn) item.item.closeFn(item)
  }
  updateAllParentCheckedStatus(footButtons.value)
}

const handleParentChecked = (item: any, index: number) => {
  // if(item !== '全选'){
  //   const allChecked = footButtons.value[index].layerList
  //     .filter(item => item.layerName !== '全选') // 筛选卡口和信号机
  //     .every(item => item.checked === true); // 判断它们的 checked 是否都为 true
  //   footButtons.value[index].layerList[0].checked = !!allChecked;
  // }
  if (footButtons.value[index].layerList.every(e => !e.checked)) {
    footButtons.value[index].disabled = true
  }
  footButtons.value[index].layerList.forEach(e => {
    if (e.layerName === item) {
      if (e.checked) {
        footButtons.value[index].disabled = false
      } else {
      }
    }
  })
}
const handleToggleGrayscale = (index: number) => {
  if (
    footButtons.value[index].default === 'allChecked' &&
    !footButtons.value[index].disabled
  ) {
    footButtons.value[index].layerList.forEach(e => {
      e.checked = true
    })
  }
  if (footButtons.value[index].comTitle === '路网') {
  } else if (footButtons.value[index].comTitle === '设备') {
  } else if (footButtons.value[index].comTitle === '交叉口') {
  }
}
const test2CahangePlane = () => {
  planeStore.changeNowPlane(
    planeStore.planePreSetWithTheme.twoTheme.test.plane,
    false,
    {},
  )
}

const fullEl = ref<HTMLElement | null>(null)
const { toggle, isFullscreen } = useFullscreen(fullEl)
const fullScreen_fn = () => {
  toggle()
}
watch(isFullscreen, newValue => {
  if (!newValue) {
    nextTick(() => {
      window.setScale()
    })
  }
})
</script>
<style scoped lang="less">
#mainBox {
  /* position: relative; */
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.mainBox-container {
  position: relative;
}

.pageHeader {
  position: absolute;
  left: 50%;
  top: 16px;
  transform: translateX(-50%);
  /* width: 100%; */
}

.footer-button {
  height: 87px;
  padding: 10px;
  position: absolute;
  bottom: 34px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  column-gap: 50px;
  justify-content: center;
  align-items: center;
}
</style>
