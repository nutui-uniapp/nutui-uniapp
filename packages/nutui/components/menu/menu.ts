import type { ExtractPropTypes } from 'vue'

export const menuProps = {
  activeColor: {
    type: String,
    default: '',
  },
  overlay: {
    type: Boolean,
    default: true as const,
  },
  lockScroll: {
    type: Boolean,
    default: true as const,
  },
  duration: {
    type: [Number, String],
    default: 300,
  },
  titleIcon: String,

  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String,
    default: 'down',
  },
  scrollFixed: {
    type: [Boolean, String, Number],
    default: false,
  },
  titleClass: [String],
  upIcon: {
    type: String,
    default: 'rect-up',
  },
  downIcon: {
    type: String,
    default: 'rect-down',
  },
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
