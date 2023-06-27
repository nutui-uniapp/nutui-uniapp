import type { ExtractPropTypes } from 'vue'
import { commonProps } from '../_utils'

export const cellProps = {
  ...commonProps,
  title: { type: String, default: '' },
  subTitle: { type: String, default: '' },
  desc: { type: String, default: '' },
  descTextAlign: { type: String, default: 'right' },
  isLink: { type: Boolean, default: false },
  to: { type: String, default: '' },
  replace: { type: Boolean, default: false },
  roundRadius: { type: [String, Number], default: '' },
  url: { type: String, default: '' },
  center: { type: Boolean, default: false },
  size: { type: String, default: '' }, // large
}

export type CellProps = ExtractPropTypes<typeof cellProps>

export const cellEmits = {
  click: (event: Event) => event,
}

export type CellEmits = typeof cellEmits
