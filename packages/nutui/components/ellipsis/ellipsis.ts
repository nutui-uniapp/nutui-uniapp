import type { ExtractPropTypes, PropType } from 'vue'

export type Direction = 'start' | 'end' | 'middle'

export interface EllipsisedValue {
  leading?: string
  tailing?: string
}
export const ellipsisProps = {
  content: {
    type: String,
    default: '',
  },
  direction: {
    type: String as PropType<Direction>,
    default: 'end',
  },
  rows: {
    type: [Number, String],
    default: 1,
  },
  expandText: {
    type: String,
    default: '',
  },
  collapseText: {
    type: String,
    default: '',
  },
  symbol: {
    type: String,
    default: '...',
  },
  lineHeight: {
    type: [Number, String],
    default: '20',
  },
}

export type EllipsisProps = ExtractPropTypes<typeof ellipsisProps>

export const ellipsisEmits = {
  change: (val: 'expand' | 'collapse') => val,
  click: () => true,
}

export type EllipsisEmits = typeof ellipsisEmits
