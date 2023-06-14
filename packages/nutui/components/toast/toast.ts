import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps, isBoolean } from '../_utils'
import type { ToastType } from './types'

export const toastProps = {
  ...commonProps,
  msg: String,
  duration: {
    type: Number,
    default: 2000,
  },
  center: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String as PropType<ToastType>,
  },
  bottom: {
    type: String,
    default: '30px',
  },
  size: {
    type: [String, Number],
  },
  icon: {
    type: String,
    default: '',
  },
  iconSize: {
    type: [String, Number],
    default: '20',
  },
  textAlignCenter: {
    type: Boolean,
    default: true,
  },
  loadingRotate: {
    type: Boolean,
    default: true,
  },
  bgColor: {
    type: String,
    default: '',
  },

  onClose: Function,
  unmount: Function,
  cover: {
    type: Boolean,
    default: false,
  },
  coverColor: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: false,
  },
}

export type ToastProps = ExtractPropTypes<typeof toastProps>

export const toastEmits = {
  'update:visible': (visible: boolean) => isBoolean(visible),
  'closed': () => true,
}

export type ToastEmits = typeof toastEmits
