export const inputAlignType = ['left', 'center', 'right'] as const // text-align
export type InputAlignType = (typeof inputAlignType)[number]

export const inputFormatTrigger = ['onChange', 'onBlur'] as const // onChange: 在输入时执行格式化 ; onBlur: 在失焦时执行格式化
export type InputFormatTrigger = (typeof inputFormatTrigger)[number]

export const inputType
  = ['text', 'number', 'idcard', 'digit', 'tel', 'safe-password', 'nickname', 'button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'time', 'url', 'week'] as const
export type InputType = (typeof inputType)[number]

export const inputMode = ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'] as const
export type InputMode = (typeof inputMode)[number]

export const inputConfirmType = ['send', 'search', 'next', 'go', 'done'] as const
export type InputConfirmType = (typeof inputConfirmType)[number]

export interface InputTarget extends HTMLInputElement {
  composing?: boolean
}
