export const animationName = {
  center: 'fade',
  top: 'slide-down',
  bottom: 'slide-up',
  left: 'slide-left',
  right: 'slide-right',
}

export type Position = (keyof typeof animationName)
