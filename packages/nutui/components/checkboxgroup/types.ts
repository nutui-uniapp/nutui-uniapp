export interface CheckboxGroupInst {
  /**
   * @description 全选/取消 传 true,表示全选，传 false,表示取消全选
   */
  toggleAll: (checked: boolean) => void
  /**
   * @description 反选
   */
  toggleReverse: () => void
}

// TODO 2.x移除
/**
 * @deprecated
 */
export type CheckBoxInst = CheckboxGroupInst
