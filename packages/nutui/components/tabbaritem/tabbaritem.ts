import type { ExtractPropTypes } from 'vue'
import { badgeProps } from '../badge'
import { commonProps } from '../_utils'

export const tabbaritemProps = {
  ...commonProps,
  ...badgeProps,
  /**
   * @description 标签页的标题
   */
  tabTitle: String,
  /**
   * @description 标签名称，作为匹配的标识符
   */
  name: String,
  /**
   * @description 标签页显示的图标
   */
  icon: String,
  /**
   * @description 标签页的跳转链接
   */
  href: String,
}

export type TabBarItemProps = ExtractPropTypes<typeof tabbaritemProps>
