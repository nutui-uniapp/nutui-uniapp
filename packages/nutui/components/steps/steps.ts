import type { ExtractPropTypes } from 'vue'

export const stepsProps = {
  direction: {
    type: String,
    default: 'horizontal',
  },
  current: {
    type: [String, Number],
    default: '0',
  },
  progressDot: {
    type: Boolean,
    default: false,
  },
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>

export const stepsEmits = {
  clickStep: (val: number) => true,
}

export type StepsEmits = typeof stepsEmits
