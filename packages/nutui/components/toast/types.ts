export type ToastType = 'success' | 'loading' | 'fail' | 'warn' | 'text'

export interface ToastOptions {
  /**
   * @description 消息文本内容,支持传入HTML
   */
  msg?: string
  /**
   * @description 展示时长（毫秒）
   * - 值为 0 时，toast 不会自动消失（loading类型默认为0）
   */
  duration?: number
  /**
   * @description 弹框类型,可选值（text、success、fail、warn、loading）
   */
  type?: ToastType
  /**
   * @description 标题
   */
  title?: string
  /**
   * @description 图标大小
   */
  iconSize?: string | number
  /**
   * @description 自定义图标
   */
  icon?: string
  /**
   * @description 背景颜色（透明度）
   */
  bgColor?: string
  /**
   * @description 文案尺寸，`small` `base` `large` 三选一
   */
  size?: string | number
  /**
   * @description 距页面底部的距离（像素或者百分比），option.center为false时生效
   */
  bottom?: string
}

export interface ToastInst {
  showToast: {
    text(msg: string, options?: ToastOptions): void
    success(msg: string, options?: ToastOptions): void
    fail(msg: string, options?: ToastOptions): void
    warn(msg: string, options?: ToastOptions): void
    loading(msg: string, options?: ToastOptions): void
  }
  hideToast: () => void
}
