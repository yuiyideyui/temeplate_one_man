<template>
  <div>
    <el-table
      @scroll="handleScroll"
      :scrollbar-always-on="scrollbarAlwaysOn"
      :data="tableDataComputed"
      style="width: 100%"
      :maxHeight="maxHeight"
      class="sub_table"
      v-loading="customListLoading"
      element-loading-background="transparent"
      :highlight-current-row="highlightCurrentRow"
      :row-key="rowKey"
      ref="customTableRef"
      :tree-props="treeProps"
      @row-click="rowClick"
      :header-cell-style="headerCellStyle"
    >
      <el-table-column
        v-if="type === 'selection'"
        type="selection"
        width="55"
      />
      <el-table-column
        align="center"
        label="序号"
        v-if="indexType === 'index'"
        type="index"
        width="60"
      />
      <template v-for="item in tableHeader">
        <el-table-column
          :align="item.align"
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="item.showOverflowTooltip"
          :width="item.width"
        >
          <template #default="scope" v-if="item.customList">
            <template v-for="(custom, index) in item.customList">
              <span
                v-if="custom.html"
                :key="index + 'a'"
                :class="item.boxClass || ''"
                :style="item.boxStyle"
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
              ></span>
              <span
                v-else-if="custom.hDom"
                :key="index + 'b'"
                :class="item.boxClass || ''"
                :style="item.boxStyle"
                v-jsx-table="[custom.hDom, scope.row[item.prop], scope.row]"
                @click="
                  custom.click
                    ? (custom.click(scope.row), $event.stopPropagation())
                    : ''
                "
              ></span>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <Pagination
      v-if="my_paginationObj && showPagin"
      @showDate="showDate"
      v-model:paginationObjPage="paginationObjPage"
      v-model:paginationObjLimit="paginationObjLimit"
      :paginationObjTotal="paginationObjTotal"
    />
  </div>
</template>
<script setup lang="tsx">
import Pagination from '@/components/Pagination/index.vue'
import { generateUUID } from '@/utils/uuid'
import { useQuery } from '@tanstack/vue-query'
import { computed, onActivated, onUnmounted, ref, toRef, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    tableData?: any
    indexType?: any
    tableHeader: ItableHeader
    paginationObj?: IpaginationObj | null
    selectable?: any[]
    type?: string
    rowKey?: string
    tableLoading?: false
    customFetchData?: customFetchData<any>
    maxHeight?: string
    highlightCurrentRow?: boolean
    /**是否一直展示滚动条 */
    scrollbarAlwaysOn?: boolean
    showPagin?: boolean
    /**表头样式 */
    headerCellStyle?: any
    /**表单树 */
    treeProps?: {
      children: string
      hasChildren: string
    }
  }>(),
  {
    rowKey: 'id',
    paginationObj: null,
    tableData: () => [],
    maxHeight: '500px',
    highlightCurrentRow: false,
    showPagin: true,
    scrollbarAlwaysOn: false,
  },
)
const elTableRef = ref()
const emits = defineEmits(['pagData', 'rowClick', 'scroll'])
const rowClick = (row: any, column: any, event: any) => {
  emits('rowClick', row, column, event)
}
// const handleScroll = ({scrollLeft,scrollTop})=>{
//   // console.log('----')
//   emits('scroll',scrollLeft,scrollTop)
// }
const handleScroll = ({
  scrollTop,
  scrollLeft,
}: {
  scrollTop: number
  scrollLeft: number
}) => {
  const tableBody = customTableRef.value.$el?.querySelector(
    '.el-scrollbar__wrap',
  ) as HTMLElement
  if (!tableBody) return

  const scrollHeight = tableBody.scrollHeight
  const clientHeight = tableBody.clientHeight

  const isBottom = scrollTop + clientHeight >= scrollHeight - 1
  if (isBottom) {
    if (tableDataComputed.value.length >= allData.value.length) return // 已加载全部，停止加载

    // 加载更多数据
    const nextData = allData.value.slice(
      tableDataComputed.value.length,
      tableDataComputed.value.length + 10,
    )
    tableDataComputed.value.push(...nextData)
  }
}
const customTableRef = ref()
const customTabledData = computed(() => {
  if (props.customFetchData) {
    if (data?.value) {
      if (my_paginationObj.value) {
        my_paginationObj.value.total = data.value.data.count
      }
      return data?.value.data.map((item: any) => {
      return data?.value.data.map((item: any) => {
        //单纯把空数据改成--
        return Object.entries(item).reduce((acc: any, [key, value]) => {
          acc[key] =
            value === null || value === undefined || value === '' ? '--' : value
          return acc
        }, {})
      })
    } else {
      return []
    }
  } else {
    return []
  }
})
const customListLoading = computed(() => {
  if (props.customFetchData) {
    return isFetching.value
  } else {
    return props.tableLoading
  }
})
const allData = ref([])
const tableDataComputed = ref([])

const allData = ref([])
const tableDataComputed = ref([])

const my_paginationObj = toRef<IpaginationObj | null>(props.paginationObj)
const paginationObjPage = computed({
  get: () => {
    return my_paginationObj.value?.page as number
  },
  set: val => {
    if (my_paginationObj.value) {
      my_paginationObj.value.page = val
      fetchData()
    }
  },
})
const paginationObjLimit = computed({
  get: () => {
    return my_paginationObj.value?.limit as number
  },
  set: val => {
    if (my_paginationObj.value) {
      my_paginationObj.value.limit = val
      fetchData()
    }
  },
})
const paginationObjTotal = computed(() => {
  return my_paginationObj.value?.total as number
})
// 更新页数和条数
const showDate = (data: IpaginationObj) => {
  if (my_paginationObj.value) {
    my_paginationObj.value = {
      total: data.total,
      page: data.page,
      limit: data.limit,
    }
    fetchData()
  }
}

const queryParams = computed(() => ({
  limit: my_paginationObj.value?.limit,
  page: my_paginationObj.value?.page,
  ...props.customFetchData?.fetchParams,
}))
const queryKey = computed(() => [
  props.customFetchData?.queryKey || generateUUID(),
  props.customFetchData?.queryKey || generateUUID(),
  queryParams.value,
])

const refetchInterval = computed(() => {
  return props.customFetchData?.refetchInterval ?? 300000
})
const staleTime = computed(() => {
  return props.customFetchData?.staleTime ?? 0
})
const gcTime = computed(() => {
  return props.customFetchData?.gcTime ?? 300000
})
const fetchFn: () => Promise<any> | undefined = () => {
  return props.customFetchData?.fetchFn(queryParams.value)
}
// function usePaginatedList(fetchFn: (params: IpaginationObj) => Promise<any>) {
//   return
// }
if (props.customFetchData?.fetchFn) {
}
const { isFetching, data } = useQuery({
  //参数改变自动请求
  queryKey,
  queryFn: () => fetchFn(),
  staleTime: staleTime,
  gcTime: gcTime,
  refetchInterval: refetchInterval,
  placeholderData: prevData => prevData, // 防止闪烁
  refetchOnWindowFocus: props.customFetchData?.refetchOnWindowFocus
    ? true
    : false, //  关闭页面聚焦重新请求
})
const fetchData = () => {
  if (props.customFetchData) {
    if (my_paginationObj.value) {
    }
  } else {
    emits('pagData', my_paginationObj.value)
  }
}
watch(
  () => [customTabledData.value, props.tableData],
  () => {
    console.log()
    if (props.customFetchData) {
      allData.value = []
      if (customTabledData.value.length > 100) {
        allData.value = customTabledData.value
        tableDataComputed.value = customTabledData.value.slice(0, 20)
      } else {
        tableDataComputed.value = customTabledData.value
      }
      //有自定义自动请求
      // tableDataComputed.value =  customTabledData.value
    } else {
      allData.value = props.tableData
      tableDataComputed.value = props.tableData.slice(0, 20)
      // tableDataComputed.value =  props.tableData
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
defineExpose({
  fetchData,
  customTableRef,
})
if (props.customFetchData) {
  fetchData()
}
onActivated(() => {
  if (props.customFetchData) {
    fetchData()
  }
})
</script>
<style scoped lang="less"></style>
