import type { ExtractPropTypes } from 'vue'
import { commonProps, isBoolean, isNumber, isString, makeNumericProp, truthProp } from '../_utils'
import { CLOSE_EVENT, FOCUS_EVENT, UPDATE_MODEL_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'

export const shortpasswordProps = {
  ...commonProps,
  /**
   * @description 标题
   */
  title: String,
  /**
   * @description 密码框描述
   */
  desc: String,
  /**
   * @description 提示语
   */
  tips: String,
  /**
   * @description 是否展示短密码框
   */
  visible: Boolean,
  /**
   * @description 密码初始值
   */
  modelValue: String,
  /**
   * @description 错误信息提示
   */
  errorMsg: String,
  /**
   * @description 是否点击遮罩关闭
   */
  closeOnClickOverlay: truthProp,
  /**
   * @description 密码长度，取值为4~6
   */
  length: makeNumericProp(6),
}

export type ShortPasswordProps = ExtractPropTypes<typeof shortpasswordProps>

export const shortpasswordEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number, event: Event) => (isString(val) || isNumber(val)) && event instanceof Event,
  [UPDATE_VISIBLE_EVENT]: (val: boolean) => isBoolean(val),
  complete: (val: string) => isString(val),
  tips: () => true,
  [CLOSE_EVENT]: () => true,
  [FOCUS_EVENT]: () => true,
}

export type ShortPasswordEmits = typeof shortpasswordEmits
