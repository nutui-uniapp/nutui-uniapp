import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp } from '../_utils'
import { CLICK_EVENT } from '../_constants'

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

export const tabpaneEmits = {
  [CLICK_EVENT]: () => true,
}

export type TabPaneEmits = typeof tabpaneEmits
