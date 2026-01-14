export {}

declare global {
    type ItableHeader = {
        prop: string
        children?: ItableHeader[] // 支持多级表头
        label: string
        align?: string
        customList?: {
            html?: (val: string, row: any) => string
            hDom?: (el: Element, binding: IbindingTable, Vnode: any, val: string, row: any) => void //这里需要执行一个H函数--->render(h(ElButton, { class: 'bar', innerHTML: 'hello' }), el) 这里主要可以渲染一个组件
            click?: (row: any) => void
        }[]
        showOverflowTooltip?: boolean
        width?: string
        boxClass?: string
        boxStyle?: string
    }[]
    type IbindingTableValue = [
        (el: Element, binding: IbindingTable, Vnode: any, val: string, row: any) => void,
        string,
        any
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
    type customFetchData<Tparams extends Record<string, any> = Record<string, any>> = {
        fetchFn: (
            params: {
                limit: number
                page: number
            } & Tparams
        ) => Promise<any>
        /**gctime */
        gcTime?: number
        /**请求的参数不包括page和limit */
        fetchParams?: Omit<Tparams, 'limit' | 'page'>
        /**接口数据缓存的时间 */
        staleTime?: number
        /**接口名称用于缓存key匹配 */
        queryKey: any
        /**页面聚焦重新请求-默认true */
        refetchOnWindowFocus?: boolean
        /**自动刷新 */
        refetchInterval?: number
    }
}
