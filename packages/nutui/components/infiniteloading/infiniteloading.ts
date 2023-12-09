import type { ExtractPropTypes } from 'vue'
import { isFunction, isNumber } from '../_utils'

export const infiniteloadingProps = {
  hasMore: {
    type: Boolean,
    default: true,
  },
  threshold: {
    type: Number,
    default: 200,
  },
  upperThreshold: {
    type: Number,
    default: 40,
  },
  pullIcon: {
    type: String,
    default: 'https://img10.360buyimg.com/imagetools/jfs/t1/169863/6/4565/6306/60125948E7e92774e/40b3a0cf42852bcb.png',
  },
  pullTxt: {
    type: String,
    default: '',
  },
  loadIcon: {
    type: String,
    default: 'https://img10.360buyimg.com/imagetools/jfs/t1/169863/6/4565/6306/60125948E7e92774e/40b3a0cf42852bcb.png',
  },
  loadTxt: {
    type: String,
    default: '',
  },
  loadMoreTxt: {
    type: String,
    default: '',
  },
  useWindow: {
    type: Boolean,
    default: true,
  },
  containerId: {
    type: String,
    default: '',
  },
  useCapture: {
    type: Boolean,
    default: false,
  },
  isOpenRefresh: {
    type: Boolean,
    default: false,
  },
}

export type InfiniteLoadingProps = ExtractPropTypes<typeof infiniteloadingProps>

export const infiniteloadingEmits = {
  scrollChange: (val: number) => isNumber(val),
  loadMore: (fun: () => void) => isFunction(fun),
  refresh: (fun: () => void) => isFunction(fun),
}

export type InfiniteLoadingEmits = typeof infiniteloadingEmits
