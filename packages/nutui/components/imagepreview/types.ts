import type { Interceptor } from '../_utils'

export interface ImageInterface {
  src: string
}

export interface ImagePreviewOptions {
  show: boolean
  images: ImageInterface[]
  videos: []
  contentClose: boolean
  initNo: number
  paginationVisible: boolean
  paginationColor: string
  autoplay: [number, string]
  isWrapTeleport: boolean
  showIndex?: boolean
  closeable?: boolean
  closeIcon?: string
  closeIconPosition?: string
  beforeClose?: Interceptor
  maxZoom?: number
  minZoom?: number
  isLoop?: boolean
  close?(): void
  change?(index: number): void
}

export const baseProps = {
  show: { type: Boolean, default: false },
  initNo: { type: Number, default: 0 },
  showIndex: { type: Boolean, default: true },
  minZoom: { type: Number, default: 1 / 3 },
  maxZoom: { type: Number, default: 3 },
}
