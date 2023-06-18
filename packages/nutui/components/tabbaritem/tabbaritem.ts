import type { ExtractPropTypes } from 'vue'
import { badgeProps } from '../badge'

export const tabbaritemProps = {
  ...badgeProps,
  tabTitle: {
    // 标签页的标题
    type: String,
    default: '',
  },
  name: {
    type: String,
  },
  icon: {
    // 标签页显示的icon
    type: String,
  },
  href: {
    // 标签页的跳转链接
    type: String,
    default: '',
  },
}

export type TabBarItemProps = ExtractPropTypes<typeof tabbaritemProps>
