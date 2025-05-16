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
                v-jsx-table="[custom.hDom, scope.row[item.prop], scope.row]"
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
    v-model:paginationObjPage="paginationObjPage"
    v-model:paginationObjLimit="paginationObjLimit"
    :paginationObjTotal="paginationObjTotal"
  />
</template>
<script setup lang="ts">
import Pagination from '@/components/Pagination/index.vue'
import { useQuery } from '@tanstack/vue-query'
import { computed, onActivated, ref, toRef, watch } from 'vue'

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
let watchParams = () => {}
if (props.customFetchData?.isWatchParams) {
  watchParams = watch(
    () => props.customFetchData?.fetchParams,
    () => {
      fetchData()
    },
    {
      deep: true,
    },
  )
}
const emits = defineEmits(['pagData'])
const customTableRef = ref()
const customTabledData = computed(() => {
  if (props.customFetchData) {
    if (data?.value) {
      if (my_paginationObj.value) {
        my_paginationObj.value.total = data.value.data.count
      }
      return data?.value.data.rows.map((item: any) => {
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
const tableDataComputed = computed(() => {
  if (props.customFetchData) {
    //有自定义自动请求
    return customTabledData.value
  } else {
    return props.tableData
  }
})
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

const queryParams = ref({
  limit: my_paginationObj.value?.limit,
  page: my_paginationObj.value?.page,
  ...props.customFetchData?.fetchParams,
})
const queryKey = ref<any>([props.customFetchData?.queryKey, queryParams.value])
watch(
  () => queryParams.value,
  newVal => {
    queryKey.value = [props.customFetchData?.queryKey, newVal]
  },
)
function usePaginatedList(fetchFn: (params: IpaginationObj) => Promise<any>) {
  if (props.customFetchData?.staleTime) {
    return useQuery({
      queryKey,
      queryFn: () => fetchFn(queryParams.value as IpaginationObj),
      staleTime: props.customFetchData?.staleTime,
      placeholderData: prevData => prevData, // 占位数据防止闪烁
    })
  } else {
    return useQuery({
      queryKey,
      queryFn: () => fetchFn(queryParams.value as IpaginationObj),
      placeholderData: prevData => prevData, // 占位数据防止闪烁
    })
  }
}
const { isFetching, data } = usePaginatedList(
  props.customFetchData?.fetchFn as any,
)
const fetchData = () => {
  if (props.customFetchData) {
    if (my_paginationObj.value) {
      // 更新参数
      queryParams.value = {
        limit: my_paginationObj.value?.limit,
        page: my_paginationObj.value?.page,
        ...props.customFetchData?.fetchParams,
      }
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
