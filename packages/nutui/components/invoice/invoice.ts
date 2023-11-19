import type { ExtractPropTypes } from 'vue'
import { commonProps, isBoolean, makeArrayProp, truthProp } from '../_utils'
import type { ErrorMessage } from '../form'

export const invoiceProps = {
  ...commonProps,
  /**
   * @description 发票数据
   */
  data: makeArrayProp<any>([]),
  /**
   * @description 表单数据对象(使用表单校验时，_必填_)
   */
  formValue: {
    type: Object,
    require: true,
    default: {},
  },
  /**
   * @description 是否显示提交按钮
   */
  submit: truthProp,
}

export type InvoiceProps = ExtractPropTypes<typeof invoiceProps>

export const invoiceEmits = {
  onSubmit: (valid: boolean | object, errors: (boolean | ErrorMessage)[]) => (isBoolean(valid) || valid instanceof Object) && (isBoolean(errors) || errors instanceof Object),
  scrollBottom: () => true,
}

export type InvoiceEmits = typeof invoiceEmits
