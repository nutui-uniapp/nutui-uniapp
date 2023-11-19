import type { ExtractPropTypes } from 'vue'
import { commonProps, truthProp } from '../_utils'

export const subsidenavbarProps = {
  ...commonProps,
  /**
   * @description 导航标题
   */
  title: String,
  /**
   * @description 导航唯一标识
   */
  ikey: [String, Number],
  /**
   * @description 导航是否默认展开
   */
  open: truthProp,
}

export type SubSidenavbarProps = ExtractPropTypes<typeof subsidenavbarProps>

export const subsidenavbarEmits = {
  titleClick: () => true,
}

export type SubSidenavbarEmits = typeof subsidenavbarEmits
