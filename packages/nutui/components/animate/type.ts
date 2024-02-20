export const animateType = ['shake', 'ripple', 'breath', 'float', 'slide-right', 'slide-left', 'slide-top', 'slide-bottom', 'jump', 'twinkle', 'flicker'] as const
export type AnimateType = (typeof animateType)[number]
export const animateAction = ['initial', 'click', ''] as const
export type AnimateAction = (typeof animateAction)[number]
