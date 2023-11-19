import type { ExtractPropTypes } from 'vue'
import { commonProps, isBoolean, isNumber, isString } from '../_utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export const switchProps = {
  ...commonProps,
  /**
   * @description 开关状态
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  /**
   * @description 禁用状态
   */
  disable: Boolean,
  /**
   * @description 打开时的背景颜色
   */
  activeColor: String,
  /**
   * @description 关闭时的背景颜色
   */
  inactiveColor: String,
  /**
   * @description 打开时文字描述
   */
  activeText: String,
  /**
   * @description 关闭时文字描述
   */
  inactiveText: String,
  /**
   * @description 打开时组件的值
   */
  activeValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  /**
   * @description 关闭组件的值
   */
  inactiveValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  /**
   * @description 加载状态
   */
  loading: Boolean,
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export const switchEmits = {
  [UPDATE_MODEL_EVENT]: (val: any) => isBoolean(val) || isNumber(val) || isString(val),
  [CHANGE_EVENT]: (val: any, evt?: Event) => (isBoolean(val) || isNumber(val) || isString(val)) && (evt instanceof Object),
}

export type SwitchEmits = typeof switchEmits
