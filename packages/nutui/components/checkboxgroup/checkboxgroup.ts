import type { ExtractPropTypes } from 'vue'
import { isArray } from '../_utils'

export const checkboxgroupProps = {
  modelValue: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
    default: 0,
  },
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxgroupProps>

export const checkboxgroupEmits = {
  'change': (val: any[]) => {
    return {
      val,
    }
  },
  'update:modelValue': (val: any[]) => isArray(val),
}

export type CheckboxGroupEmits = typeof checkboxgroupEmits

export interface CheckBoxInst {
  toggleAll: (val: boolean) => void
  toggleReverse: () => void
}
