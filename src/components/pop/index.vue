<template>
  <el-dialog
    v-if="localVisible"
    v-model="localVisible"
    width="1280"
    @close="handleClose"
    :show-close="false"
  >
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = withDefaults(
  defineProps<{
    dialogTableVisible: boolean
    cityName: string
  }>(),
  {
    dialogTableVisible: false,
  },
)
const emit = defineEmits<{
  (e: 'update:dialogTableVisible', value: boolean): void
  (e: 'confirm'): void
}>()

// 本地控制的 visible，用于 v-model 绑定
const localVisible = ref(props.dialogTableVisible)

// 监听 prop -> 同步到本地变量
watch(
  () => props.dialogTableVisible,
  val => {
    localVisible.value = val
  },
)

// 监听本地变化 -> 通知父组件更新
watch(localVisible, val => {
  emit('update:dialogTableVisible', val)
})
// 关闭对话框
const handleClose = () => {
  localVisible.value = false
}
</script>
<style lang="less" scoped></style>
