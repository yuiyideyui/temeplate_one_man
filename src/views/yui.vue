<template>
  <div>
    <customTable
      :tableData="tableData"
      :tableHeader="tableHeader"
      :customFetchData="customFetchData"
      :paginationObj="paginationObj"
      :treeProps="{
        children: 'subList',
        hasChildren: 'hasChildren',
      }"
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
  reactive,
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
const customFetchData = ref<
  customFetchData<{
    yui: number | string
    cc: number | string
  }>
>({
  fetchFn: (params: { limit: number; page: number }) => {
    return getSubDeviceList(params)
  },
  fetchParams: {
    yui: 1,
    cc: 1,
  },
  queryKey: '1',
})
// setTimeout(() => {
//   if (customFetchData.value.fetchParams) {
//     customFetchData.value.fetchParams.yui = '--'
//     customFetchData.value.fetchParams.cc = '-123-'
//   }
// }, 4000)
const exChangeInput = (attName: string, class2: string) => {
  const el = document.querySelector(attName)
  if (el) {
    el.className = el.className.replace('classShow', 'classHidden')
  }
  const el2 = document.querySelector(class2)
  if (el2) {
    el2.className = el2.className.replace('classHidden', 'classShow')
    nextTick(() => el2.querySelector('input')?.focus())
  }
}
const tableData: any[] = []
const tableHeader: ItableHeader = [
  {
    prop: 'name',
    label: 'name',
    boxStyle: 'display:inline-block',
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
              <div
                class={['classShow', 'showText']}
                data-id={'showText ' + row['id']}
                onClick={() =>
                  exChangeInput(
                    '[data-id="showText ' + row['id'] + '"]',
                    '[data-id="showInput ' + row['id'] + '"]',
                  )
                }
              >
                {row['name']}
              </div>
              <div
                data-id={'showInput ' + row['id']}
                class={['classHidden', 'showInput']}
              >
                <ElInput
                  v-model={row['name']}
                  onInput={(event: any) => {
                    console.log('event', event)
                    row['name'] = event
                  }}
                  onBlur={() =>
                    exChangeInput(
                      '[data-id="showInput ' + row['id'] + '"]',
                      '[data-id="showText ' + row['id'] + '"]',
                    )
                  }
                ></ElInput>
              </div>
            </div>,
            el,
          )
        },
      },
    ],
  },
]
</script>

<style scoped lang="less">
//这里用于点击编辑的时候全部设置编辑
// :deep(.showText) {
//   display: v-bind(showText) !important;
// }
// :deep(.showInput) {
//   display: v-bind(showInput) !important;
// }
:deep(.classShow) {
  //display: v-bind(showText);
  display: block;
  line-height: 32px;
  width: 100%;
  &.edit {
    display: none;
  }
}
:deep(.classHidden) {
  display: none;
  line-height: 32px;
  width: 100%;
  &.edit {
    display: block;
  }
}
</style>
