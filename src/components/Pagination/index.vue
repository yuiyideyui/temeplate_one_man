<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { ElConfigProvider, ElPagination } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// **Props 类型定义**
// interface IpaginationObj {
//   page: number;
//   limit: number;
//   total?: number;
// }

const props = withDefaults(
  defineProps<{
    paginationObj: IpaginationObj
    pagesizes?: number[]
    pagerCount?: number
    width?: string
    height?: string
  }>(),
  {
    pagerCount: 5,
    width: '32px',
    height: '32px',
  },
)

// **默认值与响应式数据**
const pagination = ref<IpaginationObj>({
  page: props.paginationObj?.page || 1,
  limit: props.paginationObj?.limit || 10,
  total: props.paginationObj?.total || 0,
})

const pagesizes = props.pagesizes || [10, 30, 50, 70, 90]
const small = ref(true)

// **事件触发**
const emit = defineEmits<{
  (e: 'showDate', paginationObj: IpaginationObj): void
}>()

// **每页条数改变处理**
const handleSizeChange = (val: number) => {
  pagination.value.limit = val
  handleCurrentChange(pagination.value.page)
}

// **当前页改变处理**
const handleCurrentChange = (val: number) => {
  pagination.value.page = val
  emit('showDate', pagination.value)
}

// **监听 `paginationObj` 的变化**
watch(
  () => props.paginationObj,
  newVal => {
    if (newVal) {
      pagination.value = { ...pagination.value, ...newVal }
    }
  },
  { deep: true },
)
</script>

<template>
  <div
    class="flex justify-content-flex-end paginationCus"
    style="padding-top: 20px"
  >
    <ElConfigProvider :locale="zhCn">
      <el-pagination
        :hide-on-single-page="false"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :pager-count="pagerCount"
        background
        :current-page="pagination.page"
        :page-sizes="pagesizes"
        :page-size="pagination.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      />
    </ElConfigProvider>
  </div>
</template>

<style lang="less">
.is-last {
  cursor: pointer;
}

.el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background-color: #027e70;
}
</style>

<style lang="less" scoped>
.paginationCus {
  :deep(.el-pagination) {
    display: flex;
    align-items: center;
    //background: red;
    // --el-pagination-button-width: v-bind(width);
    // --el-pagination-button-height: v-bind(height);
  }
}
</style>
