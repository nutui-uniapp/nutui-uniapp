import type { ExtractPropTypes } from 'vue'
import { isBoolean, isString } from '../_utils'

export const shortpasswordProps = {
  title: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
  tips: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
  errorMsg: {
    type: String,
    default: '',
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  length: {
    type: [String, Number], // 4～6
    default: 6,
  },
}

export type ShortPasswordProps = ExtractPropTypes<typeof shortpasswordProps>

export const shortpasswordEmits = {
  'update:modelValue': (val: string | number, event: Event) => true,
  'update:visible': (val: boolean) => isBoolean(val),
  'complete': (val: string) => isString(val),
  'tips': () => true,
  'close': () => true,
  'focus': () => true,
}

export type ShortPasswordEmits = typeof shortpasswordEmits
