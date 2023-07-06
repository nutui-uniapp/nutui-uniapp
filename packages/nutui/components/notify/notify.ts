import type { ExtractPropTypes, PropType } from 'vue'
import { isBoolean } from '../_utils'
import type { Position } from '../_constants/types'
import type { NotifyType } from './type'

export const notifyProps = {
  customColor: { type: String, default: '' },
  msg: { type: String, default: '' },
  duration: { type: Number, default: 3000 },
  className: {
    type: String,
    default: '',
  },
  background: { type: String, default: '' },
  type: {
    type: String as PropType<NotifyType>,
    default: 'danger',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String as PropType<Position>,
    default: 'top',
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: false,
  },
  safeHeight: {
    type: Number,
  },
  onClose: Function,
  onClick: Function,
}

export type NotifyProps = ExtractPropTypes<typeof notifyProps>

export const notifyEmits = {
  'update:visible': (val: boolean) => isBoolean(val),
}

export type NotifyEmits = typeof notifyEmits
