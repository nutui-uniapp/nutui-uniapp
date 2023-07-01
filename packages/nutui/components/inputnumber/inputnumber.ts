import type { ExtractPropTypes } from 'vue'

export const inputnumberProps = {
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  inputWidth: {
    type: [Number, String],
    default: '',
  },
  buttonSize: {
    type: [Number, String],
    default: '',
  },
  min: {
    type: [Number, String],
    default: 1,
  },
  max: {
    type: [Number, String],
    default: 9999,
  },
  step: {
    type: [Number, String],
    default: 1,
  },
  decimalPlaces: {
    type: [Number, String],
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
}

export type InputNumberProps = ExtractPropTypes<typeof inputnumberProps>

export const inputnumberEmits = {
  'blur': (evt: Event) => evt,
  'focus': (evt: Event) => evt,
  'reduce': (evt: Event | number) => true,
  'add': (evt: Event | number) => true,
  'overlimit': (evt: Event, type: 'reduce' | 'add') => true,
  'change': (val1?: string | number, val2?: string | Event | number) => true,
  'update:modelValue': (val1?: string, val2?: string | Event) => true,
}

export type InputNumberEmits = typeof inputnumberEmits
