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
  'blur': (evt: any) => evt,
  'focus': (evt: any) => evt,
  'reduce': (_evt: any | number) => true,
  'add': (_evt: any | number) => true,
  'overlimit': (_evt: any, _type: 'reduce' | 'add') => true,
  'change': (_val1: string | number, _val2?: any) => true,
  'update:modelValue': (_val1?: string, _val2?: string | any) => true,
}

export type InputNumberEmits = typeof inputnumberEmits
