import type { ExtractPropTypes } from 'vue'
import { isBoolean } from '../_utils'

export const switchProps = {
  modelValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  activeColor: {
    type: String,
    default: '',
  },
  inactiveColor: {
    type: String,
    default: '',
  },
  activeText: {
    type: String,
    default: '',
  },
  inactiveText: {
    type: String,
    default: '',
  },
  activeValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  inactiveValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export const switchEmits = {
  'update:modelValue': (val: string | number | boolean) => isBoolean(val),
  'change': (val: any, evt?: Event) => {
    return {
      val,
      evt,
    }
  },
}

export type SwitchEmits = typeof switchEmits
