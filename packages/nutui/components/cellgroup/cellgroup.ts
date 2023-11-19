import type { ExtractPropTypes } from 'vue'
import { commonProps, makeStringProp } from '../_utils'

export const cellgroupProps = {
  ...commonProps,
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
