import type { ExtractPropTypes } from 'vue'

export const marqueeProps = {
  // 抽奖样式
  styleOpt: {
    type: Object,
    default: () => {
      return {
        itemStyle: {},
        startStyle: {},
        bgStyle: {
          background: 'rgb(255, 231, 149)',
        },
      }
    },
  },
  // 奖品列表
  prizeList: {
    type: Array<any>,
    required: true,
  },
  // 中奖奖品的index
  prizeIndex: {
    type: Number || String,
    default: -1,
  },
  // 初始转动速度
  speed: {
    type: Number || String,
    default: 150,
  },
  // 预抽奖，转动多少次进入抽奖环节
  circle: {
    type: Number || String,
    default: 30,
  },
}

export type MarqueeProps = ExtractPropTypes<typeof marqueeProps>

export const marqueeEmits = {
  click: () => true,
  startTurns: () => true,
  endTurns: () => true,

}

export type MarqueeEmits = typeof marqueeEmits
