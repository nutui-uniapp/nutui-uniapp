import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps, isNumber, makeNumericProp, makeObjectProp } from '../_utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export type SliderValue = number | number[]

export const rangeProps = {
  ...commonProps,
  /**
   * @description 当前进度百分比
   */
  modelValue: {
    type: [Number, Array] as PropType<SliderValue>,
    default: 0,
  },
  /**
   * @description 是否开启双滑块模式
   */
  range: Boolean,
  /**
   * @description 最大值
   */
  max: makeNumericProp(100),
  /**
   * @description 最小值
   */
  min: makeNumericProp(0),
  /**
   * @description 步长
   */
  step: makeNumericProp(1),
  /**
   * @description 是否禁用滑块
   */
  disabled: Boolean,
  /**
   * @description 是否竖向展示
   */
  vertical: Boolean,
  /**
   * @description 是否隐藏范围值
   */
  hiddenRange: Boolean,
  /**
   * @description 是否隐藏标签
   */
  hiddenTag: Boolean,
  /**
   * @description 进度条激活态颜色
   */
  activeColor: String,
  /**
   * @description 进度条非激活态颜色
   */
  inactiveColor: String,
  /**
   * @description 按钮颜色
   */
  buttonColor: String,
  /**
   * @description 刻度标示
   */
  marks: makeObjectProp<any>({}),
}

export type RangeProps = ExtractPropTypes<typeof rangeProps>

export const rangeEmits = {
  [UPDATE_MODEL_EVENT]: (val: SliderValue) => isNumber(val) || val instanceof Object,
  dragStart: () => true,
  [CHANGE_EVENT]: (val: SliderValue) => isNumber(val) || val instanceof Object,
  dragEnd: () => true,
}

export type RangeEmits = typeof rangeEmits
