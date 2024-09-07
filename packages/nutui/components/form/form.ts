import { computed } from 'vue'
import type { ExtractPropTypes, Ref } from 'vue'
import { useInject } from '../_hooks'
import { commonProps, makeObjectProp, makeStringProp } from '../_utils'
import type { ErrorMessage, FormLabelPosition, FormRules, FormStarPosition } from './types'

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
  /**
   * @description 禁用表单下的所有数据录入组件
   */
  disabled: Boolean,
  /**
   * @description 表单项 label 的位置
   */
  labelPosition: makeStringProp<FormLabelPosition>('left'),
  /**
   * @description 必填表单项 label 的红色星标位置
   */
  starPosition: makeStringProp<FormStarPosition>('left'),
}

export type FormProps = ExtractPropTypes<typeof formProps>

export const formEmits = {
  validate: (msg: ErrorMessage) => msg instanceof Object,
}

export type FormEmits = typeof formEmits

export function useFormDisabled(disabled: Ref<boolean | undefined>) {
  const { parent } = useInject<{ props: { disabled: boolean } }>(FORM_KEY)

  return computed(() => {
    if (disabled.value != null)
      return disabled.value

    if (parent?.props.disabled != null)
      return parent.props.disabled

    return false
  })
}
