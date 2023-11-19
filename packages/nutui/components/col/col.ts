import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp } from '../_utils'

export const colProps = {
  ...commonProps,
  /**
   * @description 列元素宽度（共分为 24 份，例如设置一行3个，那么 `span` 值为 8）
   */
  span: makeNumericProp(24),
  /**
   * @description 列元素偏移距离
   */
  offset: makeNumericProp(0),
}

export type ColProps = ExtractPropTypes<typeof colProps>
