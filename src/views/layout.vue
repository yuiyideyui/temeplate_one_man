<template>
  <div id="mainBox">
    <div id="topTitle" @click="testChangePlane">点击切换test</div>

    <div @click="test2CahangePlane">点击切换test2</div>
    <div @click="backPlane">backPlane</div>
    
    <div id="planeBox">
      <leftPlane></leftPlane>
      <centerPlane></centerPlane>
      <rightPlane></rightPlane>
    </div> 

    <div class="testBox">
      <MultiButton
      class="test"
      :layerList="layerList"
      width="150px"
      height="300px"
      comImage="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      comTitle="test标题"

      @parentChecked="handleParentChecked"
      ></MultiButton>
    </div>
    <div></div>
  </div>
</template>
<style scoped>
.mainBox{
  position: relative;
}
.testBox{
 
  width: 300px;
  height: 300px;
  border: 1px solid red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
 
</style>
<script setup lang="ts">
import {ref} from "vue"
import leftPlane from '@/components/plane/leftPlane.vue'
import rightPlane from '@/components/plane/rightPlane.vue'
import centerPlane from '@/components/plane/centerPlane.vue'
import MultiButton from '@/components/MultiButton/index.vue'
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

const handleParentChecked = (item) => {
  console.log("选中的父级:", item);
};
const test2CahangePlane = ()=>{
  planeStore.changeNowPlane({
    center: 'test2'
  })
}
const layerList  = ref(   [
            {
              id: "公安实有单位",
              type: 14,
              isShow: true,
              layerName: "公安实有单位",
              imgType: 2,
              img: './img/organization/公安实有单位.png'
            },
            {
              id: "市场主体",
              type: 11,
              isShow: true,
              layerName: "市场主体",
              imgType: 2,
              img: './img/organization/市场主体.png',
              children: [
                {
                  id: "企业",
                  // type: 2,
                  param:'qy',
                  isShow: true,
                  layerName: "企业",
                  imgType: 2,
                  img: './img/organization/企业.png'
                },
                {
                  id: "个体户",
                  // type: 3,
                  param:'gth',
                  isShow: true,
                  layerName: "个体户",
                  imgType: 2,
                  img: './img/organization/个体户.png'
                },
              ]
            },
            {
              id: "事业单位",
              type: 1,
              isShow: true,
              layerName: "事业单位",
              imgType: 2,
              img: './img/organization/事业单位.png'
            },
            {
              id: "行政单位",
              type: 2,
              isShow: true,
              layerName: "行政单位",
              imgType: 2,
              img: './img/organization/行政单位.png'
            },
            {
              id: "其他单位",
              type: '',
              isShow: true,
              layerName: "其他单位",
              imgType: 2,
              img: './img/organization/其他单位.png',
              children: [
                {
                  id: "学校机构",
                  type: 3,
                  isShow: true,
                  layerName: "学校机构",
                  imgType: 2,
                  img: './img/organization/学校机构.png'
                },
                {
                  id: "污染源企业",
                  type: 9,
                  isShow: true,
                  layerName: "污染源企业",
                  imgType: 2,
                  img: './img/organization/污染源企业.png'
                },
                {
                  id: "医疗机构",
                  type: 10,
                  isShow: true,
                  layerName: "医疗机构",
                  imgType: 2,
                  img: './img/organization/医疗机构.png'
                },
                {
                  id: "社会组织",
                  type: 12,
                  isShow: true,
                  layerName: "社会组织",
                  imgType: 2,
                  img: './img/organization/社会组织.png'
                },
                {
                  id: "养老机构",
                  type: 13,
                  isShow: true,
                  layerName: "养老机构",
                  imgType: 2,
                  img: './img/organization/养老机构.png'
                },
              ]
            },

          ] as any,
        )
</script>


