import type { ExtractPropTypes } from 'vue'
import { CLICK_EVENT } from '../_constants'
import { commonProps } from '../_utils'

export const sidenavbaritemProps = {
  ...commonProps,
  /**
   * @description 导航标题
   */
  title: String,
  /**
   * @description 导航唯一标识
   */
  ikey: String,
}

export type SideNavbarItemProps = ExtractPropTypes<typeof sidenavbaritemProps>

export const sidenavbaritemEmits = {
  [CLICK_EVENT]: () => true,
}

export type SideNavbarItemEmits = typeof sidenavbaritemEmits
