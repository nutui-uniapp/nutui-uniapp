import type { NutAnimationName } from '../transition'
import type { FooterDirection, TextAlign } from './dialog'

export interface DialogOptions {
  /**
   * @description 标题
   */
  title?: string
  /**
   * @description 内容，支持 HTML
   */
  content?: string
  /**
   * @description 是否隐藏底部按钮栏
   */
  noFooter?: boolean
  /**
   * @description 是否隐藏确定按钮
   */
  noOkBtn?: boolean
  /**
   * @description 是否隐藏取消按钮
   */
  noCancelBtn?: boolean
  /**
   * @description 取消按钮文案
   */
  cancelText?: string
  /**
   * @description 确定按钮文案
   */
  okText?: string
  /**
   * @description 文字对齐方向，可选值同 css 的 text-align
   */
  textAlign?: TextAlign
  /**
   * @description 使用横纵方向 可选值 horizontal、vertical
   */
  footerDirection?: FooterDirection
  /**
   * @description 弹出动画类型
   */
  transition?: NutAnimationName
  /**
   * @description 点击蒙层是否关闭对话框
   */
  closeOnClickOverlay?: boolean
  /**
   * @description 确认按钮是否默认关闭弹窗
   */
  okAutoClose?: boolean
}

export interface DialogInst {
  /**
   * @description 弹出对话框
   */
  showDialog: (options: DialogOptions) => void
  /**
   * @description 点击确定
   */
  onOk: () => void
  /**
   * @description 点击取消
   */
  onCancel: () => void
}
