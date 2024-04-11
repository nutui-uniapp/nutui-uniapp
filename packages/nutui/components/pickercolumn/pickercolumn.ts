import type { ExtractPropTypes, PropType } from 'vue'
import { CHANGE_EVENT } from '../_constants'
import { makeArrayProp, makeNumericProp } from '../_utils'
import type { PickerFieldNames, PickerOption } from './type'

export const pickercolumnProps = {
  /**
   * @description 当前选中项
   */
  value: [String, Number],
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
}

export type PickerColumnEmits = typeof pickercolumnEmits
