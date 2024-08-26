export const toastType = ['text', 'success', 'error', 'warning', 'loading'] as const
export type ToastType = (typeof toastType)[number]

export const toastSize = ['small', 'base', 'large'] as const
export type ToastSize = (typeof toastSize)[number]

export interface ToastOptions {
  /**
   * @description 是否显示
   */
  visible?: boolean
  /**
   * @description 弹框类型，可选值（text、success、error、warning、loading）
   */
  type?: ToastType
  /**
   * @description 标题
   */
  title?: string
  /**
   * @description 消息文本内容，支持传入HTML
   */
  msg?: string
  /**
   * @description 展示时长（单位：ms）
   * - 值为0时toast不会自动关闭
   * - 组合式函数用法/Ref用法中，loading类型默认为0
   */
  duration?: number
  /**
   * @description 文案尺寸，可选值（small、base、large）
   */
  size?: ToastSize
  /**
   * @description 组件z-index
   */
  zIndex?: number
  /**
   * @description 自定义图标
   */
  icon?: string
  /**
   * @description 图标大小
   */
  iconSize?: string | number
  /**
   * @description 背景颜色
   */
  bgColor?: string
  /**
   * @description 是否显示遮罩层
   * - 组合式函数用法/Ref用法中，loading类型默认为true
   */
  cover?: boolean
  /**
   * @description 遮罩层颜色，默认透明
   */
  coverColor?: string
  /**
   * @description 是否展示在页面中部（为false时展示在底部）
   */
  center?: boolean
  /**
   * @description 距页面底部的距离（center为false时生效）
   */
  bottom?: string | number
  /**
   * @description 文案是否居中
   */
  textAlignCenter?: boolean
  /**
   * @description loading图标是否旋转（仅对loading类型生效）
   */
  loadingRotate?: boolean
  /**
   * @description 是否在点击遮罩层后关闭提示
   */
  closeOnClickOverlay?: boolean
  /**
   * @description 关闭时触发的事件
   */
  // eslint-disable-next-line ts/no-unsafe-function-type
  onClose?: Function
  /**
   * @description 关闭动画完成时触发的事件
   */
  // eslint-disable-next-line ts/no-unsafe-function-type
  onClosed?: Function
}

export interface ToastInst {
  /**
   * @deprecated 使用`text`、`success`、`error`、`warning`、`loading`代替
   * @description 显示提示
   */
  showToast: {
    text: (msg: string, options?: ToastOptions) => void
    success: (msg: string, options?: ToastOptions) => void
    fail: (msg: string, options?: ToastOptions) => void
    warn: (msg: string, options?: ToastOptions) => void
    loading: (msg: string, options?: ToastOptions) => void
  }
  /**
   * @deprecated 使用`hide`代替
   * @description 隐藏提示
   */
  hideToast: () => void

  /**
   * @description 文字提示
   */
  text: (msg: string, options?: ToastOptions) => void
  /**
   * @description 成功提示
   */
  success: (msg: string, options?: ToastOptions) => void
  /**
   * @description 错误提示
   */
  error: (msg: string, options?: ToastOptions) => void
  /**
   * @description 警告提示
   */
  warning: (msg: string, options?: ToastOptions) => void
  /**
   * @description 加载提示
   */
  loading: (msg: string, options?: ToastOptions) => void
  /**
   * @description 隐藏提示
   */
  hide: () => void
}
