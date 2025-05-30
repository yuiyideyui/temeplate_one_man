export {}

declare global {
  type Type_MultiButton_children = {
    id: number | string
    type: number | string
    layerName: string
    checked: boolean
    isChildVisible?: boolean
    showFn?: (item?: {
      item: Type_MultiButton_children
      parent: Type_MultiButton_children | TypeFootButtons
    }) => void
    closeFn?: (item?: {
      item: Type_MultiButton_children
      parent: Type_MultiButton_children | TypeFootButtons
    }) => void
    children?: Type_MultiButton_children[] // 递归类型
    [key: string]: any //其他自定义的东西
  }
  type Type_MultiButton = {
    /**子类 */
    layerList: Type_MultiButton_children[] | []
    /**标题 */
    comTitle: string
    /**未选择图片 */
    defaultImage: URL | string
    /**禁用 */
    disabled: boolean
    /**选中图片 */
    selectImg: string | URL
    [key: string]: any //其他自定义的东西
  }[]
}
