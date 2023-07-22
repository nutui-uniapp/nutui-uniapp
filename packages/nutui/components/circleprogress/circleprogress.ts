import type { ExtractPropTypes, PropType } from 'vue'

export type CircleProgressStrokeLinecap = 'butt' | 'round' | 'square'

export const circleprogressProps = {
  progress: {
    type: [Number, String],
    default: 0,
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
    type: String as PropType<CircleProgressStrokeLinecap>,
    default: 'round',
  },
  customColor: {
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
