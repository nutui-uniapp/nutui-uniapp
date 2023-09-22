import type { ExtractPropTypes, PropType } from 'vue'
import type { PopoverLocation, PopoverTheme } from '../popover/type'
import { commonProps, isBoolean } from '../_utils'

export interface StepOptions {
  target: string
  content?: string
  location?: PopoverLocation
  popoverOffset?: number[]
  arrowOffset?: number
}
export const tourProps = {
  ...commonProps,
  modelValue: { type: Boolean, default: false },
  type: {
    type: String,
    default: 'step', // tile
  },
  steps: {
    type: Array as PropType<StepOptions[]>,
    default: () => [],
  },
  location: {
    type: String as PropType<PopoverLocation>,
    default: 'bottom',
  },
  current: {
    type: Number,
    default: 0,
  },
  nextStepTxt: {
    type: String,
    default: '下一步',
  },
  prevStepTxt: {
    type: String,
    default: '上一步',
  },
  completeTxt: {
    type: String,
    default: '完成',
  },
  mask: {
    type: Boolean,
    default: true,
  },
  offset: {
    type: Array as PropType<number[]>,
    default: [8, 10],
  },
  bgColor: {
    type: String,
    default: '',
  },
  theme: { type: String as PropType<PopoverTheme>, default: 'light' },
  maskWidth: {
    type: [Number, String],
    default: '',
  },
  maskHeight: {
    type: [Number, String],
    default: '',
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  showPrevStep: {
    type: Boolean,
    default: true,
  },
  showTitleBar: {
    type: Boolean,
    default: true,
  },
}

export type TourProps = ExtractPropTypes<typeof tourProps>

export const tourEmits = {
  'update:modelValue': (val: boolean) => isBoolean(val),
  'close': (val: number) => true,
  'change': (val: number) => true,
}

export type TourEmits = typeof tourEmits
