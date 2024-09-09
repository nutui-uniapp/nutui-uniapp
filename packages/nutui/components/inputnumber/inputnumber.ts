import type { BaseEvent, InputOnBlurEvent, InputOnFocusEvent } from '@uni-helper/uni-app-types'
import type { ExtractPropTypes } from 'vue'
import { BLUR_EVENT, CHANGE_EVENT, FOCUS_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { commonProps, makeNumericProp, nullableBooleanProp } from '../_utils'

export const inputnumberProps = {
  ...commonProps,
  /**
   * @description 初始值
   */
  modelValue: makeNumericProp(0),
  /**
   * @description 最小值限制
   */
  min: makeNumericProp(1),
  /**
   * @description 最大值限制
   */
  max: makeNumericProp(9999),
  /**
   * @description 步长
   */
  step: makeNumericProp(1),
  /**
   * @description 是否只能输入 step 的倍数
   */
  stepStrictly: Boolean,
  /**
   * @description 设置保留的小数位
   */
  decimalPlaces: makeNumericProp(0),
  /**
   * @description 禁用所有功能
   */
  disabled: nullableBooleanProp,
  /**
   * @description 只读状态禁用输入框操作行为
   */
  readonly: Boolean,
  /**
   * @description 输入框宽度
   */
  inputWidth: makeNumericProp(''),
  /**
   * @description 操作加减按钮的尺寸
   */
  buttonSize: makeNumericProp(''),
}

export type InputNumberProps = ExtractPropTypes<typeof inputnumberProps>

/* eslint-disable unused-imports/no-unused-vars */
export const inputnumberEmits = {
  [UPDATE_MODEL_EVENT]: (value: number) => true,
  [CHANGE_EVENT]: (value: number, event?: BaseEvent) => true,
  [FOCUS_EVENT]: (event: InputOnFocusEvent) => true,
  [BLUR_EVENT]: (event: InputOnBlurEvent) => true,
  reduce: (event: BaseEvent) => true,
  add: (event: BaseEvent) => true,
  overlimit: (event: BaseEvent, type: 'reduce' | 'add') => true,
}
/* eslint-enable unused-imports/no-unused-vars */

export type InputNumberEmits = typeof inputnumberEmits
