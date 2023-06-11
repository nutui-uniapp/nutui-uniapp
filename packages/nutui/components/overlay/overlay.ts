import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const overlayProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: [Number, String],
    default: 100,
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
    default: true,
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
  'update:visible': (visible: boolean) => visible,
  'click': (evt: MouseEvent) => evt,
}

export type OverlayEmits = typeof overlayEmits
