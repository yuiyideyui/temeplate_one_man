<template>
  <div>
    <Transition name="fade">
      <KeepAlive>
        <component :is="centerPlane"></component>
      </KeepAlive>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { usePlaneStore } from '@/stores/planeStore'
import { shallowRef, watch } from 'vue'

const planeStore = usePlaneStore()

const components = import.meta.glob('@/views/planeCom/*/*Center.vue')

// 缓存已加载的组件（用于 KeepAlive）
const centerPlaneComponents: Record<string, any> = {}

const centerPlane = shallowRef()

watch(
  () => planeStore.planeMsg.nowPlane.center,
  async componentName => {
    if (!componentName) {
      centerPlane.value = null
      return
    }

    // 已加载则直接使用缓存
    if (centerPlaneComponents[componentName]) {
      centerPlane.value = centerPlaneComponents[componentName]
    } else {
      // 查找路径匹配该组件名的 Center.vue
      const entry = Object.entries(components).find(([path]) =>
        path.includes(`/${componentName}/${componentName}Center.vue`),
      )
      if (entry) {
        const [path, loader] = entry
        const module = await loader()
        centerPlaneComponents[componentName] = (
          module as { default: any }
        ).default
        centerPlane.value = (module as { default: any }).default
      } else {
        console.warn(`未找到组件: ${componentName}`)
        centerPlane.value = null
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
