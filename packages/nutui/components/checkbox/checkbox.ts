import type { ExtractPropTypes, PropType } from 'vue'
import { isBoolean } from '../_utils'

export const checkboxProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  textPosition: {
    type: String,
    default: 'right',
  },
  iconSize: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  shape: {
    type: String as PropType<'round' | 'button'>,
    default: 'round', // button
  },
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export const checkboxEmits = {
  'change': (val: boolean | string, val2?: string) => true,
  'update:modelValue': (val: boolean | string) => isBoolean(val),
}

export type CheckboxEmits = typeof checkboxEmits
