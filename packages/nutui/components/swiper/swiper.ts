import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps } from '../_utils'

export const swiperProps = {
  ...commonProps,
  list: {
    type: Array,
    default: () => [],
  },
  width: {
    type: [Number, String],
    default: uni.getSystemInfoSync().windowWidth,
  },
  height: {
    type: [Number, String],
    default: 0,
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal', // horizontal and vertical
  },
  paginationVisible: {
    type: Boolean,
    default: false,
  },
  paginationColor: {
    type: String,
    default: '#fff',
  },
  loop: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: [Number, String],
    default: 500,
  },
  autoPlay: {
    type: [Number, String],
    default: 0,
  },
  isAutoPlay: {
    type: Boolean,
    default: true,
  },
  initPage: {
    type: [Number, String],
    default: 0,
  },
  touchable: {
    type: Boolean,
    default: true,
  },
  isPreventDefault: {
    type: Boolean,
    default: true,
  },
  isStopPropagation: {
    type: Boolean,
    default: true,
  },
}

export type SwiperProps = ExtractPropTypes<typeof swiperProps>

export const swiperEmits = {
  change: (val: number) => true,
}

export type SwiperEmits = typeof swiperEmits

export const SWIPER_KEY = Symbol('swiper')

export interface SwiperInst {
  prev: () => void
  next: () => void
  to: (index: number) => void
}
