import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, isString, makeArrayProp, makeNumberProp, makeStringProp } from '../_utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

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

export const menuitemEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number) => isString(val) || isNumber(val),
  [CHANGE_EVENT]: (val: string | number) => isString(val) || isNumber(val),
}
export type MenuitemEmits = typeof menuitemEmits

export interface MenuItemInst {
  /**
   * @description 选择 `option` 之后触发
   */
  change: (val?: any) => any
  /**
   * @description 切换菜单展示状态，传 `true` 为显示，`false` 为隐藏，不传参为取反
   */
  toggle: (show?: boolean) => boolean
  /**
   * @description 打开菜单栏时触发
   */
  open: () => void
  /**
   * @description 关闭菜单栏时触发
   */
  close: () => void
}
