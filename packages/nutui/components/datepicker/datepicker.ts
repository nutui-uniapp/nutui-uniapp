import type { ExtractPropTypes, PropType } from 'vue'
import { isDate } from '../_utils'
import type { PickerOption } from '../pickercolumn'
import type { Filter, Formatter } from './type'

export const currentYear = new Date().getFullYear()

export const datepickerProps = {
  modelValue: {
    type: [Date, String, Number],
  },
  title: {
    type: String,
    default: '',
  },
  okText: {
    type: String,
    default: '',
  },
  cancelText: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'date',
  },
  isShowChinese: {
    type: Boolean,
    default: false,
  },
  minuteStep: {
    type: Number,
    default: 1,
  },
  minDate: {
    type: Date,
    default: () => new Date(currentYear - 10, 0, 1),
    validator: isDate,
  },
  maxDate: {
    type: Date,
    default: () => new Date(currentYear + 10, 11, 31),
    validator: isDate,
  },
  formatter: {
    type: Function as PropType<Formatter>,
    default: null,
  },
  // 是否开启3D效果
  threeDimensional: {
    type: Boolean,
    default: true,
  },
  // 惯性滚动 时长
  swipeDuration: {
    type: [Number, String],
    default: 1000,
  },
  filter: Function as PropType<Filter>,
  showToolbar: {
    type: Boolean,
    default: true,
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

export type DatePickerProps = ExtractPropTypes<typeof datepickerProps>

export const datepickerEmits = {
  'click': () => true,
  'cancel': (val: any) => val,
  'confirm': (val: any) => val,
  'change': (val: {
    columnIndex: number
    selectedValue: (string | number)[]
    selectedOptions: PickerOption[]
  }) => val,
  'update:modelValue': (val: any) => val,
}

export type DatePickerEmits = typeof datepickerEmits
