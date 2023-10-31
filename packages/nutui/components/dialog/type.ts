import type { NutAnimationName } from '../transition'
import type { FooterDirection, TextAlign } from './dialog'

export interface DialogOptions {
  title?: string
  content?: string
  noFooter?: boolean
  noOkBtn?: boolean
  noCancelBtn?: boolean
  cancelText?: string
  okText?: string
  textAlign?: TextAlign
  footerDirection?: FooterDirection
  transition?: NutAnimationName
  closeOnClickOverlay?: boolean
  okAutoClose?: boolean
}

export interface DialogInst {
  showDialog: (options: DialogOptions) => void
  onOk: () => void
  onCancel: () => void
}
