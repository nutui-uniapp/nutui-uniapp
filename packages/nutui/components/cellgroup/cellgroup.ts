import type { ExtractPropTypes } from 'vue'
import { commonProps } from '../_utils'

export const cellgroupProps = {
  ...commonProps,
  /**
   * @description 标题名称
   */
  title: String,
  /**
   * @description 右侧描述
   */
  desc: String,
}

export type CellGroupProps = ExtractPropTypes<typeof cellgroupProps>
