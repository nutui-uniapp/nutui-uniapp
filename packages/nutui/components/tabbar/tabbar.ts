import type { ExtractPropTypes } from 'vue'
import { isNumber, isString } from '../_utils'

export const tabbarProps = {
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  bottom: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'base',
  },
  size: {
    type: String,
    default: '20px',
  },
  unactiveColor: {
    type: String,
    default: '',
  },
  activeColor: {
    type: String,
    default: '',
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: Boolean,
    default: false,
  },
  dot: {
    type: Boolean,
    default: false,
  },
}

export type TabBarProps = ExtractPropTypes<typeof tabbarProps>

export const tabbarEmits = {
  'tabSwitch': (val: any, index: number | string) => {
    return {
      val,
      index,
    }
  },
  'update:modelValue': (val: string | number) => isString(val) || isNumber(val),
}

export type TabBarEmits = typeof tabbarEmits
