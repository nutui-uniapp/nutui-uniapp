export const buttonType = ['default', 'primary', 'info', 'success', 'warning', 'danger'] as const
export type ButtonType = (typeof buttonType)[number]
export const buttonSize = ['large', 'normal', 'small', 'mini'] as const
export type ButtonSize = (typeof buttonSize)[number]
export const buttonShape = ['square', 'round'] as const
export type ButtonShape = (typeof buttonShape)[number]
export const buttonFormType = ['button', 'submit', 'reset'] as const
export type ButtonFormType = (typeof buttonFormType)[number]
