import type { ExtractPropTypes } from 'vue'

export const rowProps = {
  type: {
    type: String,
    default: '',
  },
  gutter: {
    type: [String, Number],
    default: '',
  },
  justify: {
    type: String,
    default: 'start',
  },
  align: {
    type: String,
    default: 'flex-start',
  },
  flexWrap: {
    type: String,
    default: 'nowrap',
  },
}

export type RowProps = ExtractPropTypes<typeof rowProps>
