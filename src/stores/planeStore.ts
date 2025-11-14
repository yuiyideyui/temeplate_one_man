import { defineStore } from 'pinia'
import { ref } from 'vue'
import { addThemeToPlane } from './hook'
export const usePlaneStore = defineStore('plane', () => {
  const planeMsg = ref<IplaneMsg>({
    historyPlane: [],
    nowPlane: {},
    theme: '',
  })
  /**
   * 预设的plane主题
   *
   */
  const planePreSet = {
    oneTheme: {
      home: {
        plane: {
          left: 'home',
          center: 'home',
          right: 'home',
        },
      },
    },
    twoTheme: {
      test: {
        plane: {
          left: 'test',
        },
      },
    },
  } as const
  // 每一个plane下自动加上主题名称
  //   plane: {
  //       left: 'home',
  //       center: 'home',
  //       right: 'home',
  //   }, => plane: {
  //       left: 'home',
  //       center: 'home',
  //       right: 'home',
  //       theme:'oneTheme'
  //   },
  const planePreSetWithTheme = addThemeToPlane(planePreSet)

  /**
   * 改变当前的plane
   * @param plane
   * @param clearHistory 是否清除历史记录 -> 一般改theme时候清。默认false
   * @param data 数据
   */
  const changeNowPlane = (
    plane: InowPlane,
    clearHistory: boolean = false,
    data: any = undefined,
  ) => {
    planeMsg.value.nowPlane = plane
    if (clearHistory) {
      planeMsg.value.historyPlane = []
    }
    planeMsg.value.historyPlane.push({
      ...plane,
      data,
    })
    if (plane.theme) {
      planeMsg.value.theme = plane.theme
    }
  }

  /**返回上一个plane */
  const backPlane = () => {
    if (planeMsg.value.historyPlane.length > 0) {
      const plane: InowPlane = planeMsg.value.historyPlane.pop() as InowPlane
      planeMsg.value.nowPlane = plane
    } else {
      console.error('没有可以返回的Plane')
    }
  }

  return {
    planeMsg,
    planePreSetWithTheme,
    changeNowPlane,
    backPlane,
  }
})
