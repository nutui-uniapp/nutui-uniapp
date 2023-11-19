import type { ExtractPropTypes } from 'vue'
import { commonProps, makeArrayProp, makeNumberProp, truthProp } from '../_utils'

export const barrageProps = {
  ...commonProps,
  /**
   * @description 弹幕列表数据
   */
  danmu: makeArrayProp<string>([]),

  /**
   * @description 可视区域内每个弹幕出现的时间间隔
   */
  frequency: makeNumberProp<number>(500),

  /**
   * @description 每个弹幕的滚动时间
   */
  speeds: makeNumberProp<number>(5000),

  /**
   * @description 弹幕行数，分几行展示
   */
  rows: makeNumberProp<number>(3),

  /**
   * @description 弹幕垂直距离
   */
  top: makeNumberProp<number>(10),

  /**
   * @description 是否循环播放
   */
  loop: truthProp,
}

export type BarrageProps = ExtractPropTypes<typeof barrageProps>

export interface BarrageInst {
  add: (word: string) => void
}
