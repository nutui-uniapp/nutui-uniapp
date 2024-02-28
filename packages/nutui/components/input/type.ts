export const inputAlignType = ['left', 'center', 'right'] as const // text-align
export type InputAlignType = (typeof inputAlignType)[number]

export const inputFormatTrigger = ['onChange', 'onBlur'] as const // onChange: 在输入时执行格式化 ; onBlur: 在失焦时执行格式化
export type InputFormatTrigger = (typeof inputFormatTrigger)[number]

export const inputType
  = ['tel', 'url', 'date', 'file', 'text', 'time', 'week', 'color', 'digit', 'email', 'image', 'month', 'radio', 'range', 'reset', 'button', 'hidden', 'number', 'search', 'submit', 'checkbox', 'password', 'textarea', 'datetime-local', 'idcard', 'safe-password', 'nickname'] as const
export type InputType = (typeof inputType)[number]

export const uniInputType = ['text', 'number', 'idcard', 'digit', 'tel', 'safe-password', 'nickname'] as const
export type UniInputType = (typeof uniInputType)[number]

export interface InputRule {
  pattern?: RegExp
  message?: string
  required?: boolean
}

export const inputConfirmType = ['send', 'search', 'next', 'go', 'done'] as const
export type InputConfirmType = (typeof inputConfirmType)[number]

export interface InputTarget extends HTMLInputElement {
  composing?: boolean
}

export const inputMode = ['search', 'tel', 'url', 'text', 'email', 'none', 'decimal', 'numeric'] as const
export type InputMode = (typeof inputMode)[number]
