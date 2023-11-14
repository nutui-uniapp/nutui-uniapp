export const giftboxEmits = {
  startTurns: () => true,
  endTurns: () => true,
}

export type GiftBoxEmits = typeof giftboxEmits

export interface GiftBoxInst {
  /**
   * @description 礼盒初始化
   */
  init: () => void
}
