import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp } from '../_utils'

export const SIDE_NAVBAR_KEY = Symbol('sidenavbar')

export const sidenavbarProps = {
  ...commonProps,
  /**
   * @description 导航缩进宽度
   */
  offset: makeNumericProp(15),
}

export type SideNavbarProps = ExtractPropTypes<typeof sidenavbarProps>
