import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import { inject } from 'vue'
import type { Arrayable, OptionalValue } from '../_types'
import { commonProps, makeNumericProp, makeStringProp, nullableBooleanProp, truthProp } from '../_utils'
import type { FormItemAlign, FormItemContext, FormItemLabelPosition, FormItemRule, FormItemStarPosition } from './types'

export const formitemProps = {
  ...commonProps,
  /**
   * @description 表单域 `v-model` 字段，在使用表单校验功能的情况下，该属性是必填的
   */
  prop: String,
  /**
   * @description 标签文本
   */
  label: makeStringProp(''),
  /**
   * @description 定义校验规则
   */
  rules: {
    type: [Object, Array] as PropType<Arrayable<FormItemRule>>,
    default: () => ([]),
  },
  /**
   * @description 是否显示必填字段的标签旁边的红色星号
   */
  required: nullableBooleanProp,
  /**
   * @description 必填表单项 label 的红色星标位置，优先级高于 form 中的 `star-position`
   */
  starPosition: makeStringProp<OptionalValue<FormItemStarPosition>>(undefined),
  /**
   * @description 表单项 label 的位置，优先级高于 form 中的 `label-position`
   */
  labelPosition: makeStringProp<OptionalValue<FormItemLabelPosition>>(undefined),
  /**
   * @description 表单项 `label` 宽度，默认单位为 `px`
   */
  labelWidth: makeNumericProp(''),
  /**
   * @description 表单项 `label` 对齐方式，可选值为 `center`、`right`
   */
  labelAlign: makeStringProp<FormItemAlign>('left'),
  /**
   * @description 右侧插槽对齐方式，可选值为 `center`、`right`
   */
  bodyAlign: makeStringProp<FormItemAlign>('left'),
  /**
   * @description 是否在校验不通过时在输入框下方展示错误提示
   * @type {boolean}
   * @default true
   */
  showErrorMessage: truthProp,
  /**
   * @description 错误提示文案对齐方式，可选值为 `center`、`right`
   */
  errorMessageAlign: makeStringProp<FormItemAlign>('left'),
  /**
   * @description 是否在校验不通过时标红输入框
   */
  showErrorLine: truthProp,
  /**
   * @description 是否展示右侧箭头
   */
  isLink: Boolean,
}

export type FormItemProps = ExtractPropTypes<typeof formitemProps>

export const FORM_ITEM_CONTEXT_KEY: InjectionKey<FormItemContext> = Symbol('FORM_ITEM_CONTEXT')

export function useFormItemContext() {
  return inject(FORM_ITEM_CONTEXT_KEY, undefined)
}
