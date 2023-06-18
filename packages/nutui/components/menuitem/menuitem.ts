import type { ExtractPropTypes, PropType } from 'vue'
import { isNumber, isString } from '../_utils'

export interface MenuItemOption {
  text: string
  value: number | string
}

export const menuitemProps = {
  title: String,
  options: {
    type: Array as PropType<MenuItemOption[]>,
    default: [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: null as unknown as PropType<unknown>,
  cols: {
    type: Number,
    default: 1,
  },
  activeTitleClass: String,
  inactiveTitleClass: String,
  optionIcon: {
    type: String,
    default: 'Check',
  },
}

export type MenuItemProps = ExtractPropTypes<typeof menuitemProps>

export const menuitemEmits = {
  'update:modelValue': (val: string | number) => isString(val) || isNumber(val),
  'change': (val: string | number) => isString(val) || isNumber(val),
}
export type MenuitemEmits = typeof menuitemEmits

export interface MenuItemInst {
  change: (val?: any) => any
  toggle: (show?: boolean) => boolean
  open: () => void
  close: () => void
}
