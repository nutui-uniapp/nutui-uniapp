import type { ExtractPropTypes } from 'vue'

export const backtopProps = {
  height: {
    type: String,
    default: '100vh',
  },
  bottom: {
    type: Number,
    default: 20,
  },
  right: {
    type: Number,
    default: 10,
  },
  zIndex: {
    type: Number,
    default: 10,
  },
  distance: {
    type: Number,
    default: 200,
  },
  color: {
    type: String,
    default: '#000',
  },
}

export type BacktopProps = ExtractPropTypes<typeof backtopProps>

export const backtopEmits = {
  click: (evt: MouseEvent) => evt,
}

export type BacktopEmits = typeof backtopEmits
