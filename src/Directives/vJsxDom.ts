import type { DirectiveBinding, VNode } from 'vue'

function handleUpdate(el: Element, binding: DirectiveBinding, vnode: VNode) {
  try {
    const value = binding.value
    if (Array.isArray(value) && typeof value[0] === 'function') {
      const fn = value[0]
      // 延迟执行以防止递归更新
      setTimeout(() => {
        fn(el, binding, vnode)
      })
    } else {
      console.warn('[v-jsx-dom] Invalid binding value:', value)
    }
  } catch (err) {
    console.error('[v-jsx-dom] handleUpdate error:', err)
  }
}

export default {
  mounted(el: Element, binding: DirectiveBinding, vnode: VNode) {
    handleUpdate(el, binding, vnode)
  },
  updated(el: Element, binding: DirectiveBinding, vnode: VNode) {
    // 比较绑定值，避免死循环
    if (binding.value !== binding.oldValue) {
      handleUpdate(el, binding, vnode)
    }
  },
}
