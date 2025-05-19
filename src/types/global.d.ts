
export { };

declare global {
  type ApiResponse<T = any> = {
    code: number;
    data: T;
    msg: string;
  }
  type IbindingDomValue = [(el: Element, binding: IbindingDom, Vnode: any) => void, string, any];
  type IbindingDom = {
    //https://cn.vuejs.org/guide/reusability/custom-directives.html#custom-directives
    value: IbindingDomValue;
    oldValue: any;
    arg: any;
    modifiers: any;
    instance: any;
    dir: any;
  };
}
