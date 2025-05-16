<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, onUnmounted } from 'vue'
import { ElPagination } from 'element-plus'
const props = withDefaults(
  defineProps<{
    paginationObjPage: number
    paginationObjLimit: number
    paginationObjTotal: number
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

const emit = defineEmits([
  'update:paginationObjPage',
  'update:paginationObjPageLimit',
])
const currentPage = ref(props.paginationObjPage)
const pageSize = ref(props.paginationObjLimit)
// 派发事件给父组件
const handleCurrentChange = (val: number) => {
  emit('update:paginationObjPage', val)
}

const handleSizeChange = (val: number) => {
  emit('update:paginationObjPageLimit', val)
}
// 同步 props 改变
watch(
  () => props.paginationObjPage,
  val => (currentPage.value = val),
)
watch(
  () => props.paginationObjLimit,
  val => (pageSize.value = val),
)
</script>

<template>
  <div
    class="flex justify-content-flex-end paginationCus"
    style="padding-top: 20px"
  >
    <el-pagination
      :hide-on-single-page="false"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :pager-count="pagerCount"
      :page-sizes="pagesizes"
      :total="paginationObjTotal"
      background
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<style lang="less">
.el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background-color: #027e70;
}
</style>

<style lang="less" scoped>
.paginationCus {
  :deep(.el-pagination) {
    display: flex;
    align-items: center;
  }
}
</style>
