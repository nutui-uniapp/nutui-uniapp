import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumberProp } from '../_utils'

export const guessgiftProps = {
  ...commonProps,
  initPrize: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 交换次数
   */
  turnNumber: makeNumberProp(20),
  /**
   * @description 动画频率，位置交换更新
   */
  turnsFrequency: makeNumberProp(50),
  /**
   * @description 碗抬起的高度
   */
  raiseHeight: makeNumberProp(50),
  /**
   * @description 中奖奖品在列表的索引位置
   */
  prizeIndex: makeNumberProp(-1),
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
