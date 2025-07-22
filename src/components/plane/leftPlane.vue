<template>
  <div>
    <Transition name="fade">
      <KeepAlive>
        <component :is="leftPlane"></component>
      </KeepAlive>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { usePlaneStore } from '@/stores/planeStore'
import { shallowRef, watch } from 'vue'

const planeStore = usePlaneStore()

const components = import.meta.glob('@/views/planeCom/*/*Left.vue')

// 缓存已加载的组件（用于 KeepAlive）
const leftPlaneComponents: Record<string, any> = {}

const leftPlane = shallowRef()

watch(
  () => planeStore.planeMsg.nowPlane.left,
  async componentName => {
    if (!componentName) {
      leftPlane.value = null
      return
    }

    // 已加载则直接使用缓存
    if (leftPlaneComponents[componentName]) {
      leftPlane.value = leftPlaneComponents[componentName]
    } else {
      // 查找路径匹配该组件名的 Left.vue
      const entry = Object.entries(components).find(([path]) =>
        path.includes(`/${componentName}/${componentName}Left.vue`),
      )
      if (entry) {
        const [path, loader] = entry
        const module = await loader()
        leftPlaneComponents[componentName] = (
          module as { default: any }
        ).default
        leftPlane.value = (module as { default: any }).default
      } else {
        console.warn(`未找到组件: ${componentName}`)
        leftPlane.value = null
      }
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s; /* 设置过渡时间为 0.5 秒 */
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0; /* 元素进入时透明度为 0，离开时透明度为 0 */
}
</style>
