export type ToastType = 'success' | 'loading' | 'fail' | 'warn' | 'text'

export interface ToastOptions {
  msg?: string
  duration?: number
  type?: ToastType
  title?: string
  iconSize?: string | number
  icon?: string
  bgColor?: string
  size?: string | number
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
