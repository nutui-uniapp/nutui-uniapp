import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumberProp } from '../_utils'

export const shakediceProps = {
  ...commonProps,
  /**
   * @description 旋转时间，秒
   */
  time: makeNumberProp(1),
  /**
   * @description 旋转速度,ms
   */
  speed: makeNumberProp(3000),
  /**
   * @description 中奖的 id(1 为 1 点，依次类推)
   */
  id: makeNumberProp(4),
}

export type ShakeDiceProps = ExtractPropTypes<typeof shakediceProps>

export const shakediceEmits = {
  end: () => true,
}

export type ShakeDiceEmits = typeof shakediceEmits
export interface ShakeDiceInst {
  shake: () => true
}
