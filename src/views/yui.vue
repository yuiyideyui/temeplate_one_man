<template>
  <div>
    <customTable
      :tableData="tableData"
      :tableHeader="tableHeader"
      :customFetchData="customFetchData"
      :paginationObj="paginationObj"
    ></customTable>
    <div @click="startEdit">{{ edit ? '取消' : '编辑' }}</div>
  </div>
</template>

<script setup lang="tsx">
import { ElButton, ElInput } from 'element-plus'
import customTable from '@/components/customTable/customTable.vue'
import {
  ref,
  h,
  render,
  onMounted,
  computed,
  watchEffect,
  onDeactivated,
  type WatchHandle,
  nextTick,
} from 'vue'
import { getSubDeviceList } from '@/api/test'

const edit = ref(false)
const showText = computed(() => {
  return edit.value ? 'none' : 'block'
})
const showInput = computed(() => {
  return edit.value ? '' : 'none'
})
const startEdit = () => {
  edit.value = !edit.value
}
const paginationObj = ref({
  page: 1,
  limit: 3,
  total: 100,
})
const customFetchData = {
  fetchFn: (params: { limit: number; page: number }) => {
    return getSubDeviceList(params)
  },
  fetchParams: {},
}
const tableData: any[] = []
const tableHeader: ItableHeader = [
  {
    prop: 'name',
    label: 'name',
    customList: [
      {
        hDom: (
          el: Element,
          binding: IbindingTable,
          Vnode: any,
          val: string,
          row: any,
        ) => {
          render(
            <div key={row['id']}>
              <div class={'showText '}>{row['name']}</div>
              <ElInput
                class={'showInput '}
                v-model={row['name']}
                onInput={(event: any) => {
                  row['name'] = event
                }}
              ></ElInput>
            </div>,
            el,
          )
        },
      },
    ],
  },
]
</script>

<style scoped>
:deep(.showText) {
  display: v-bind(showText);
  height: 32px;
  line-height: 32px;
  width: 100%;
  &.edit {
    display: none;
  }
}
:deep(.showInput) {
  display: v-bind(showInput);
  &.edit {
    display: block;
  }
}
</style>
