import type { InputOnBlurEvent, InputOnFocusEvent, InputOnInputEvent } from '@uni-helper/uni-app-types'
import type { CSSProperties, ExtractPropTypes } from 'vue'
import { BLUR_EVENT, CHANGE_EVENT, CLEAR_EVENT, FOCUS_EVENT, SEARCH_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import {
  commonProps,
  isString,
  makeNumberProp,
  makeNumericProp,
  makeObjectProp,
  makeStringProp,
  nullableBooleanProp,
  numericProp,
  truthProp,
} from '../_utils'
import type { InputAlignType, InputConfirmType, InputType } from '../input'
import type { SearchbarShape } from './type'

export const searchbarProps = {
  ...commonProps,
  /**
   * @description 当前输入的值
   */
  modelValue: makeNumericProp(''),
  /**
   * @description 输入框类型
   */
  inputType: makeStringProp<InputType>('text'),
  /**
   * @description 搜索框形状，可选值为 `square` `round`
   */
  shape: makeStringProp<SearchbarShape>('round'),
  /**
   * @description 最大输入长度
   */
  maxLength: numericProp,
  /**
   * @description 输入框默认占位符
   */
  placeholder: String,
  /**
   * @description 是否展示清除按钮
   */
  clearable: truthProp,
  /**
   * @description 自定义清除按钮图标
   */
  clearIcon: makeStringProp('circle-close'),
  /**
   * @description 输入框外部背景
   */
  background: String,
  /**
   * @description 输入框内部背景
   */
  inputBackground: String,
  /**
   * @description 聚焦时搜索框样式
   */
  focusStyle: makeObjectProp<CSSProperties>({}),
  /**
   * @description 是否自动聚焦
   */
  autofocus: Boolean,
  /**
   * @description 是否禁用输入框
   */
  disabled: nullableBooleanProp,
  /**
   * @description 输入框只读
   */
  readonly: Boolean,
  /**
   * @description 对齐方式，可选 `left` `center` `right`
   */
  inputAlign: makeStringProp<InputAlignType>('left'),
  /**
   * @description 键盘右下角按钮的文字，仅在`type='text'`时生效，可选值 `send`：发送、`search`：搜索、`next`：下一个、`go`：前往、`done`：完成
   */
  confirmType: makeStringProp<InputConfirmType>('done'),
  /**
   * @description 是否开启 iphone 系列全面屏底部安全区适配
   */
  safeAreaInsetBottom: Boolean,
  /**
   * @description 指定的距离的最小值作为光标与键盘的距离
   */
  cursorSpacing: makeNumberProp(0),
}

export type SearchbarProps = ExtractPropTypes<typeof searchbarProps>

export const searchbarEmits = {
  [UPDATE_MODEL_EVENT]: (val: string, event: InputOnInputEvent) => (isString(val) || val === undefined) && event instanceof Object,
  [CHANGE_EVENT]: (val: string, event: InputOnInputEvent) => (isString(val) || val === undefined) && event instanceof Object,
  [BLUR_EVENT]: (val: string, event: InputOnBlurEvent) => (isString(val) || val === undefined) && event instanceof Object,
  [FOCUS_EVENT]: (val: string, event: InputOnFocusEvent) => (isString(val) || val === undefined) && event instanceof Object,
  [CLEAR_EVENT]: (val: string) => (isString(val) || val === undefined),
  [SEARCH_EVENT]: (val: string) => (isString(val) || val === undefined),
  clickInput: (val: string, event: Event) => (isString(val) || val === undefined) && event instanceof Object,
  clickLeftIcon: (val: string, event: Event) => (isString(val) || val === undefined) && event instanceof Object,
  clickRightIcon: (val: string, event: Event) => (isString(val) || val === undefined) && event instanceof Object,
}

export type SearchbarEmits = typeof searchbarEmits
