import type { ExtractPropTypes, PropType } from 'vue'
import type { Interceptor } from '../_utils'
import type { ImageInterface } from './types'

export const imagepreviewProps = {
  show: {
    type: Boolean,
    default: false,
  },
  scale: {
    type: Boolean,
    default: false,
  },
  images: {
    type: Array as PropType<ImageInterface[]>,
    default: () => [],
  },
  contentClose: {
    type: Boolean,
    default: true,
  },
  initNo: {
    type: Number,
    default: 0,
  },
  paginationVisible: {
    type: Boolean,
    default: false,
  },
  paginationColor: {
    type: String,
    default: '#fff',
  },
  autoplay: {
    type: [Number, String],
    default: 3000,
  },
  showIndex: {
    type: Boolean,
    default: true,
  },
  closeable: {
    type: Boolean,
    default: false,
  },
  closeIconPosition: {
    type: String as PropType<'top-right' | 'top-left'>,
    default: 'top-right', // top-right  top-left
  },
  beforeClose: Function as PropType<Interceptor>,
  isLoop: {
    type: Boolean,
    default: true,
  },
}

export type ImagePreviewProps = ExtractPropTypes<typeof imagepreviewProps>

export const imagepreviewEmits = {
  close: () => true,
  change: (_val: number) => true,
}

export type ImagePreviewEmits = typeof imagepreviewEmits
