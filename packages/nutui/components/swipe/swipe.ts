import type { ExtractPropTypes } from 'vue'

export const swipeProps = {
  name: {
    type: String,
    default: '',
  },
  touchMoveStopPropagation: {
    type: Boolean,
    default: false,
  },
  touchMovePreventDefault: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

export type SwipeProps = ExtractPropTypes<typeof swipeProps>

export type SwipePosition = 'left' | 'right' | ''

export const swipeEmits = {
  open: (info: { name: string; position: SwipePosition }) => info,
  close: (info: { name: string; position: SwipePosition }) => info,
  click: (val: any) => true,
}

export type SwipeEmits = typeof swipeEmits

export interface SwipeInts {
  open: (position?: SwipePosition) => void
  close: () => void
}
