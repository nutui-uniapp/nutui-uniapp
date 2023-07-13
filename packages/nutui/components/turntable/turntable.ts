import type { ExtractPropTypes } from 'vue'

export const turntableProps = {
  width: {
    required: true,
    default: '300px',
  },
  height: {
    required: true,
    default: '300px',
  },
  prizeList: {
    type: Array<any>,
    required: true,
    default: () => [],
  },
  prizeIndex: {
    type: Number,
    default: -1,
  },
  turnsNumber: {
    type: Number,
    default: 5,
  },
  styleOpt: {
    default: () => {
      return {
        // 每一块扇形的背景色,默认值,可通过父组件来改变
        prizeBgColors: [
          'rgb(255, 231, 149)',
          'rgb(255, 247, 223)',
          'rgb(255, 231, 149)',
          'rgb(255, 247, 223)',
          'rgb(255, 231, 149)',
          'rgb(255, 247, 223)',
        ],
        // 每一块扇形的外边框颜色,默认值,可通过父组件来改变
        borderColor: '#ff9800',
      }
    },
  },
  turnsTime: {
    // 转动需要持续的时间(秒)
    default: 5,
  },
  lockTime: {
    // 抽奖间隔(秒)
    default: 0,
  },
  pointerStyle: {
    default: () => {
      return {
        width: '80px',
        height: '80px',
        backgroundImage:
          'url("https://img11.360buyimg.com/imagetools/jfs/t1/89512/11/15244/137408/5e6f15edEf57fa3ff/cb57747119b3bf89.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }
    },
  },
}

export type TurnTableProps = ExtractPropTypes<typeof turntableProps>

export const turntableEmits = {
  click: () => true,
  startTurns: () => true,
  endTurns: () => true,
  lockTurns: () => true,

}

export type TurnTableEmits = typeof turntableEmits

export interface TurnTableInst {
  rotateTurn: () => void
}
