<template>
  <el-table
    :data="tableDataComputed"
    style="width: 100%"
    :maxHeight="maxHeight"
    class="sub_table"
    v-loading="customListLoading"
    element-loading-background="transparent"
    :row-key="rowKey"
    ref="customTableRef"
    :cell-style="{ borderColor: 'none' }"
    :highlight-current-row="rowClick"
    @row-click="rowClickFn"
  >
    <el-table-column v-if="type === 'selection'" type="selection" width="55" />
    <template v-for="item in tableHeader">
      <el-table-column :prop="item.prop" :label="item.label">
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
    @showDate="showDate"
    :pagesizes="[]"
    :pagerCount="5"
    :paginationObj="paginationObj"
  />
</template>
<script setup lang="ts">
import Pagination from '@/components/pagination/index.vue'
import { computed, onMounted, ref, toRef } from 'vue'
const props = withDefaults(
  defineProps<{
    tableData: any
    rowClick?: boolean
    tableHeader: ItableHeader
    paginationObj: IpaginationObj
    selectable?: any[]
    type?: string
    rowKey?: string
    /**
     * 这个是用于自动化请求数据渲染-----
     */
    customFetchData?: {
      fetchFn: (params: any) => Promise<any> //请求
      fetchParams: any //参数
    }
    maxHeight?: string | '500px'
  }>(),
  {
    rowKey: 'id',
    rowClick: false,
  },
)
const emits = defineEmits(['pagData', 'rowClickFn'])
const rowClickFn = (row: any, column: any, event: Event) => {
  emits('rowClickFn', {
    row,
    column,
    event,
  })
}
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
          customTabledData.value = res.data.row
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
onMounted(() => {
  if (props.customFetchData) {
    fetchData()
  }
})
</script>
<style scoped lang="less">
:deep(.el-pagination.is-background) {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  row-gap: 10px;
}
:deep(.el-pagination__sizes) {
  display: none;
}
:deep(.el-pagination__total is-first) {
}
:deep(.el-pagination__goto),
:deep(.el-pagination__classifier),
:deep(.el-pagination__total.is-first) {
  color: #ffffff;
}
:deep(.el-popper) {
  span {
    display: inline-block;
    max-width: 400px;
  }
}
:deep(.cell) {
  color: white;
}
:deep(.el-table__header-wrapper th) {
  background-color: transparent !important;
}
:deep(.el-table__header) {
  tr {
    background: linear-gradient(
      90deg,
      rgba(11, 167, 255, 0.6) 0%,
      rgba(11, 167, 255, 0.3) 100%
    );
  }
}
//:deep(.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell){
//  background-color: transparent !important;
//}
.el-table--enable-row-hover {
  :deep(.el-table__body tr:hover > td.el-table__cell),
  :deep(.el-table__body tr.current-row > td.el-table__cell) {
    background-color: transparent !important;
  }
}
:deep(.el-table__body-wrapper) {
  //*{
  //  background-color: transparent !important;
  //  background: transparent ;
  //  .el-scrollbar__thumb{
  //    background-color: rgba(68, 168, 244, 1) !important;
  //    background: rgba(68, 168, 244, 1) ;
  //  }
  //}

  td {
    border: none;
  }
  .el-table__empty-block {
    background: linear-gradient(
      90deg,
      rgba(201, 201, 201, 0),
      rgba(219, 219, 219, 1),
      rgba(173, 173, 173, 0)
    );
    background-position: bottom;
    background-size: 100% 1px;
    background-repeat: no-repeat;
    color: rgba(255, 255, 255, 1);
    .emptyBox {
      color: #ffffff;
    }
  }
  tr {
    background: linear-gradient(
      90deg,
      rgba(201, 201, 201, 0),
      rgba(219, 219, 219, 1),
      rgba(173, 173, 173, 0)
    );
    background-position: bottom;
    background-size: 100% 1px;
    background-repeat: no-repeat;
    color: rgba(255, 255, 255, 1);
  }
  tr:hover {
    .cell {
      color: #25ffe5;
    }
  }
}
:deep(.el-table__inner-wrapper:before) {
  height: 0;
}
.el-table--fit {
  background: transparent;
}
:deep(.el-table .cell.el-tooltip div) {
  text-overflow: ellipsis;
  overflow: hidden;
}
:deep(.el-table__row.current-row.rowName) {
  color: #25ffe5;
}
</style>
