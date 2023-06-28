import type { ExtractPropTypes } from 'vue'

export const collapseProps = {
  modelValue: {
    type: [String, Number, Array<string | number>],
    default: '',
  },
  accordion: {
    type: Boolean,
    default: false,
  },
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export const collapseEmits = {
  'change': (val: string | number | (string | number)[], name: string | number, status: boolean) => true,
  'update:modelValue': (val: string | number | (string | number)[]) => true,
}

export type CollapseEmits = typeof collapseEmits
