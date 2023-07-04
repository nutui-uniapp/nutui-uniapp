import type { ExtractPropTypes } from 'vue'

export const badgeProps = {
  value: {
    type: [String, Number],
  },
  max: {
    type: Number,
    default: 10000,
  },
  dot: {
    type: Boolean,
    default: false,
  },
  bubble: {
    type: Boolean,
    default: false,
  },
  badgeHidden: {
    type: Boolean,
    default: false,
  },
  top: {
    type: String,
    default: '0',
  },
  right: {
    type: String,
    default: '0',
  },
  zIndex: {
    type: Number,
    default: 9,
  },
  customColor: {
    type: String,
    default: '',
  },
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
