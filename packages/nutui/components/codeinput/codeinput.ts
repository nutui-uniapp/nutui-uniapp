import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, isString, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export const codeinputProps = {
  ...commonProps,
  /**
   * @description 键盘弹起时，是否自动上推页面
   */
  adjustPosition: truthProp,
  /**
   * @description 最大输入长度
   */
  maxlength: makeNumericProp(4),
  /**
   * @description 是否用圆点填充
   */
  dot: Boolean,
  /**
   * @description 显示模式，可选值：`box`-盒子模式，`line`-底部横线模式
   */
  mode: makeStringProp<'box' | 'line'>('box'),
  /**
   * @description 是否细边框
   */
  hairline: Boolean,
  /**
   * @description 字符间的距离
   */
  space: makeNumericProp(10),
  /**
   * @description 预置值
   */
  modelValue: makeNumericProp(''),
  /**
   * @description 是否自动获取焦点
   */
  focus: Boolean,
  /**
   * @description 字体是否加粗
   */
  bold: Boolean,
  /**
   * @description 字体颜色
   */
  customColor: makeStringProp('#606266'),
  /**
   * @description 字体大小
   */
  fontSize: makeNumericProp(18),
  /**
   * @description 输入框的大小，宽等于高
   */
  size: makeNumericProp(35),
  /**
   * @description 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
   */
  disabledKeyboard: Boolean,
  /**
   * @description 边框和线条颜色
   */
  borderColor: makeStringProp('#c9cacc'),
  /**
   * @description 是否禁止输入"."符号
   */
  disabledDot: truthProp,
}

export type CodeInputProps = ExtractPropTypes<typeof codeinputProps>

export const codeinputEmits = {
  [CHANGE_EVENT]: (val: string) => isString(val),
  [INPUT_EVENT]: (val: string) => isString(val),
  finish: (val: string) => isString(val),
  [UPDATE_MODEL_EVENT]: (val: number | string) => isString(val) || isNumber(val),

}

export type CodeInputEmits = typeof codeinputEmits
