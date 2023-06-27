import type { ExtractPropTypes } from 'vue'

export const textareaProps = {
  modelValue: {
    type: String,
    default: '',
  },
  textAlign: {
    type: String,
    default: '',
  },
  limitShow: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: [String, Number],
    default: '',
  },
  rows: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
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
  autosize: {
    type: [Boolean, Object],
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
}

export type TextareaProps = ExtractPropTypes<typeof textareaProps>

export const textareaEmits = {
  'blur': (evt: Event) => evt,
  'focus': (evt: Event) => evt,
  'change': (val1?: string, val2?: string | Event) => true,
  'update:modelValue': (val1?: string, val2?: string | Event) => true,
}

export type TextareaEmits = typeof textareaEmits
