<template>
  <div>
    <KeepAlive>
      <component :is="centerPlane"></component>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import { usePlaneStore } from '@/stores/planeStore';
import { computed, defineAsyncComponent } from 'vue'

const planeStore = usePlaneStore()
//动态导入组件
const _import = (path:string) => defineAsyncComponent(() => import(`@/views/planeCom/${path}/${path}Center.vue`));
const centerPlane = computed(()=>{
  if(planeStore.planeMsg.nowPlane.center){
    return _import(planeStore.planeMsg.nowPlane.center)
  }else{
    return null
  }
})

</script>

<style scoped>

</style>
