import type { ExtractPropTypes } from 'vue'

export const guessgiftProps = {
  initPrize: {
    type: Boolean,
    default: true,
  },
  turnNumber: {
    type: Number,
    default: 20,
  },
  turnsFrequency: {
    type: Number,
    default: 500,
  },
  raiseHeight: {
    type: Number,
    default: 50,
  },
  prizeIndex: {
    type: Number,
    default: -1,
  },
}

export type GuessGiftProps = ExtractPropTypes<typeof guessgiftProps>

export const guessgiftEmits = {
  startTurns: () => true,
  endTurns: () => true,
}

export type GuessGiftEmits = typeof guessgiftEmits
export interface ShakeDiceInst {
  shake: () => true
}
