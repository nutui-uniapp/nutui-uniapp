import type { FormItemRule } from '../formitem/types'

export interface FormRules {
  [key: string]: FormItemRule[]
}

export interface FormRule {
  prop: string
  rules: FormItemRule[]
}

export interface ErrorMessage {
  prop: string
  message: string
}

export interface FormInst {
  reset: () => void
  submit: () => void
  validate: (customProp?: any) => Promise<any>
}
