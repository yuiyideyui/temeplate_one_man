import { ref } from 'vue'

export const footButtons = ref([
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
      // {
      //   id: '全选',
      //   type: 14,
      //   checked: false,
      //   layerName: '全选',
      //   imgType: 2,
      //   showFn:()=>{
      //     footButtons.value[1].layerList.forEach(item=>{
      //       item.checked = true
      //     })
      //     useShowKakou()
      //     useShowXinhaoji()
      //
      //   },
      //   closeFn:()=>{
      //     useCloseKakou()
      //     useCloseXinhaoji()
      //     footButtons.value[1].layerList.forEach(item=>{
      //       item.checked = false
      //     })
      //   },
      // },
      {
        id: '卡口',
        type: 14,
        checked: true,
        layerName: '卡口',
        imgType: 2,
        showFn: () => {},
        closeFn: () => {},
      },
      {
        id: '信号机',
        type: 14,
        checked: true,
        layerName: '信号机',
        imgType: 2,
        showFn: () => {},
        closeFn: () => {},
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
