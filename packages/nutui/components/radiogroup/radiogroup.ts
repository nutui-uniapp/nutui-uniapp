import type { ExtractPropTypes, PropType } from 'vue'

export const radiogroupProps = {
  modelValue: {
    type: [Number, String, Boolean],
    default: '',
  },
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical', // horizontal
  },
  textPosition: {
    type: String,
    default: 'right',
  },
}

export type RadioGroupProps = ExtractPropTypes<typeof radiogroupProps>

export const radiogroupEmits = {
  'change': (val: string | number | boolean) => true,
  'update:modelValue': (val: string | boolean | number) => true,
}

export type RadioGroupEmits = typeof radiogroupEmits
