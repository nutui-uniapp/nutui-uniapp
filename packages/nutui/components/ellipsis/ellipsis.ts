import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp } from '../_utils'
import { CLICK_EVENT } from '../_constants'

export type Direction = 'start' | 'end' | 'middle'

export interface EllipsisedValue {
  leading?: string
  tailing?: string
}
export const ellipsisProps = {
  ...commonProps,
  /**
   * @description 文本内容
   */
  content: makeStringProp(''),

  /**
   * @description 省略位置，可选值 `start` \| `end` \| `middle`
   */
  direction: makeStringProp<Direction>('end'),

  /**
   * @description 展示几行
   */
  rows: makeNumericProp(1),

  /**
   * @description 展开操作的文案
   */
  expandText: makeStringProp(''),

  /**
   * @description 收起操作的文案
   */
  collapseText: makeStringProp(''),

  /**
   * @description 省略的符号
   */
  symbol: makeStringProp(''),

  /**
   * @description 容器的行高
   */
  lineHeight: makeNumericProp('20'),
}

export type EllipsisProps = ExtractPropTypes<typeof ellipsisProps>

export const ellipsisEmits = {
  change: (val: 'expand' | 'collapse') => val,
  [CLICK_EVENT]: () => true,
}

export type EllipsisEmits = typeof ellipsisEmits
