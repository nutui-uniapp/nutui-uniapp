import type { ExtractPropTypes } from 'vue'
import { CLICK_EVENT } from '../_constants'

export const sidenavbaritemProps = {
  /**
   * @description 导航标题
   */
  title: String,
  /**
   * @description 导航唯一标识
   */
  ikey: String,
}

export type SideNavbaritemProps = ExtractPropTypes<typeof sidenavbaritemProps>

export const sidenavbaritemEmits = {
  [CLICK_EVENT]: () => true,
}

export type SideNavbaritemEmits = typeof sidenavbaritemEmits
