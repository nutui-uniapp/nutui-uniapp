export interface MenuItemState {
  showPopup: boolean
  showWrapper: boolean
}

export interface MenuItemOption {
  text: string
  value: number | string
}

export interface MenuItemInst {
  /**
   * @description 变更选择项
   */
  change: (value?: number | string) => any
  /**
   * @description 切换菜单展示状态，传 `true` 为显示，`false` 为隐藏，不传参为取反
   */
  toggle: (show?: boolean) => boolean
  /**
   * @description 打开菜单栏
   */
  open: () => void
  /**
   * @description 关闭菜单栏
   */
  close: () => void
}
