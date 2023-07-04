import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps } from '../_utils'
import type { ButtonFormType, ButtonShape, ButtonSize, ButtonType } from './type'

export const buttonProps = {
  ...commonProps,
  customColor: String,
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'round',
  },
  plain: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  formType: {
    type: String as PropType<ButtonFormType>,
    default: 'button',
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'normal',
  },
  block: {
    type: Boolean,
    default: false,
  },
}

export const buttonEmits = {
  click: (evt: MouseEvent) => evt,
}

export type ButtonEmits = typeof buttonEmits

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
