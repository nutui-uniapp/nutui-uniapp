import type { ExtractPropTypes } from 'vue'
import { isNumber } from '../_utils'

export const rateProps = {
  count: {
    type: [String, Number],
    default: 5,
  },
  modelValue: {
    type: [String, Number],
    default: 0,
  },
  customIcon: {
    type: String,
    default: () => {
      return 'star-fill-n'
    },
  },
  size: {
    type: [String, Number],
    default: undefined,
  },
  activeColor: {
    type: String,
    default: '',
  },
  voidColor: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  allowHalf: {
    type: Boolean,
    default: false,
  },
  spacing: {
    type: [String, Number],
    default: undefined,
  },
}

export type RateProps = ExtractPropTypes<typeof rateProps>

export const rateEmits = {
  'update:modelValue': (val: number) => isNumber(val),
  'change': (val: number) => isNumber(val),
}

export type RateEmits = typeof rateEmits
