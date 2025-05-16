export {}

declare global {
  type ItableHeader = {
    prop: string
    label: string
    customList?: {
      html?: (val: string, row: any) => string
      hDom?: (
        el: Element,
        binding: IbindingTable,
        Vnode: any,
        val: string,
        row: any,
      ) => void //这里需要执行一个H函数--->render(h(ElButton, { class: 'bar', innerHTML: 'hello' }), el) 这里主要可以渲染一个组件
      click?: (row: any) => void
    }[]
    showOverflowTooltip?: boolean
    width?: string
    boxClass?: string
    boxStyle?: string
    itemClass?: string
    itemStyle?: string
  }[]
  type IbindingTableValue = [
    (
      el: Element,
      binding: IbindingTable,
      Vnode: any,
      val: string,
      row: any,
    ) => void,
    string,
    any,
  ]
  type IbindingTable = {
    //https://cn.vuejs.org/guide/reusability/custom-directives.html#custom-directives
    value: IbindingTableValue
    oldValue: any
    arg: any
    modifiers: any
    instance: any
    dir: any
  }
  type IpaginationObj = {
    page: number
    limit: number
    total?: number
    buildOrFloorId?: string[] | number[]
    buildingId?: string[] | number[] | any
    floorId?: any
    subType?: any
  }
  type customFetchData = {
    fetchFn: (params: {
      limit: number
      page: number
      [key: string]: any //这里是fetchParams
    }) => Promise<any>
    /**请求的参数不包括page和limit */
    fetchParams?: { [key: string]: any }
    /**接口数据缓存的时间 */
    staleTime?: number
    /**接口名称用于缓存key匹配 */
    queryKey: any
    /**是否监听参数变化自动请求 */
    isWatchParams?: boolean
  }
}
