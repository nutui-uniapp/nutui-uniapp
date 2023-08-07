export type InputAlignType = 'left' | 'center' | 'right' // text-align
export type InputFormatTrigger = 'onChange' | 'onBlur' // onChange: 在输入时执行格式化 ; onBlur: 在失焦时执行格式化
export type InputType =
  | 'tel'
  | 'url'
  | 'date'
  | 'file'
  | 'text'
  | 'time'
  | 'week'
  | 'color'
  | 'digit'
  | 'email'
  | 'image'
  | 'month'
  | 'radio'
  | 'range'
  | 'reset'
  | 'button'
  | 'hidden'
  | 'number'
  | 'search'
  | 'submit'
  | 'checkbox'
  | 'password'
  | 'textarea'
  | 'datetime-local'
  | 'idcard'
  | 'safe-password'
  | 'text' | 'number' | 'idcard' | 'digit' | 'tel' | 'safe-password' | 'nickname'

export type UniInputType = 'text' | 'number' | 'idcard' | 'digit' | 'tel' | 'safe-password' | 'nickname'
export interface InputRule {
  pattern?: RegExp
  message?: string
  required?: boolean
}

export type ConfirmTextType = 'send' | 'search' | 'next' | 'go' | 'done'

export interface InputTarget extends HTMLInputElement {
  composing?: boolean
}

export type InputMode = 'search' | 'tel' | 'url' | 'text' | 'email' | 'none' | 'decimal' | 'numeric'
