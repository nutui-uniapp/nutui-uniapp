import type { ExtractPropTypes } from 'vue'
import { isBoolean } from '../_utils'

export const stickyProps = {
  top: {
    type: [Number, String],
    default: 0,
  },
  zIndex: {
    type: [Number, String],
    default: 99,
  },
  scrollTop: {
    type: [Number, String],
    default: 1,
  },
}

export type StickyProps = ExtractPropTypes<typeof stickyProps>

export const stickyEmits = {
  change: (isFixed: boolean) => isBoolean(isFixed),
}

export type StickyEmits = typeof stickyEmits
