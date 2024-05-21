import type { ExtractPropTypes } from 'vue'
import { commonProps, makeArrayProp, makeNumberProp, makeStringProp } from '../_utils'
import { CHANGE_EVENT, CLOSE_EVENT, OPEN_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export interface MenuItemOption {
  text: string
  value: number | string
}

export const menuitemProps = {
  ...commonProps,
  /**
   * @@description 菜单项标题
   */
  title: String,
  /**
   * @description 选项数组
   */
  options: makeArrayProp<MenuItemOption>([]),
  /**
   * @description 是否禁用菜单
   */
  disabled: Boolean,
  modelValue: [String, Number],
  /**
   * @description 可以设置一行展示多少列 `options`
   */
  cols: makeNumberProp(1),
  /**
   * @description 选项选中时自定义标题样式类
   */
  activeTitleClass: String,
  /**
   * @description 选项非选中时自定义标题样式类
   */
  inactiveTitleClass: String,
  /**
   * @description 选项选中时选中图标
   */
  optionIcon: makeStringProp('Check'),
}

export type MenuItemProps = ExtractPropTypes<typeof menuitemProps>

/* eslint-disable unused-imports/no-unused-vars */
export const menuitemEmits = {
  [UPDATE_MODEL_EVENT]: (value: number | string) => true,
  [CHANGE_EVENT]: (value: number | string) => true,
  [OPEN_EVENT]: () => true,
  [CLOSE_EVENT]: () => true,
  itemClick: (item: MenuItemOption) => true,
}
/* eslint-enable unused-imports/no-unused-vars */

export type MenuitemEmits = typeof menuitemEmits

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
