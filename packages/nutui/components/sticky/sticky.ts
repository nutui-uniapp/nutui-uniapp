import type { ExtractPropTypes } from 'vue'

export const stickyProps = {
  top: {
    type: [Number, String],
    default: 0,
  },
  zIndex: {
    type: [Number, String],
    default: 2000,
  },
  parentHeight: {
    type: [Number],
    default: 667,
  },
}

export type StickyProps = ExtractPropTypes<typeof stickyProps>
