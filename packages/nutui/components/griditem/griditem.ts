import type { ExtractPropTypes } from 'vue'

export const gridItemProps = {
  text: {
    type: String,
  },
  // router
  to: {
    type: [String, Object],
  },
  // #ifdef H5
  url: {
    type: String,
    default: '',
  },
  // #endif
  replace: {
    type: Boolean,
    default: false,
  },
}

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>

export const gridItemEmits = {
  click: (evt: Event) => evt instanceof Object,
}

export type GridItemEmits = typeof gridItemEmits
