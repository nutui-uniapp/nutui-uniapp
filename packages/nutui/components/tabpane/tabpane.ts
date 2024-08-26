import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp } from '../_utils'

export const tabpaneProps = {
  ...commonProps,
  /**
   * @description 标题
   */
  title: makeNumericProp(''),
  /**
   * @description 标签 Key, 匹配的标识符
   */
  paneKey: makeNumericProp(''),
  /**
   * @description 是否禁用标签
   */
  disabled: Boolean,
}

export type TabPaneProps = ExtractPropTypes<typeof tabpaneProps>
