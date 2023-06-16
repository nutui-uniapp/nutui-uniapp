import type { ExtractPropTypes } from 'vue'

export const indicatorProps = {
  size: {
    type: Number,
    default: 3,
    required: true,
  },
  current: {
    type: Number,
    default: 1,
    required: true,
  },
  block: {
    type: Boolean,
    default: false,
  },
  align: {
    type: String,
    default: 'center',
  },
  fillZero: {
    type: Boolean,
    default: true,
  },
}

export type IndicatorProps = ExtractPropTypes<typeof indicatorProps>
