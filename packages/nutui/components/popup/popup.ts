import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { overlayProps } from '../overlay/overlay'
import { isBoolean } from '../_utils'
import type { NutAnimationName } from '../transition'
import type { Position } from '../_constants/types'

export const popupProps = {
  ...overlayProps,
  position: {
    type: String as PropType<Position>,
    default: 'center',
  },
  transition: {
    type: String as PropType<NutAnimationName>,
    default: '',
  },
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
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
}

export type PopupProps = ExtractPropTypes<typeof popupProps>

export const popupEmits = {
  'update:visible': (visible: boolean) => isBoolean(visible),
  'click-pop': (evt: Event) => evt instanceof Object,
  'click-close-icon': () => true,
  'open': () => true,
  'close': () => true,
  'opend': () => true,
  'closed': () => true,
  'click-overlay': () => true,

}

export type PopupEmits = typeof popupEmits
