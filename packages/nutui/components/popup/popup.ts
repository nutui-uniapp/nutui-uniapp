import type { ExtractPropTypes, PropType } from 'vue'
import { overlayProps } from '../overlay/overlay'
import { commonProps, isBoolean } from '../_utils'
import type { Position } from '../_constants/types'
import type { NutAnimationName } from '../transition/types'

export const popupProps = {
  ...overlayProps,
  ...commonProps,
  position: {
    type: String as PropType<Position>,
    default: 'center',
  },
  transition: {
    type: String as PropType<NutAnimationName>,
    default: '',
  },
  popClass: {
    type: String,
    default: '',
  },
  closeable: {
    type: Boolean,
    default: false,
  },
  closeIconPosition: {
    type: String,
    default: 'top-right',
  },
  closeIcon: {
    type: String,
    default: 'close',
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  round: {
    type: Boolean,
    default: false,
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: false,
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: true,
  },
}

export type PopupProps = ExtractPropTypes<typeof popupProps>

export const popupEmits = {
  'update:visible': (visible: boolean) => isBoolean(visible),
  'click-pop': (evt?: any) => evt instanceof Object,
  'click-close-icon': () => true,
  'open': () => true,
  'close': () => true,
  'opend': () => true,
  'closed': () => true,
  'click-overlay': () => true,

}

export type PopupEmits = typeof popupEmits
