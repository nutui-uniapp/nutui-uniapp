import type { ExtractPropTypes } from 'vue'
import { popupProps } from '../popup/popup'
import { commonProps, isBoolean, isNumber, makeArrayProp, makeStringProp, truthProp } from '../_utils'
import { CANCEL_EVENT, CHOOSE_EVENT, CLOSE_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'

export interface ActionSheetOption {
  disable?: boolean
  loading?: boolean
  color?: string
  name: string
  subname?: string
}
export const actionsheetProps = {
  ...popupProps,
  ...commonProps,
  /**
   * @description 取消文案
   */
  cancelTxt: makeStringProp(''),
  /**
   * @description 设置列表项标题展示使用参数
   */
  optionTag: makeStringProp<keyof ActionSheetOption>('name'),
  /**
   * @description 设置列表项二级标题展示使用参数
   */
  optionSubTag: makeStringProp<keyof ActionSheetOption>('subname'),
  /**
   * @description 设置选中项的值，和 'option-tag' 的值对应
   */
  chooseTagValue: makeStringProp(''),
  /**
   * @description 设置列表项标题
   */
  title: makeStringProp(''),
  /**
   * @description 选中项颜色，当 choose-tag-value == option-tag 的值 生效
   */
  customColor: makeStringProp('#ee0a24'),
  /**
   * @description 设置列表项副标题/描述
   */
  description: makeStringProp(''),
  /**
   * @description 列表项
   */
  menuItems: makeArrayProp<ActionSheetOption>([]),
  /**
   * @description 遮罩层是否可关闭
   */
  closeAbled: truthProp,
}

export type ActionsheetProps = ExtractPropTypes<typeof actionsheetProps>

export const actionsheetEmits = {
  [CLOSE_EVENT]: () => true,
  [UPDATE_VISIBLE_EVENT]: (val: boolean) => isBoolean(val),
  [CANCEL_EVENT]: () => true,
  [CHOOSE_EVENT]: (item: ActionSheetOption, index: number) => item instanceof Object && isNumber(index),

}

export type ActionsheetEmits = typeof actionsheetEmits
