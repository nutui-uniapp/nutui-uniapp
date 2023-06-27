import type { ExtractPropTypes, PropType } from 'vue'
import { isBoolean, isNumber, isString } from '../_utils'

export const numberkeyboardProps = {
  confirmText: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<'default' | 'rightColumn'>,
    default: 'default',
  },
  customKey: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
  maxlength: {
    type: [Number, String],
    default: 6,
  },
  randomKeys: {
    type: Boolean,
    default: false,
  },
  overlay: {
    type: Boolean,
    default: false,
  },
  popClass: {
    type: String,
    default: '',
  },
}

export type NumberKeyBoardProps = ExtractPropTypes<typeof numberkeyboardProps>

export const numberkeyboardEmits = {
  'input': (val: string | number) => isString(val) || isNumber(val),
  'delete': () => true,
  'close': () => true,
  'update:visible': (visible: boolean) => isBoolean(visible),
  'update:modelValue': (val: string | number) => isString(val),
}

export type NumberKeyBoardEmits = typeof numberkeyboardEmits
