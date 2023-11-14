import type { ExtractPropTypes } from 'vue'
import { makeStringProp } from '../_utils'

export const cellgroupProps = {
  /**
   * @description 标题名称
   */
  title: makeStringProp(''),
  /**
   * @description 右侧描述
   */
  desc: makeStringProp(''),
}

export type CellGroupProps = ExtractPropTypes<typeof cellgroupProps>
