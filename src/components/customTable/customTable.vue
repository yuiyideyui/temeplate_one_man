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
    v-if="my_paginationObj"
    @showDate="showDate"
    :paginationObj="my_paginationObj"
  />
</template>
<script setup lang="ts">
import Pagination from '@/components/Pagination/index.vue'
import { useQueryApiStore } from '@/stores/useQueryApi'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { computed, onActivated, onMounted, ref, toRef } from 'vue'
const queryApiStore = useQueryApiStore()
type customFetchData = {
  fetchFn: (params: {
    limit: number
    page: number
    [key: string]: any
  }) => Promise<any>
  fetchParams?: { [key: string]: any }
  staleTime?: number
}
const props = withDefaults(
  defineProps<{
    tableData?: any
    tableHeader: ItableHeader
    paginationObj?: IpaginationObj | null
    selectable?: any[]
    type?: string
    rowKey?: string
    tableLoading?: false
    customFetchData?: customFetchData
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
const customListLoading = computed(() => {
  // console.log('isPending', isPending)
  if (props.customFetchData) {
    if (data.value) {
      initTableData()
    }

    return isFetching.value
  } else {
    return props.tableLoading
  }
})
const tableDataComputed = computed(() => {
  if (props.customFetchData) {
    //有自定义自动请求
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

const my_paginationObj = toRef<IpaginationObj | null>(props.paginationObj)
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

const queryParams = ref({
  limit: my_paginationObj.value?.limit,
  page: my_paginationObj.value?.page,
  ...props.customFetchData?.fetchParams,
})
function usePaginatedList(fetchFn: (params: IpaginationObj) => Promise<any>) {
  if (props.customFetchData?.staleTime) {
    return useQuery({
      queryKey: ['paginated-list', queryParams.value],
      queryFn: () => fetchFn(queryParams.value as IpaginationObj),
      staleTime: props.customFetchData?.staleTime,
      placeholderData: prevData => prevData, // 占位数据防止闪烁
    })
  } else {
    return useQuery({
      queryKey: ['paginated-list', queryParams.value],
      queryFn: () => fetchFn(queryParams.value as IpaginationObj),
    })
  }
}
const { isFetching, refetch, data } = usePaginatedList(
  props.customFetchData?.fetchFn as any,
)
const initTableData = () => {
  if (props.customFetchData) {
    customTabledData.value = data?.value.data.rows.map((item: any) => {
      //单纯把空数据改成--
      return Object.entries(item).reduce((acc: any, [key, value]) => {
        acc[key] =
          value === null || value === undefined || value === '' ? '--' : value
        return acc
      }, {})
    })
  }
}
const fetchData = () => {
  if (props.customFetchData) {
    if (my_paginationObj.value) {
      // 更新参数
      // queryParams.value = {
      //   limit: my_paginationObj.value?.limit,
      //   page: my_paginationObj.value?.page,
      //   ...props.customFetchData?.fetchParams,
      // }
      queryParams.value.page = my_paginationObj.value?.page

      // 触发请求
      // refetch().then(res => {
      //   console.log('res', res)
      //   initTableData(res.data)
      // })
    }
  } else {
    emits('pagData', my_paginationObj.value)
  }
}
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
