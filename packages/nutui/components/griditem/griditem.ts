import type { ExtractPropTypes } from 'vue'
import { CLICK_EVENT } from '../_constants'

export const gridItemProps = {
  /**
   * @description 文字
   */
  text: String,
  /**
   * @description 点击后跳转的目标路由对象，同 vue-router 的 to 属性
   */
  to: [String, Object],
  /**
   * @description 点击后跳转的链接地址
   */
  url: String,
  /**
   * @description 是否在跳转时替换当前页面历史
   */
  replace: Boolean,
}

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>

export const gridItemEmits = {
  [CLICK_EVENT]: (evt: Event) => evt instanceof Object,
}

export type GridItemEmits = typeof gridItemEmits
