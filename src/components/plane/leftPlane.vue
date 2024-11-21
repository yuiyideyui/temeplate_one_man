<template>
  <div>
    <KeepAlive>
      <component :is="leftPlane"></component>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import { usePlaneStore } from '@/stores/planeStore';
import { computed, defineAsyncComponent } from 'vue'

const planeStore = usePlaneStore()
//动态导入组件
const _import = (path:string) => defineAsyncComponent(() => import(`@/views/planeCom/${path}/${path}Left.vue`));

const leftPlane = computed(()=>{
  if(planeStore.planeMsg.nowPlane.left){
    return _import(planeStore.planeMsg.nowPlane.left)
  }else{
    return null
  }
})

</script>

<style scoped>

</style>
