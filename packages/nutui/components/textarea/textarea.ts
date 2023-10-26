import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfirmTextType, AdjustKeyboardTo } from './type'

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
  cursorSpacing: {
    type: Number,
    default: 0,
  },
  cursor: {
    type: Number,
    default: -1,
  },
  showConfirmBar: {
    type: Boolean,
    default: true,
  },
  selectionStart: {
    type: Number,
    default: -1,
  },
  selectionEnd: {
    type: Number,
    default: -1,
  },
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  holdKeyboard: {
    type: Boolean,
    default: false,
  },
  disableDefaultPadding: {
    type: Boolean,
    default: false,
  },
  confirmType: {
    type: String as PropType<ConfirmTextType>,
    default: 'return',
  },
  confirmHold: {
    type: Boolean,
    default: false,
  },
  adjustKeyboardTo: {
    type: String as PropType<AdjustKeyboardTo>,
    default: 'cursor',
  },
}

export type TextareaProps = ExtractPropTypes<typeof textareaProps>

export const textareaEmits = {
  'blur': (evt: Event) => evt,
  'focus': (evt: Event) => evt,
  'change': (val1?: string, val2?: string | Event) => true,
  'update:modelValue': (val1?: string, val2?: string | Event) => true,
  'confirm': (evt: any) => evt instanceof Object,
}

export type TextareaEmits = typeof textareaEmits
