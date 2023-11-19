import type { ExtractPropTypes } from 'vue'
import { commonProps, isBoolean, isString, makeNumericProp, makeStringProp } from '../_utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export const checkboxProps = {
  ...commonProps,
  /**
   * @description 是否处于选中状态
   */
  modelValue: Boolean,
  /**
   * @description 是否禁用选择
   */
  disabled: Boolean,
  /**
   * @description 文本所在的位置，可选值：`left`,`right`
   */
  textPosition: makeStringProp<'left' | 'right'>('right'),
  /**
   * @description 图标大小，如 20px 2em 2rem
   */
  iconSize: makeNumericProp(''),
  /**
   * @description 复选框的文本内容
   */
  label: makeStringProp(''),
  /**
   * @description 当前是否支持半选状态，一般用在全选操作中
   */
  indeterminate: Boolean,
  /**
   * @description 形状，可选值：`button`、`round`
   */
  shape: makeStringProp<'button' | 'round'>('round'),
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export const checkboxEmits = {
  [CHANGE_EVENT]: (val: boolean | string, val2?: string) => isBoolean(val) || (isString(val) && isString(val2)),
  [UPDATE_MODEL_EVENT]: (val: boolean | string) => isBoolean(val),
}

export type CheckboxEmits = typeof checkboxEmits
