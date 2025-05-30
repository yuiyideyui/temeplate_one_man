const selectAllChildren = (item: {
  item: Type_MultiButton_children
  parent: Type_MultiButton | Type_MultiButton_children
}) => {
  const setCheckedRecursive = (
    node: Type_MultiButton_children,
    checked: boolean,
  ) => {
    node.checked = checked
    node.children?.forEach(child => {
      setCheckedRecursive(child, checked)
    })
  }
  setCheckedRecursive(item.item, item.item.checked)
}
/**
 * 递归设置 checked 状态（从下往上）
 */
const updateParentCheckedStatus = (
  node: Type_MultiButton_children,
): boolean => {
  if (!node.children || node.children.length === 0) {
    // 没有子节点，直接返回自身状态
    return node.checked
  }

  const childrenCheckedStates = node.children.map(child =>
    updateParentCheckedStatus(child),
  )

  const allChecked = childrenCheckedStates.every(v => v === true)
  const noneChecked = childrenCheckedStates.every(v => v === false)

  // 设置当前节点的状态
  if (allChecked) {
    node.checked = true
  } else if (noneChecked) {
    node.checked = false
  } else {
    // 半选标志，Vue3 中只能通过 ref 设置 checkbox 的 indeterminate 属性
    node.checked = false // 也可以用 null 或其他值标记半选
    node._indeterminate = true // 自定义字段，用于在渲染时设置 indeterminate
  }

  return node.checked
}
const updateAllParentCheckedStatus = (buttons: Type_MultiButton) => {
  buttons.forEach(btn => {
    btn.layerList.forEach(item => {
      updateParentCheckedStatus(item)
    })
  })
}

export { selectAllChildren, updateAllParentCheckedStatus }
