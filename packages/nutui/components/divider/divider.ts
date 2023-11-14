import type { ExtractPropTypes } from 'vue'
import { commonProps, makeStringProp, truthProp } from '../_utils'

export const dividerProps = {
  ...commonProps,
  /**
   * @description 内容位置，可选值为 `left`、`right`、`center`
   */
  contentPosition: makeStringProp<'left' | 'right' | 'center'>('center'),
  /**
   * @description 是否使用虚线
   */
  dashed: Boolean,
  /**
   * @description 是否使用 `0.5px` 线
   */
  hairline: truthProp,
  /**
   * @description 水平还是垂直类型，可选值 `vertical`和`horizontal`
   */
  direction: makeStringProp<'vertical' | 'horizontal'>('horizontal'),
}

export type DividerProps = ExtractPropTypes<typeof dividerProps>
