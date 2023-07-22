import type { ExtractPropTypes, PropType } from 'vue'
import type { ProgressSize, ProgressStatus } from './types'

export const progressProps = {
  percentage: {
    type: [Number, String],
    default: 0,
    required: true,
  },
  size: {
    type: String as PropType<ProgressSize>,
    default: 'base',
  },
  status: {
    type: String as PropType<ProgressStatus>,
    default: 'text',
  },
  strokeWidth: {
    type: [Number, String],
    default: '',
  },
  textInside: {
    type: Boolean,
    default: false,
  },
  showText: {
    type: Boolean,
    default: true,
  },
  strokeColor: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: '',
  },
  textBackground: {
    type: String,
    default: '',
  },
  isShowPercentage: {
    type: Boolean,
    default: true,
  },
}

export type ProgressProps = ExtractPropTypes<typeof progressProps>
