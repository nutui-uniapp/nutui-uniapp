import type { ExtractPropTypes, PropType } from 'vue'
import { CHANGE_EVENT } from '../_constants'
import { makeArrayProp, makeNumericProp } from '../_utils'
import type { PickerFieldNames, PickerOption } from './type'

export const SCROLL_START_EVENT = 'scrollstart'
export const SCROLL_END_EVENT = 'scrollend'

export const pickercolumnProps = {
  /**
   * @description 当前选中项
   */
  value: [String, Number],
  /**
   * @description 当前选中索引（优先级高于 value）
   */
  index: {
    type: Number,
    default: -1,
  },
  /**
   * @description 显示的数据
   */
  column: makeArrayProp<PickerOption>([]),
  /**
   * @description 是否开启3D效果
   */
  threeDimensional: Boolean,
  /**
   * @description 惯性滚动时长
   */
  swipeDuration: makeNumericProp(1000),
  /**
   * @description 可见的选项个数
   */
  visibleOptionNum: makeNumericProp(7),
  /**
   * @description 选项高度
   */
  optionHeight: makeNumericProp(36),
  /**
   * @description 自定义 columns 中的字段
   */
  fieldNames: {
    type: Object as PropType<Required<PickerFieldNames>>,
    default: () => ({}),
  },
  /**
   * @description 特殊环境判断
   */
  uni: Boolean,
}

export type PickerColumnProps = ExtractPropTypes<typeof pickercolumnProps>

export const pickercolumnEmits = {
  [CHANGE_EVENT]: (val: PickerOption) => val instanceof Object || Array.isArray(val) || val === undefined,
  /** 开始滚动 */
  [SCROLL_START_EVENT]: () => true,
  /** 结束滚动，返回最终索引 */
  [SCROLL_END_EVENT]: (index: number) => typeof index === 'number',
}

export type PickerColumnEmits = typeof pickercolumnEmits
