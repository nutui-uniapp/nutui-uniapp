import type { UnwrapRef } from 'vue'
import type {
  FormItemContext,
  FormItemLabelPosition,
  FormItemRule,
  FormItemStarPosition,
  FormItemValidateResult,
} from '../formitem/type'
import type { Arrayable, FieldPath, MaybeRef, RefsObject } from '../_types'
import type { FormProps } from './form'

export type FormStarPosition = FormItemStarPosition

export type FormLabelPosition = FormItemLabelPosition

export type FormFieldPath<T> = UnwrapRef<T> extends string ? UnwrapRef<T> : FieldPath<UnwrapRef<T>>

export type FormRules<
  T extends MaybeRef<Record<string, any> | string> = string,
> = Partial<
  Record<
    FormFieldPath<T>,
    Arrayable<FormItemRule>
  >
>

export interface FormValidateResult {
  valid: boolean
  errors: FormItemValidateResult[]
}

export interface FormContext extends RefsObject<Pick<
  FormProps,
  'modelValue' | 'rules' | 'disabled' | 'starPosition' | 'labelPosition'
>> {
  insertField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  emitValidate: (result: FormItemValidateResult) => void
}

export interface FormInst<
  T extends MaybeRef<Record<string, any> | string> = string,
> {
  /**
   * @description 对整个表单或者部分字段进行校验
   * @param fields 需要校验的字段（不传表示校验整个表单）
   */
  validate: (fields?: Arrayable<FormFieldPath<T>>) => Promise<FormValidateResult>
  /**
   * @description 移除表单校验结果
   * @param fields 需要移除校验结果的字段（不传表示移除所有字段的校验结果）
   */
  clearValidate: (fields?: Arrayable<FormFieldPath<T>>) => void
}
