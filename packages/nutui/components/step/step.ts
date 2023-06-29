import type { ExtractPropTypes } from 'vue'

export const stepProps = {
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
}

export type StepProps = ExtractPropTypes<typeof stepProps>

export const stepEmits = {
  clickStep: (val: number) => true,
}

export type StepEmits = typeof stepEmits
