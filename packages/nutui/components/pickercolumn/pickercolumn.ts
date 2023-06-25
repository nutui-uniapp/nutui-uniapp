import type { ExtractPropTypes, PropType } from 'vue'
import type { PickerOption } from './types'

export const pickercolumnProps = {
  // 当前选中项
  value: [String, Number],
  columnsType: String,
  column: {
    type: Array as PropType<PickerOption[]>,
    default: () => [],
  },
  // 是否开启3D效果
  threeDimensional: {
    type: Boolean,
    default: true,
  },
  swipeDuration: {
    type: [Number, String],
    default: 1000,
  },
  visibleOptionNum: {
    type: [Number, String],
    default: 7,
  },
  optionHeight: {
    type: [Number, String],
    default: 36,
  },
}

export type PickerColumnProps = ExtractPropTypes<typeof pickercolumnProps>

export const pickercolumnEmits = {
  click: () => true,
  change: (val: PickerOption) => true,
}

export type PickerColumnEmits = typeof pickercolumnEmits
