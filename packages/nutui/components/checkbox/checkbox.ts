import type { ExtractPropTypes } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { commonProps, makeNumericProp, makeStringProp, nullableBooleanProp } from '../_utils'

export const checkboxProps = {
  ...commonProps,
  /**
   * @description 是否处于选中状态
   */
  modelValue: {
    type: [Boolean, Number, String],
    default: false,
  },
  /**
   * @description 是否禁用选择
   */
  disabled: nullableBooleanProp,
  /**
   * @description 文本所在的位置，可选值：`left`,`right`
   */
  textPosition: makeStringProp<'left' | 'right'>('right'),
  /**
   * @description 图标大小，如 20px 2em 2rem
   */
  iconSize: makeNumericProp(''),
  /**
   * @description 复选框标识
   */
  label: [Boolean, Number, String],
  /**
   * @description 当前是否支持半选状态，一般用在全选操作中
   */
  indeterminate: Boolean,
  /**
   * @description 形状，可选值：`button`、`round`
   */
  shape: makeStringProp<'button' | 'round'>('round'),
  /**
   * @description 选中状态的值
   */
  checkedValue: {
    type: [Boolean, Number, String],
    default: true,
  },
  /**
   * @description 未选中状态的值
   */
  uncheckedValue: {
    type: [Boolean, Number, String],
    default: false,
  },
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

/* eslint-disable unused-imports/no-unused-vars */
export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (value: any) => true,
  [CHANGE_EVENT]: (checked: boolean, value: any) => true,
}
/* eslint-enable unused-imports/no-unused-vars */

export type CheckboxEmits = typeof checkboxEmits

export const CHECKBOX_KEY = Symbol('nut-checkbox')
