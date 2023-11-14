import type { Position } from '../_constants/types'

export type NotifyType = 'primary' | 'success' | 'danger' | 'warning'

export interface NotifyOptions {
  /**
   * @description 提示的信息类型，可选值为`primary` `success` `danger` `warning`
   */
  type?: NotifyType
  /**
   * @description 展示文案，支持通过`\n`换行
   */
  msg: string
  /**
   * @description 字体颜色
   */
  customColor?: string
  /**
   * @description 背景颜色
   */
  background?: string
  /**
   * @description 展示时长(ms)，值为 0 时，notify 不会消失
   */
  duration?: number
  /**
   * @description 自定义位置，可选值为 `top` `bottom` `left` `right` `center`
   */
  position?: Position
  /**
   * @description 是否留出顶部安全距离（默认为状态栏高度）
   */
  safeAreaInsetTop?: boolean
}

export interface NotifyInst {
  showNotify: (options: NotifyOptions) => void
  hideNotify: () => void
}
