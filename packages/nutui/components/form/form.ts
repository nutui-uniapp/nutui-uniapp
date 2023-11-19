import type { ExtractPropTypes } from 'vue'
import { commonProps, makeObjectProp } from '../_utils'
import type { ErrorMessage, FormRules } from './types'

export const FORM_KEY = Symbol('Form')

export const formProps = {
  ...commonProps,
  /**
   * @description 表单数据对象(使用表单校验时，_必填_)
   */
  modelValue: makeObjectProp({}),

  /**
   * @description 统一配置每个 `FormItem` 的 `rules`
   */
  rules: makeObjectProp<FormRules>({}),
}

export type FormProps = ExtractPropTypes<typeof formProps>

export const formEmits = {
  validate: (msg: ErrorMessage) => msg instanceof Object,
}

export type FormEmits = typeof formEmits
