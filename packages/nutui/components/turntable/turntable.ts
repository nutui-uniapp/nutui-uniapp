import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumberProp } from '../_utils'
import type { TPrizeItem } from './type'

export const turntableProps = {
  ...commonProps,
  /**
   * @description 转盘的宽度
   */
  width: {
    required: true,
    default: '300px',
  },
  /**
   * @description 转盘的高度
   */
  height: {
    required: true,
    default: '300px',
  },
  /**
   * 奖品列表
   */
  prizeList: {
    type: Array<TPrizeItem>,
    required: true,
    default: () => [],
  },
  /**
   * 中奖奖品在列表的索引位置
   */
  prizeIndex: makeNumberProp(-1),
  /**
   * @description 转动的圈数
   */
  turnsNumber: makeNumberProp(5),
  /**
   * @description 转盘中的样式，包括每个扇区的背景颜色(在每条数据中页可单独设置 prizeColor)，扇区的边框颜色
   */
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
  /**
   * @description 转动需要持续的时间(秒)
   */
  turnsTime: makeNumberProp(5),
  /**
   * @description 抽奖间隔(秒)
   */
  lockTime: makeNumberProp(0),
  /**
   * @description 转盘中指针的样式，包括背景图片、大小等
   */
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
  startTurns: () => true,
  endTurns: () => true,
  lockTurns: () => true,
}

export type TurnTableEmits = typeof turntableEmits

export interface TurnTableInst {
  rotateTurn: () => void
}
