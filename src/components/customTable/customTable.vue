<template>
  <el-table
    :data="tableDataComputed"
    style="width: 100%"
    :maxHeight="maxHeight"
    class="sub_table"
    v-loading="customListLoading"
    :row-key="rowKey"
    ref="customTableRef"
  >
    <el-table-column v-if="type === 'selection'" type="selection" width="55" />
    <template v-for="item in tableHeader">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :show-overflow-tooltip="item.showOverflowTooltip"
        :width="item.width"
      >
        <template #default="scope" v-if="item.customList">
          <div :class="item.boxClass || ''" :style="item.boxStyle">
            <template v-for="(custom, index) in item.customList">
              <div
                v-if="custom.html"
                :key="index + 'a'"
                :class="item.itemClass || ''"
                :style="item.itemStyle"
                v-html="
                  custom.html
                    ? custom.html(scope.row[item.prop], scope.row)
                    : ''
                "
                @click="
                  custom.click
                    ? (custom.click(scope.row), $event.stopPropagation())
                    : ''
                "
              ></div>
              <div
                v-else-if="custom.hDom"
                :key="index + 'b'"
                :class="item.itemClass || ''"
                :style="item.itemStyle"
                v-get-dom="[custom.hDom, scope.row[item.prop], scope.row]"
                @click="
                  custom.click
                    ? (custom.click(scope.row), $event.stopPropagation())
                    : ''
                "
              ></div>
            </template>
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <Pagination
    v-if="paginationObj"
    @showDate="showDate"
    :paginationObj="paginationObj"
  />
</template>
<script setup lang="ts">
import Pagination from '@/components/Pagination/index.vue'
import { computed, onActivated, onMounted, ref, toRef } from 'vue'
const props = withDefaults(
  defineProps<{
    tableData?: any
    tableHeader: ItableHeader
    paginationObj?: IpaginationObj
    selectable?: any[]
    type?: string
    rowKey?: string

    customFetchData?: {
      fetchFn: (params: any) => Promise<any>
      fetchParams: any
    }
    maxHeight?: string | '500px'
  }>(),
  {
    rowKey: 'id',
    paginationObj: null,
  },
)
const emits = defineEmits(['pagData'])
const customTableRef = ref()
const customTabledData = ref<any>()
const customListLoading = ref(false)
const tableDataComputed = computed(() => {
  if (props.customFetchData) {
    return customTabledData.value
  } else {
    return props.tableData
  }
})
const vGetDom = {
  mounted: (el: Element, binding: IbindingTable, Vnode: any) => {
    const renderContent = () => {
      binding.value[0](el, binding, Vnode, binding.value[1], binding.value[2])
    }
    renderContent()
  },
  updated: (el: Element, binding: IbindingTable, Vnode: any) => {
    const renderContent = () => {
      binding.value[0](el, binding, Vnode, binding.value[1], binding.value[2])
    }
    renderContent()
  },
}

const paginationObj = toRef<IpaginationObj>(props.paginationObj)
// 更新页数和条数
const showDate = (data: IpaginationObj) => {
  paginationObj.value.page = data.page
  paginationObj.value.limit = data.limit
  fetchData()
}
const fetchData = () => {
  if (props.customFetchData) {
    customListLoading.value = true
    props.customFetchData
      .fetchFn({
        ...props.customFetchData.fetchParams,
        page: paginationObj.value.page,
        limit: paginationObj.value.limit,
      })
      .then((res: any) => {
        if (res && res.code === 0) {
          paginationObj.value.total = res.data.count
          const processedData = res.data.row.map(item => {
            return Object.entries(item).reduce((acc, [key, value]) => {
              acc[key] =
                value === null || value === undefined || value === ''
                  ? '--'
                  : value
              return acc
            }, {})
          })

          customTabledData.value = processedData
        }
      })
      .finally(() => {
        customListLoading.value = false
      })
  } else {
    emits('pagData', paginationObj.value)
  }
}
defineExpose({
  fetchData,
  customTableRef,
})
onActivated(() => {
  if (props.customFetchData) {
    fetchData()
  }
})
</script>
<style scoped lang="less"></style>
