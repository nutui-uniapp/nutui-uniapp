import type { ExtractPropTypes } from 'vue'

export const clientHeight = uni.getSystemInfoSync().windowHeight || 667

export const listProps = {
  height: {
    type: [Number],
    default: 50,
  },
  listData: {
    type: Array,
    default: () => {
      return []
    },
  },
  bufferSize: {
    type: Number,
    default: 5,
  },
  containerHeight: {
    type: [Number],
    default: clientHeight,
  },
  estimateRowHeight: {
    type: Number,
    default: 80,
  },
  margin: {
    type: Number,
    default: 10,
  },
}

export type ListProps = ExtractPropTypes<typeof listProps>

export const listEmits = {
  // scrollUp: (val: number) => true,
  // scrollDown: (val: number) => true,
  scrollBottom: () => true,
  scroll: () => true,
}

export type ListEmits = typeof listEmits
