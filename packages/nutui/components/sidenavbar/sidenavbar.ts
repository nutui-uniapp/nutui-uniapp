import type { ExtractPropTypes } from 'vue'
import { makeNumericProp } from '../_utils'

export const SIDEN_NAVBAR_KEY = Symbol('sidennavbar')

export const sidenavbarProps = {
  /**
   * @description 导航缩进宽度
   */
  offset: makeNumericProp(15),
}

export type SidenavbarProps = ExtractPropTypes<typeof sidenavbarProps>
