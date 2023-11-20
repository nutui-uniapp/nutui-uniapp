import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumberProp, makeStringProp } from '../_utils'
import { CLICK_EVENT } from '../_constants'

export const backtopProps = {
  ...commonProps,
  /**
   * @description 滚动区域的高度
   */
  height: makeStringProp('100vh'),

  /**
   * @description 距离页面底部距离
   */
  bottom: makeNumberProp(20),

  /**
   * @description 距离页面右侧距离
   */
  right: makeNumberProp(10),

  /**
   * @description 页面垂直滚动多高后出现
   */
  distance: makeNumberProp(200),

  /**
   * @description 设置组件页面层级
   */
  zIndex: makeNumberProp(10),

  /**
   * @description 自定义图标颜色
   */
  customColor: String,
}

export type BacktopProps = ExtractPropTypes<typeof backtopProps>

export const backtopEmits = {
  [CLICK_EVENT]: (evt: MouseEvent) => evt instanceof Object,
}

export type BacktopEmits = typeof backtopEmits
