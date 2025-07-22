<template>
  <div class="layer-item">
    <div class="item-header">
      <input
        class="checkbox"
        type="checkbox"
        :ref="el => setIndeterminate(el, item)"
        :class="indeterminateImg ? 'indeterminateImg' : ''"
        v-model="item.checked"
        @change="handleCheckChange"
      />
      <span style="cursor: context-menu" @click="toggleChildren"
        ><el-icon
          v-if="
            item.children && item.children.length > 0 && !item.isChildVisible
          "
          ><CaretRight
        /></el-icon>
        <el-icon
          v-if="
            item.children && item.children.length > 0 && item.isChildVisible
          "
          ><CaretBottom /></el-icon
        >{{ item.layerName }}</span
      >
    </div>

    <transition name="fade-slide">
      <div
        v-if="item.isChildVisible && item.children && item.children.length > 0"
        class="children-list"
      >
        <LayerItem
          v-for="child in item.children"
          :key="child.id"
          :item="child"
          :parent="item"
          @check-change="handleChildCheckChange"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'

// ✅ 引用自身
const props = defineProps<{
  item: Type_MultiButton_children
  parent?: Type_MultiButton_children | null
}>()
const indeterminateImg = ref(false)
function setIndeterminate(
  el: HTMLInputElement | null,
  item: Type_MultiButton_children,
) {
  if (!el || !item.children) return
  const allChecked = item.children.every(child => child.checked)
  const noneChecked = item.children.every(child => !child.checked)
  indeterminateImg.value = el.indeterminate = !allChecked && !noneChecked
}
const checkboxRef = ref()
const emits = defineEmits<{
  (
    e: 'check-change',
    child: Type_MultiButton_children,
    parent?: Type_MultiButton_children | null,
  ): void
}>()

function handleCheckChange() {
  emits('check-change', props.item, props.parent ?? null)
}

function handleChildCheckChange(childItem: typeof props.item) {
  emits('check-change', childItem, props.item)
}

function toggleChildren() {
  props.item.isChildVisible = !props.item.isChildVisible
}
</script>

<style scoped></style>
