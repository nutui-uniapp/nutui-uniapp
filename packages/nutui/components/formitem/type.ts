import type { Ref } from 'vue'
import type { Arrayable, Awaitable, NullableValue, OptionalString, OptionalValue } from '../_types'

export const formItemStarPosition = ['left', 'right'] as const
export type FormItemStarPosition = (typeof formItemStarPosition)[number]

export const formItemLabelPosition = ['left', 'right', 'top'] as const
export type FormItemLabelPosition = (typeof formItemLabelPosition)[number]

export const formItemAlign = ['left', 'center', 'right'] as const
export type FormItemAlign = (typeof formItemAlign)[number]

export const formItemRuleTrigger = ['blur', 'change'] as const
export type FormItemRuleTrigger = (typeof formItemRuleTrigger)[number]

export type FormItemRuleTriggers = { [key in FormItemRuleTrigger]: boolean }

export class FormItemRuleWithoutValidator {
  required?: boolean
  regex?: RegExp
  min?: number
  max?: number
  minlen?: number
  maxlen?: number
  message?: string
  trigger?: Arrayable<FormItemRuleTrigger>
}

export interface FormItemRule extends FormItemRuleWithoutValidator {
  validator?: (value: any, rule: FormItemRuleWithoutValidator) => Awaitable<OptionalValue<boolean | string>>
}

export interface FormItemValidateResult {
  valid: boolean
  prop?: string
  value?: any
  message?: string
}

export interface FormItemContext {
  prop: Ref<OptionalString>
  triggers: Ref<FormItemRuleTriggers>
  validate: (trigger?: FormItemRuleTrigger) => Promise<FormItemValidateResult>
  clearValidate: () => void
}

export interface FormItemInst {
  validate: (trigger?: FormItemRuleTrigger) => Promise<FormItemValidateResult>
  clearValidate: () => void
}
