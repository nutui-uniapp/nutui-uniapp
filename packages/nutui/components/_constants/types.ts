import type { NutAnimationName } from '../transition'

export type Position = 'center' | 'top' | 'bottom' | 'left' | 'right'

export const animationName: Record<Position, NutAnimationName> = {
  center: 'fade',
  top: 'slide-down',
  bottom: 'slide-up',
  left: 'slide-left',
  right: 'slide-right',
}
