import type { ExtractPropTypes, PropType } from 'vue'
import type { ErrorMessage } from './types'

export const FORM_KEY = Symbol('Form')

export const formProps = {
  modelValue: {
    type: Object,
    default: {},
  },
  rules: {
    type: Object as PropType<import('./types').FormRules>,
    default: {},
  },
}

export type FormProps = ExtractPropTypes<typeof formProps>

export const formEmits = {
  validate: (msg: ErrorMessage) => msg,
}

export type FormEmits = typeof formEmits
