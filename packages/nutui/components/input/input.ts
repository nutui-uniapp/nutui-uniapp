import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps } from '../_utils'
import type { ConfirmTextType, InputAlignType, InputFormatTrigger, InputMode, InputType } from './type'

export const inputProps = {
  ...commonProps,
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  placeholderStyle: {
    type: String,
    default: '',
  },
  placeholderClass: {
    type: String,
    default: 'input-placeholder',
  },
  inputAlign: {
    type: String as PropType<InputAlignType>,
    default: 'left',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: [String, Number],
    default: 140,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  clearSize: {
    type: [String, Number],
    default: '14',
  },
  border: {
    type: Boolean,
    default: true,
  },
  formatTrigger: {
    type: String as PropType<InputFormatTrigger>,
    default: 'onChange',
  },
  formatter: {
    type: Function as PropType<(value: string) => string>,
    default: null,
  },
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  confirmType: {
    type: String as PropType<ConfirmTextType>,
    default: 'done',
  },
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  alwaysSystem: {
    type: Boolean,
    default: false,
  },
  showClearIcon: {
    type: Boolean,
    default: false,
  },
  inputMode: {
    type: String as PropType<InputMode>,
    default: 'text',
  },
  cursorSpacing: {
    type: Number,
    default: 0,
  },
  alwaysEmbed: {
    type: Boolean,
    default: false,
  },
  confirmHold: {
    type: Boolean,
    default: false,
  },
  cursor: {
    type: Number,
  },
  selectionStart: {
    type: Number,
    default: -1,
  },
  selectionEnd: {
    type: Number,
    default: -1,
  },
  holdKeyboard: {
    type: Boolean,
    default: false,
  },
}

export const inputEmits = {
  'click': (evt: any) => evt instanceof Object,
  'clickInput': (evt: any) => evt instanceof Object,
  'blur': (evt: any) => evt instanceof Object,
  'focus': (evt: any) => evt instanceof Object,
  'clear': () => true,
  'keypress': () => true,
  'confirm': (evt: any) => evt instanceof Object,
  'update:modelValue': (_val1?: string, _val2?: any) => true,
}

export type InputEmits = typeof inputEmits

export type InputProps = ExtractPropTypes<typeof inputProps>
