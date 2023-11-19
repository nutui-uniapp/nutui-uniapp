import type { ExtractPropTypes } from 'vue'
import { commonProps } from '../_utils'

export const swiperItemProps = {
  ...commonProps,
}

export type SwiperItemProps = ExtractPropTypes<typeof swiperItemProps>

export interface SwiperItemInst {
  setOffset: (offset: number) => void
}
