# Demo

customList文本与input编辑

```vue
<template>
  <div>
    <customTable
      :tableData="tableData"
      :tableHeader="tableHeader"
    ></customTable>
    <div @click="startEdit">{{ edit ? '取消' : '编辑' }}</div>
  </div>
</template>

<script setup lang="ts">
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
} from 'vue'

const edit = ref(false)
const showText = computed(() => {
  return edit.value ? 'none' : ''
})
const showInput = computed(() => {
  return edit.value ? '' : 'none'
})
const startEdit = () => {
  edit.value = !edit.value
}
const tableData = [
  {
    test: '1',
  },
  {
    test: '2',
  },
  {
    test: '3',
  },
  {
    test: '4',
  },
]
const tableHeader: ItableHeader = [
  {
    prop: 'test',
    label: 'test',
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
            //这里也可以写jsx--
            h('div', [
              h('span', { class: 'showText' }, row['test']),
              h(ElInput, {
                class: 'showInput',
                modelValue: row['test'],
                onInput(event) {
                  row['test'] = event
                },
              }),
            ]),
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
}
:deep(.showInput) {
  display: v-bind(showInput);
}
</style>
```
