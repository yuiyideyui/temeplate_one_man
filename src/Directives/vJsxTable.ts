export default {
  mounted(el: Element, binding: IbindingTable, vnode: any) {
    renderContent(el, binding, vnode)
  },
  updated(el: Element, binding: IbindingTable, vnode: any) {
    // 比较新旧值，避免死循环更新
    if (hasBindingChanged(binding)) {
      renderContent(el, binding, vnode)
    }
  },
}

function renderContent(el: Element, binding: IbindingTable, vnode: any) {
  const renderFn = binding.value?.[0]
  const arg1 = binding.value?.[1]
  const arg2 = binding.value?.[2]
  if (typeof renderFn === 'function') {
    renderFn(el, binding, vnode, arg1, arg2)
  }
}

function hasBindingChanged(binding: IbindingTable): boolean {
  return JSON.stringify(binding.value) !== JSON.stringify(binding.oldValue)
}
