import type { ExtractPropTypes } from 'vue'
import { isNumber } from '../_utils'

export const circleprogressProps = {
  progress: {
    type: [Number, String],
    required: true,
  },
  strokeWidth: {
    type: [Number, String],
    default: 5,
  },
  radius: {
    type: [Number, String],
    default: 50,
  },
  strokeLinecap: {
    type: String,
    default: 'round',
  },
  color: {
    type: [String, Object],
    default: '#FF673E',
  },
  pathColor: {
    type: String,
    default: '#d9d9d9',
  },
  clockwise: {
    type: Boolean,
    default: true,
  },
}

export type CircleProgressProps = ExtractPropTypes<typeof circleprogressProps>

export const circleprogressEmits = {
  'update:progress': (val: number) => isNumber(val),
}

export type CircleProgressEmits = typeof circleprogressEmits
