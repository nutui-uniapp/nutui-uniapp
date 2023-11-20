import type { ExtractPropTypes } from 'vue'
import { commonProps, isBoolean, isNumber, isString, makeArrayProp, makeNumericProp, makeStringProp } from '../_utils'
import { CLOSE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'

export const numberkeyboardProps = {
  ...commonProps,
  /**
   * @description 是否显示键盘
   */
  visible: Boolean,
  /**
   * @description 当前输入值
   */
  modelValue: makeStringProp(''),
  /**
   * @description 键盘标题
   */
  title: makeStringProp(''),
  /**
   * @description 键盘模式
   * - `default`：默认样式
   * - `rightColumn`：带右侧栏
   */
  type: makeStringProp<'default' | 'rightColumn'>('default'),
  /**
   * @description 随机数
   */
  randomKeys: Boolean,
  /**
   * @description 自定义键盘额外的键
   * - 数组形式最多支持添加2个,超出默认取前2项
   */
  customKey: makeArrayProp<any>([]),
  /**
   * @description 是否显示遮罩
   */
  overlay: Boolean,
  /**
   * @description 输入值最大长度，结合 v-model 使用
   */
  maxlength: makeNumericProp(6),
  /**
   * @description 自定义完成按钮文字，如"支付"，"下一步"，"提交"等
   */
  confirmText: makeStringProp(''),
  /**
   * @description 自定义弹框类名
   */
  popClass: makeStringProp(''),
}

export type NumberKeyBoardProps = ExtractPropTypes<typeof numberkeyboardProps>

export const numberkeyboardEmits = {
  [INPUT_EVENT]: (val: string | number) => isString(val) || isNumber(val),
  delete: () => true,
  [CLOSE_EVENT]: () => true,
  [UPDATE_VISIBLE_EVENT]: (visible: boolean) => isBoolean(visible),
  [UPDATE_MODEL_EVENT]: (val: string | number) => isString(val) || isNumber(val),
}

export type NumberKeyBoardEmits = typeof numberkeyboardEmits
