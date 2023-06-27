import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps } from '../_utils'

export type InputTextAlign = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent'
export type confirmTextType = 'send' | 'search' | 'next' | 'go' | 'done'
type InputType = 'text' | 'number' | 'idcard' | 'digit' | 'tel' | 'safe-password' | 'nickname'

export const searchbarProps = {
  ...commonProps,
  modelValue: {
    type: [String, Number],
    default: '',
  },
  inputType: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  shape: {
    type: String,
    default: 'round',
  },
  maxLength: {
    type: [String, Number],
    default: '9999',
  },
  placeholder: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  clearIcon: {
    type: String,
    default: 'circle-close',
  },
  background: {
    type: String,
    default: '',
  },
  inputBackground: {
    type: String,
    default: '',
  },
  focusStyle: {
    type: Object,
    default: () => ({}),
  },
  autofocus: {
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
  inputAlign: {
    type: String,
    default: 'left',
  },
  confirmType: {
    type: String as PropType<confirmTextType>,
    default: 'done',
  },
}

export type SearchbarProps = ExtractPropTypes<typeof searchbarProps>

export const searchbarEmits = {
  'update:modelValue': (val: string | number, event: Event) => true,
  'change': (val: string | number, event: Event) => true,
  'blur': (val: string | number, event: Event) => true,
  'focus': (val: string | number, event: Event) => true,
  'clear': (val: string | number) => true,
  'search': (val: string | number) => true,
  'clickInput': (event: Event) => true,
  'clickLeftIcon': (val: string | number, event: Event) => true,
  'clickRightIcon': (val: string | number, event: Event) => true,
}

export type SearchbarEmits = typeof searchbarEmits
