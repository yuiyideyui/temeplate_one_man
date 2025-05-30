<script setup lang="tsx">
import { RouterView, useRouter } from 'vue-router'
import { getSub, getSubDeviceList } from '@/api/test'
import { computed, onMounted, ref } from 'vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useQueryApiStore } from '@/stores/useQueryApi'
import Yui from './views/yui.vue'
const queryApiStore = useQueryApiStore()
const router = useRouter()

const { isPending, isError, data, error } = queryApiStore.useTodos(
  'getSubDeviceList',
  getSubDeviceList,
  {
    limit: 1,
  },
)
const clickFn = () => {
  router.push({ name: 'yui' })
}
const dataList = computed(() => {
  if (data.value?.code === 0) {
    return data.value.data.rows
  } else {
    return []
  }
})

onMounted(() => {
  getSub().then(res => {
    console.log('res', res)
  })
})
</script>

<template>
  <div @click="clickFn">11111111111</div>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <!-- We can assume by this point that `isSuccess === true` -->
  <ul v-else-if="dataList.length > 0">
    {{
      dataList.map((item, index) => {
        return item.name
      })
    }}
  </ul>
  <div>
    <RouterView />
    <!-- <Yui></Yui> -->
    <!-- <Yui></Yui> -->
    <!-- <VueQueryDevtools></VueQueryDevtools> -->
  </div>
</template>

<style lang="less"></style>
