<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { ElPagination } from 'element-plus'

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

const emit = defineEmits<{
  (e: 'showDate', paginationObj: IpaginationObj): void
}>()

const pagination = ref<IpaginationObj>({
  page: props.paginationObj?.page || 1,
  limit: props.paginationObj?.limit || 10,
  total: props.paginationObj?.total || 0,
})

const pagesizes = props.pagesizes || [10, 30, 50, 70, 90]

// ✅ 当页数或页容量发生变化时，统一触发事件
watch(
  () => pagination.value,
  val => {
    emit('showDate', val)
  },
  {
    deep: true,
  },
)
</script>

<template>
  <div
    class="flex justify-content-flex-end paginationCus"
    style="padding-top: 20px"
  >
    <el-pagination
      :hide-on-single-page="false"
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.limit"
      :pager-count="pagerCount"
      :page-sizes="pagesizes"
      :total="pagination.total"
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
