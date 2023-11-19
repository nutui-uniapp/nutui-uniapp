import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumberProp, makeStringProp, truthProp } from '../_utils'

export type IndicatorAlign = 'left' | 'center' | 'right'

export const indicatorProps = {
  ...commonProps,
  /**
   * @description 步骤长度
   */
  size: makeNumberProp(3),
  /**
   * @description 当前步骤
   */
  current: makeNumberProp(1),
  /**
   * @description 是否启用块级布局
   */
  block: Boolean,
  /**
   * @description 对齐方式，仅在 `block` 为 `true` 时生效, 可选值 `left`, `right`, `center`
   */
  align: makeStringProp<IndicatorAlign>('left'),
  /**
   * @description 单数前面是否补 0
   */
  fillZero: truthProp,
}

export type IndicatorProps = ExtractPropTypes<typeof indicatorProps>
