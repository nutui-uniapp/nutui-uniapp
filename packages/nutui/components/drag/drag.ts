import type { ExtractPropTypes } from 'vue'
import { commonProps } from '../_utils'

export const dragProps = {
  ...commonProps,
  attract: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: 'all',
  },
  boundary: {
    type: Object,
    default: () => {
      return {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }
    },
  },
}

export type DragProps = ExtractPropTypes<typeof dragProps>
