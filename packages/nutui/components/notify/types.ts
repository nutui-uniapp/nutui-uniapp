export const notifyPosition = ['top', 'bottom'] as const
export type NotifyPosition = (typeof notifyPosition)[number]

export const notifyType = ['base', 'primary', 'success', 'danger', 'warning', 'custom'] as const
export type NotifyType = (typeof notifyType)[number]

export interface NotifyOptions {
  /**
   * @description 显示与否
   */
  visible?: boolean
  /**
   * @description 提示的信息类型，可选值为`base` `primary` `success` `danger` `warning`
   */
  type?: NotifyType
  /**
   * @description 展示文案，支持通过`\n`换行
   */
  msg?: string
  /**
   * @description 自定义位置，可选值为 `top` `bottom`
   */
  position?: NotifyPosition
  /**
   * @description 展示时长(ms)，值为 0 时，notify 不会消失
   */
  duration?: number
  /**
   * @description 自定义类名
   */
  className?: string
  /**
   * @description 组件z-index
   */
  zIndex?: number
  /**
   * @description 字体颜色
   */
  customColor?: string
  /**
   * @description 背景颜色
   */
  background?: string
  /**
   * @description 是否留出顶部安全距离（默认为状态栏高度）
   */
  safeAreaInsetTop?: boolean
  /**
   * @description 是否留出底部安全距离（启用后通过 `safeHeight` 指定距离）
   */
  safeAreaInsetBottom?: boolean
  /**
   * @description 自定义安全距离
   */
  safeHeight?: number | string
  /**
   * @description 点击时的回调函数
   */
  // eslint-disable-next-line ts/no-unsafe-function-type
  onClick?: Function
  /**
   * @description 关闭时的回调函数
   */
  // eslint-disable-next-line ts/no-unsafe-function-type
  onClose?: Function
  /**
   * @description 关闭动画完成时回调函数
   */
  // eslint-disable-next-line ts/no-unsafe-function-type
  onClosed?: Function
}

export interface NotifyInst {
  /**
   * @deprecated 使用`show`、`primary`、`success`、`danger`、`warning`代替
   * @description 显示通知
   */
  showNotify: (options: NotifyOptions) => void
  /**
   * @deprecated 使用`hide`代替
   * @description 隐藏通知
   */
  hideNotify: () => void

  /**
   * @description 显示通知
   */
  show: (type: NotifyType, msg: string, options?: NotifyOptions) => void
  /**
   * @description 主要通知
   */
  primary: (msg: string, options?: NotifyOptions) => void
  /**
   * @description 成功通知
   */
  success: (msg: string, options?: NotifyOptions) => void
  /**
   * @description 危险通知
   */
  danger: (msg: string, options?: NotifyOptions) => void
  /**
   * @description 警告通知
   */
  warning: (msg: string, options?: NotifyOptions) => void
  /**
   * @description 自定义通知
   */
  custom: (msg: string, options?: NotifyOptions) => void
  /**
   * @description 隐藏通知
   */
  hide: () => void
}
