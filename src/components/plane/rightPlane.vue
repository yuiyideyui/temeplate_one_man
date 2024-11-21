<template>
  <div>
    <KeepAlive>
      <component :is="rightPlane"></component>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import { usePlaneStore } from '@/stores/planeStore';
import { computed, defineAsyncComponent } from 'vue'

const planeStore = usePlaneStore()
//动态导入组件
const _import = (path:string) => defineAsyncComponent(() => import(`@/views/planeCom/${path}/${path}Right.vue`));

const rightPlane = computed(()=>{
  if(planeStore.planeMsg.nowPlane.right){
    return _import(planeStore.planeMsg.nowPlane.right)
  }else{
    return null
  }

})

</script>

<style scoped>

</style>
