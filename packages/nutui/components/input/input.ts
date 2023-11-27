import type { ExtractPropTypes, PropType } from 'vue'
import type { InputOnBlurEvent, InputOnConfirmEvent, InputOnFocusEvent } from '@uni-helper/uni-app-types'
import { commonProps, isNumber, isString, makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { BLUR_EVENT, CLEAR_EVENT, CLICK_EVENT, CONFIRM_EVENT, FOCUS_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import type { ConfirmTextType, InputAlignType, InputFormatTrigger, InputMode, InputType } from './type'

export const inputProps = {
  ...commonProps,
  /**
   * @description 输入框类型，支持原生 `input` 标签的所有 `type` 属性，另外还支持 `number` `digit`
   */
  type: makeStringProp<InputType>('text'),
  /**
   * @description 输入值，双向绑定
   */
  modelValue: makeNumericProp(''),
  /**
   * @description 输入框为空时占位符
   */
  placeholder: makeStringProp(''),
  /**
   * @description 指定 placeholder 的样式
   */
  placeholderStyle: makeStringProp(''),
  /**
   * @description 指定 placeholder 的样式类
   */
  placeholderClass: makeStringProp('input-placeholder'),
  /**
   * @description 输入框内容对齐方式，可选值 `left`、`center`、`right`
   */
  inputAlign: makeStringProp<InputAlignType>('left'),
  required: Boolean,
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
  /**
   * @description 是否只读
   */
  readonly: Boolean,
  /**
   * 是否标红
   * @description 是否标红
   */
  error: Boolean,
  /**
   * @description 限制最长输入字符
   */
  maxLength: makeNumericProp(140),
  /**
   * @description 展示清除 `Icon`
   */
  clearable: Boolean,
  /**
   * @description 清除图标的 `font-size` 大小
   */
  clearSize: makeNumericProp('14'),
  /**
   * @description 是否显示下边框
   */
  border: truthProp,
  /**
   * @description 格式化函数触发的时机，可选值为 `onChange`、`onBlur`
   */
  formatTrigger: makeStringProp<InputFormatTrigger>('onChange'),
  /**
   * @description 输入内容格式化函数
   */
  formatter: {
    type: Function as PropType<(value: string) => string>,
    default: null,
  },
  /**
   * @description 是否显示限制最长输入字符，需要设置 `max-length` 属性
   */
  showWordLimit: Boolean,
  /**
   * @description 是否自动获得焦点，`iOS` 系统不支持该属性
   */
  autofocus: Boolean,
  /**
   * @description 键盘右下角按钮的文字，仅在`type='text'`时生效,可选值 `send`：发送、`search`：搜索、`next`：下一个、`go`：前往、`done`：完成
   */
  confirmType: makeStringProp<ConfirmTextType>('done'),
  /**
   * @description  键盘弹起时，是否自动上推页面
   */
  adjustPosition: truthProp,
  /**
   * @description 是否强制使用系统键盘和 `Web-view` 创建的 `input` 元素。为 `true` 时，`confirm-type`、`confirm-hold` 可能失效
   */
  alwaysSystem: Boolean,
  /**
   * @description 是否在失去焦点后，继续展示清除按钮，在设置 `clearable` 时生效
   */
  showClearIcon: Boolean,
  /**
   * @description 输入框模式
   */
  inputMode: makeStringProp<InputMode>('text'),
  /**
   * @description 指定光标与键盘的距离，取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
   */
  cursorSpacing: makeNumberProp(0),
  /**
   * @description 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)
   */
  alwaysEmbed: Boolean,
  /**
   * @description 点击键盘右下角按钮时是否保持键盘不收起
   */
  confirmHold: Boolean,
  /**
   * @description 指定focus时的光标位置
   */
  cursor: Number,
  /**
   * @description 光标起始位置，自动聚集时有效，需与selection-end搭配使用
   */
  selectionStart: makeNumberProp(-1),
  /**
   * @description 光标结束位置，自动聚集时有效，需与selection-start搭配使用
   */
  selectionEnd: makeNumberProp(-1),
  /**
   * @description focus时，点击页面的时候不收起键盘
   */
  holdKeyboard: Boolean,
}

export const inputEmits = {
  [CLICK_EVENT]: (evt: Event) => evt instanceof Object,
  clickInput: (evt: Event) => evt instanceof Object,
  [BLUR_EVENT]: (evt: InputOnBlurEvent) => evt instanceof Object,
  [FOCUS_EVENT]: (evt: InputOnFocusEvent) => evt instanceof Object,
  [CLEAR_EVENT]: () => true,
  keypress: () => true,
  [CONFIRM_EVENT]: (evt: InputOnConfirmEvent) => evt instanceof Object,
  [UPDATE_MODEL_EVENT]: (val1?: string | number, val2?: Event) => (isString(val1) || isNumber(val1)) && ((val2 instanceof Object) || val2 === undefined),
}

export type InputEmits = typeof inputEmits

export type InputProps = ExtractPropTypes<typeof inputProps>
