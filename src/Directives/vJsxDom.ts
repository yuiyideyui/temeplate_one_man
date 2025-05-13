export default {
  mounted: (el: Element, binding: IbindingDom, Vnode: any) => {
    const renderContent = () => {
      binding.value[0](el, binding, Vnode);
    };
    renderContent();
  },
  updated: (el: Element, binding: IbindingDom, Vnode: any) => {
    const renderContent = () => {
      binding.value[0](el, binding, Vnode);
    };
    renderContent();
  }
};
