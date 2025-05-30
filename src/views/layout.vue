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
          class="test"
          :buttonData="button"
          @childChecked="handleChildChecked($event, index)"
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
    // footButtons.value[index].disabled ? useCloseRoad() : useInitRoad()
  } else if (footButtons.value[index].comTitle === '设备') {
    if (!footButtons.value[index].disabled) {
      footButtons.value[index].layerList.forEach((item, index) => {
        if (item.checked) {
          if (item.showFn) {
            item.showFn()
          }
        } else {
          if (item.closeFn) {
            item.closeFn()
          }
        }
      })
    } else {
      footButtons.value[index].layerList.forEach((item, index) => {
        if (item.closeFn) {
          item.closeFn()
        }
      })
    }
  } else if (footButtons.value[index].comTitle === '交叉口') {
    if (footButtons.value[index].disabled) {
      // dialogStore.dialog_com = ''
      // useCloseJiaochakou()
    } else {
      // useShowJiaochakou()
    }
  }
}
const test2CahangePlane = () => {
  planeStore.changeNowPlane({
    center: 'test2',
  })
}

const footButtons = ref<Type_MultiButton>([
  {
    comTitle: '路网',
    defaultImage: new URL(
      `@/assets/image/greenRoadPlanning/7_1.png`,
      import.meta.url,
    ).href,
    disabled: false,
    selectImg: new URL(
      `@/assets/image/greenRoadPlanning/7.png`,
      import.meta.url,
    ).href,
    layerList: [],
  },
  {
    disabled: true,
    comTitle: '设备',
    defaultImage: new URL(
      `@/assets/image/greenRoadPlanning/8_1.png`,
      import.meta.url,
    ).href,
    selectImg: new URL(
      `@/assets/image/greenRoadPlanning/8.png`,
      import.meta.url,
    ).href,
    default: 'allChecked',
    layerList: [
      {
        id: '全选',
        type: 14,
        checked: false,
        layerName: '全选',
        showFn: item => {
          if (item) {
            selectAllChildren(item)
          }
        },
        closeFn: item => {
          if (item) {
            selectAllChildren(item)
          }
        },
        isChildVisible: true,
        children: [
          {
            id: '全选',
            type: 14,
            checked: false,
            layerName: '全选',
            showFn: item => {
              if (item) {
                selectAllChildren(item)
              }
            },
            closeFn: item => {
              if (item) {
                selectAllChildren(item)
              }
            },
            children: [
              {
                id: '全选',
                type: 14,
                checked: false,
                layerName: '全选',
                showFn: item => {
                  if (item) {
                    selectAllChildren(item)
                  }
                },
                closeFn: item => {
                  if (item) {
                    selectAllChildren(item)
                  }
                },
              },
              {
                id: '卡口',
                type: 14,
                checked: true,
                layerName: '卡口',
                showFn: () => {},
                closeFn: () => {},
              },
              {
                id: '信号机',
                type: 14,
                checked: true,
                layerName: '信号机',
                // showFn: useShowXinhaoji,
                // closeFn: useCloseXinhaoji,
              },
            ],
          },
          {
            id: '卡口',
            type: 14,
            checked: true,
            layerName: '卡口',
            showFn: () => {},
            closeFn: () => {},
          },
          {
            id: '信号机',
            type: 14,
            checked: true,
            layerName: '信号机',
            // showFn: useShowXinhaoji,
            // closeFn: useCloseXinhaoji,
          },
        ],
      },
      {
        id: '卡口',
        type: 14,
        checked: true,
        layerName: '卡口',
        showFn: () => {},
        closeFn: () => {},
      },
      {
        id: '信号机',
        type: 14,
        checked: true,
        layerName: '信号机',
        // showFn: useShowXinhaoji,
        // closeFn: useCloseXinhaoji,
      },
    ],
  },
  {
    disabled: true,
    comTitle: '交叉口',
    defaultImage: new URL(
      `@/assets/image/greenRoadPlanning/9_1.png`,
      import.meta.url,
    ).href,
    selectImg: new URL(
      `@/assets/image/greenRoadPlanning/9.png`,
      import.meta.url,
    ).href,
    layerList: [],
  },
])

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
