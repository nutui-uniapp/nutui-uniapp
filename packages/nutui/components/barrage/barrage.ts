import type { ExtractPropTypes } from 'vue'

export const barrageProps = {
  danmu: {
    type: Array,
    default: () => [],
  },
  frequency: {
    type: Number,
    default: 500,
  },
  speeds: {
    type: Number,
    default: 5000,
  },
  rows: {
    type: Number,
    default: 3,
  },
  top: {
    type: Number,
    default: 10,
  },
  loop: {
    type: Boolean,
    default: true,
  },
}

export type BarrageProps = ExtractPropTypes<typeof barrageProps>

export const barrageEmits = {
  click: () => true,
}

export type BarrageEmits = typeof barrageEmits

export interface BarrageInst {
  add: (word: string) => void
}
