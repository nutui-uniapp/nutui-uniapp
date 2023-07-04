import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { isBoolean } from '../_utils'

export const overlayProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: [Number, String],
    default: 300,
  },
  duration: {
    type: [Number, String],
    default: 300,
  },
  overlayClass: {
    type: String,
    default: '',
  },
  lockScroll: {
    type: Boolean,
    default: false,
  },
  overlayStyle: {
    type: Object as PropType<CSSProperties>,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
}

export type OverlayProps = ExtractPropTypes<typeof overlayProps>

export const overlayEmits = {
  'update:visible': (visible: boolean) => isBoolean(visible),
  'click': (evt: any) => evt instanceof Object,
}

export type OverlayEmits = typeof overlayEmits
