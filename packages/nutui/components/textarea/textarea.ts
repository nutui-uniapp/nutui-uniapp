import type { TextareaOnBlurEvent, TextareaOnConfirmEvent, TextareaOnFocusEvent, TextareaOnInputEvent } from '@uni-helper/uni-app-types'
import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import { BLUR_EVENT, CHANGE_EVENT, CONFIRM_EVENT, FOCUS_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import type { ClassType } from '../_utils'
import { commonProps, isString, makeNumberProp, makeStringProp, nullableBooleanProp, truthProp } from '../_utils'
import type { InputAlignType } from '../input'
import type { TextareaAdjustKeyboardTo, TextareaAutosizeObject, TextareaConfirmType } from './type'

export const textareaProps = {
  ...commonProps,
  /**
   * @description 输入值，支持双向绑定
   */
  modelValue: String,
  /**
   * @description 文本位置,可选值left,center,right
   */
  textAlign: String as PropType<InputAlignType>,
  /**
   * @description textarea是否展示输入字符。须配合max-length使用
   */
  limitShow: Boolean,
  /**
   * @description 限制最长输入字符
   */
  maxLength: [String, Number],
  /**
   * @description textarea的高度，优先级高于autosize属性 仅支持 H5
   */
  rows: [String, Number],
  /**
   * @description 文本域自定义类名
   */
  textareaClass: {
    type: [String, Object, Array] as PropType<ClassType>,
    default: '',
  },
  /**
   * @description 文本域自定义样式
   */
  textareaStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: '',
  },
  /**
   * @description 设置占位提示文字
   */
  placeholder: String,
  /**
   * @description 指定 placeholder 的样式
   */
  placeholderStyle: makeStringProp(''),
  /**
   * @description 指定 placeholder 的样式类
   */
  placeholderClass: makeStringProp('textarea-placeholder'),
  /**
   * @description 只读属性
   */
  readonly: Boolean,
  /**
   * @description 禁用属性
   */
  disabled: nullableBooleanProp,
  /**
   * @description 是否自适应内容高度，也可传入对象
   */
  autosize: {
    type: [Boolean, Object] as PropType<boolean | TextareaAutosizeObject>,
    default: false,
  },
  /**
   * @description 自动获取焦点
   */
  autofocus: Boolean,
  /**
   * @description 指定光标与键盘的距离。取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离
   */
  cursorSpacing: makeNumberProp(0),
  /**
   * @description 指定focus时的光标位置
   */
  cursor: makeNumberProp(-1),
  /**
   * @description 是否显示键盘上方带有”完成“按钮那一栏
   */
  showConfirmBar: truthProp,
  /**
   * @description 光标起始位置，自动聚集时有效，需与selection-end搭配使用
   */
  selectionStart: makeNumberProp(-1),
  /**
   * @description 光标结束位置，自动聚集时有效，需与selection-start搭配使用
   */
  selectionEnd: makeNumberProp(-1),
  /**
   * @description 键盘弹起时，是否自动上推页面
   */
  adjustPosition: truthProp,
  /**
   * @description focus时，点击页面的时候不收起键盘
   */
  holdKeyboard: Boolean,
  /**
   * @description 是否去掉 iOS 下的默认内边距
   */
  disableDefaultPadding: Boolean,
  /**
   * @description 设置键盘右下角按钮的文字，可选值 `send` `search` `next` `go` `done` `return`
   */
  confirmType: makeStringProp<TextareaConfirmType>('return'),
  /**
   * @description 点击键盘右下角按钮时是否保持键盘不收起
   */
  confirmHold: Boolean,
  /**
   * @description 键盘对齐位置，可选值 `cursor` `bottom`
   */
  adjustKeyboardTo: makeStringProp<TextareaAdjustKeyboardTo>('cursor'),
}

export type TextareaProps = ExtractPropTypes<typeof textareaProps>

export const textareaEmits = {
  [BLUR_EVENT]: (evt: TextareaOnBlurEvent) => evt instanceof Object,
  [FOCUS_EVENT]: (evt: TextareaOnFocusEvent) => evt instanceof Object,
  [CHANGE_EVENT]: (val1?: string, val2?: string | Event) => isString(val1) && (isString(val2) || (val2 instanceof Object)),
  [UPDATE_MODEL_EVENT]: (val1?: string, val2?: string | Event) => isString(val1) && (isString(val2) || (val2 instanceof Object)),
  [CONFIRM_EVENT]: (evt: TextareaOnConfirmEvent) => evt instanceof Object,
  [INPUT_EVENT]: (val: string, evt: TextareaOnInputEvent) => isString(val) && evt instanceof Object,
}

export type TextareaEmits = typeof textareaEmits
