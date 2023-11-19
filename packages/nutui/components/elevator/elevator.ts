import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, isString, makeArrayProp, makeNumberProp, makeNumericProp, makeStringProp } from '../_utils'
import type { ElevatorData } from './type'

export const elevatorProps = {
  ...commonProps,
  /**
   * @description 电梯区域的高度
   */
  height: makeNumericProp('200px'),

  /**
   * @description 索引 key 值
   */
  acceptKey: makeStringProp('title'),

  /**
   * @description 索引列表
   */
  indexList: makeArrayProp<ElevatorData>([]),

  /**
   * @description 索引是否吸顶
   */
  isSticky: Boolean,

  /**
   * @description 右侧锚点的上下间距
   */
  spaceHeight: makeNumberProp(23),

  /**
   * @description 左侧索引的高度
   */
  titleHeight: makeNumberProp(35),
}

export type ElevatorProps = ExtractPropTypes<typeof elevatorProps>

export const elevatorEmits = {
  clickItem: (key: string, item: any) => isString(key) && (item instanceof Object),
  clickIndex: (key: string) => isString(key),
  change: (val: number) => isNumber(val),
}

export type ElevatorEmits = typeof elevatorEmits
