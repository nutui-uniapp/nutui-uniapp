import type { ExtractPropTypes } from 'vue'

export const swipegroupProps = {
  lock: {
    type: Boolean,
    default: false,
  },
}

export type SwipeGroupProps = ExtractPropTypes<typeof swipegroupProps>
