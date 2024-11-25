import { defineStore } from 'pinia'
import { ref } from 'vue'
type InowPlane = {
  left?:string,
  right?:string,
  center?:string,
}
type IplaneMsg = {
  /**历史的plane */
  historyPlane:{
    name?:string,
    left?:string,
    right?:string,
    center?:string,
  }[],
  /**当前的plane */
  nowPlane:InowPlane,
  /**当前的主题 */
  theme:string,
}
export const usePlaneStore = defineStore('plane', () => {
  const planeMsg = ref<IplaneMsg>({
    historyPlane:[],
    nowPlane:{
      left:'home',
      center:'home',
      right:'home'
    },
    theme:'home'
  })


  /**改变当前的plane */
  const changeNowPlane = (val:InowPlane)=>{
    planeMsg.value.nowPlane = val
    planeMsg.value.historyPlane.push(val)
  }

  /**改变主题清空历史plane */
  const changeTheme = (val:string)=>{
    planeMsg.value.theme = val
    planeMsg.value.historyPlane = []
  }

  /**返回上一个plane */
  const backPlane = ()=>{
    if(planeMsg.value.historyPlane.length > 0){
      const plane:InowPlane = planeMsg.value.historyPlane.pop() as InowPlane
      planeMsg.value.nowPlane = plane
    }else{
      console.error('没有可以返回的Plane')
    }
  }

  return {
    planeMsg,
    changeNowPlane,
    changeTheme,
    backPlane
  }
})
