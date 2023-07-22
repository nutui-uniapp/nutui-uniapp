import type { ExtractPropTypes, PropType } from 'vue'

export type IndicatorAlign = 'left' | 'center' | 'right'

export const indicatorProps = {
  size: {
    type: Number,
    default: 3,
  },
  current: {
    type: Number,
    default: 1,
  },
  block: {
    type: Boolean,
    default: false,
  },
  align: {
    type: String as PropType<IndicatorAlign>,
    default: 'center',
  },
  fillZero: {
    type: Boolean,
    default: true,
  },
}

export type IndicatorProps = ExtractPropTypes<typeof indicatorProps>
