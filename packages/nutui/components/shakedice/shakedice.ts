import type { ExtractPropTypes } from 'vue'

export const shakediceProps = {
  time: {
    type: Number,
    default: 1,
  },
  speed: {
    type: Number,
    default: 3000,
  },
  id: {
    type: Number,
    default: 4,
  },
}

export type ShakeDiceProps = ExtractPropTypes<typeof shakediceProps>

export const shakediceEmits = {
  end: () => true,
}

export type ShakeDiceEmits = typeof shakediceEmits
export interface ShakeDiceInst {
  shake: () => true
}
