import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, isObject, makeNumericProp } from '../_utils'
import { BLUR_EVENT, CHANGE_EVENT, FOCUS_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export const inputnumberProps = {
  ...commonProps,
  /**
   * @description 初始值
   */
  modelValue: makeNumericProp(0),
  /**
   * @description 输入框宽度
   */
  inputWidth: makeNumericProp(''),
  /**
   * @description 操作加减按钮的尺寸
   */
  buttonSize: makeNumericProp(''),
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
   * @description 设置保留的小数位
   */
  decimalPlaces: makeNumericProp(0),
  /**
   * @description 禁用所有功能
   */
  disabled: Boolean,
  /**
   * @description 只读状态禁用输入框操作行为
   */
  readonly: Boolean,
}
export type InputNumberProps = ExtractPropTypes<typeof inputnumberProps>

export const inputnumberEmits = {
  [BLUR_EVENT]: (evt: Event) => evt instanceof Object,
  [FOCUS_EVENT]: (evt: Event) => evt instanceof Object,
  reduce: (evt: Event) => evt instanceof Object,
  add: (evt: Event) => evt instanceof Object,
  overlimit: (evt: Event, type: 'reduce' | 'add') => isObject(evt) && (type === 'reduce' || type === 'add'),
  [CHANGE_EVENT]: (_val1: string | number, _val2?: any) => true,
  [UPDATE_MODEL_EVENT]: (val1?: number | string, val2?: Event) => (isNumber(val1) || isObject(val2)) && val2 instanceof Object,
}

export type InputNumberEmits = typeof inputnumberEmits
