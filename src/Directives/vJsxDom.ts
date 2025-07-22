import type { DirectiveBinding } from 'vue'

function handleUpdate(el: Element, binding: DirectiveBinding, vnode: any) {
  const [fn] = binding.value || []
  if (typeof fn === 'function') {
    // 延迟更新防止递归
    setTimeout(() => {
      fn(el, binding, vnode)
    })
  }
}
export default {
  mounted: handleUpdate,
  updated(el: Element, binding: DirectiveBinding, vnode: any) {
    if (binding.value !== binding.oldValue) {
      handleUpdate(el, binding, vnode)
    }
  },
}
