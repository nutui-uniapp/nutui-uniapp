import type { ComputedRef, ExtractPropTypes, InjectionKey, Ref } from 'vue'
import { computed, inject } from 'vue'
import { commonProps, makeObjectProp, makeStringProp, truthProp } from '../_utils'
import type { OptionalBoolean, OptionalValue } from '../_types'
import type { FormItemValidateResult } from '../formitem'
import type { FormContext, FormLabelPosition, FormRules, FormStarPosition } from './types'

export const formProps = {
  ...commonProps,
  /**
   * @description 表单数据对象(使用表单校验时，_必填_)
   */
  modelValue: makeObjectProp<any>({}),
  /**
   * @description 统一配置每个 `FormItem` 的 `rules`
   */
  rules: makeObjectProp<FormRules>({}),
  /**
   * @description 禁用表单下的所有数据录入组件
   */
  disabled: Boolean,
  /**
   * @description 必填表单项 label 的红色星标位置
   */
  starPosition: makeStringProp<FormStarPosition>('left'),
  /**
   * @description 表单项 label 的位置
   */
  labelPosition: makeStringProp<FormLabelPosition>('left'),
  /**
   * 是否内置cell-group
   */
  builtinCellGroup: truthProp,
  /**
   * 是否在rules属性改变后立即触发一次验证
   */
  validateOnRuleChange: truthProp,
}

export type FormProps = ExtractPropTypes<typeof formProps>

/* eslint-disable unused-imports/no-unused-vars */
export const formEmits = {
  validate: (result: FormItemValidateResult) => true,
}
/* eslint-enable unused-imports/no-unused-vars */

export type FormEmits = typeof formEmits

export const FORM_CONTEXT_KEY: InjectionKey<FormContext> = Symbol('FORM_CONTEXT')

export function useFormContext() {
  return inject(FORM_CONTEXT_KEY, undefined)
}

export function useFormDisabled(
  context: OptionalValue<FormContext>,
  disabled: Ref<OptionalBoolean>,
): ComputedRef<boolean> {
  return computed(() => {
    if (disabled.value != null)
      return disabled.value

    if (context?.disabled.value != null)
      return context.disabled.value

    return false
  })
}
