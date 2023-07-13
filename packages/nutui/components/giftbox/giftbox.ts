import type { ExtractPropTypes } from 'vue'

export const giftboxProps = {
  initPrize: {
    type: Boolean,
    default: true,
  },
}

export type GiftBoxProps = ExtractPropTypes<typeof giftboxProps>

export const giftboxEmits = {
  startTurns: () => true,
  endTurns: () => true,
}

export type GiftBoxEmits = typeof giftboxEmits

export interface GiftBoxInst {
  init: () => void
}
