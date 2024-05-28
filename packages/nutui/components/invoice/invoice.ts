import type { ExtractPropTypes } from 'vue'
import { commonProps, makeArrayProp, truthProp } from '../_utils'
import type { FormItemValidateResult } from '../formitem'

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

/* eslint-disable unused-imports/no-unused-vars */
export const invoiceEmits = {
  onSubmit: (valid: boolean, errors: FormItemValidateResult[]) => true,
  scrollBottom: () => true,
}
/* eslint-enable unused-imports/no-unused-vars */

export type InvoiceEmits = typeof invoiceEmits
