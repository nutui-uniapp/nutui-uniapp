import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, makeNumericProp, makeStringProp } from '../_utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export const rateProps = {
  ...commonProps,
  /**
   * @description 当前 `star` 数，可使用 `v-model` 双向绑定数据
   */
  modelValue: makeNumericProp(0),
  /**
   * @description `star` 总数
   */
  count: makeNumericProp(5),
  /**
   * @description 图标选中颜色
   */
  activeColor: String,
  /**
   * @description 图标未选中颜色
   */
  voidColor: String,
  /**
   * @description 是否半星
   */
  allowHalf: Boolean,
  /**
   * @description 是否只读
   */
  readonly: Boolean,
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
  /**
   * @description 间距
   */
  spacing: [String, Number],
  /**
   * @description `Icon` 尺寸大小，如 `20px` `2em` `2rem`
   */
  size: [String, Number],
  /**
   * @description 自定义 `Icon`
   */
  customIcon: makeStringProp('star-fill-n'),
}

export type RateProps = ExtractPropTypes<typeof rateProps>

export const rateEmits = {
  [UPDATE_MODEL_EVENT]: (val: number) => isNumber(val),
  [CHANGE_EVENT]: (val: number) => isNumber(val),
}

export type RateEmits = typeof rateEmits
