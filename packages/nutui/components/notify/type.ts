import type { Position } from '../_constants/types'

export type NotifyType = 'primary' | 'success' | 'danger' | 'warning'

export interface NotifyOptions {
  type?: NotifyType
  msg: string
  color?: string
  background?: string
  duration?: number
  position?: Position
}

export interface NotifyInst {
  showNotify: (options: NotifyOptions) => void
  hideNotify: () => void
}
