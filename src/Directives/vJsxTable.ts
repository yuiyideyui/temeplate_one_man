export default {
  mounted: (el: Element, binding: IbindingTable, Vnode: any) => {
    const renderContent = () => {
      binding.value[0](
        el,
        binding,
        Vnode,
        binding.value[1],
        binding.value[2],
      )
    }
    renderContent()
  },
  updated: (el: Element, binding: IbindingTable, Vnode: any) => {
    const renderContent = () => {
      binding.value[0](
        el,
        binding,
        Vnode,
        binding.value[1],
        binding.value[2],
      )
    }
    renderContent()
  },
}
