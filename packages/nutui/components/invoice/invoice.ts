import type { ExtractPropTypes } from 'vue'

export const invoiceProps = {
  data: {
    type: Array,
    default: () => [],
  },
  formValue: {
    type: Object,
    default: {},
  },
  submit: {
    type: Boolean,
    default: true,
  },
}

export type InvoiceProps = ExtractPropTypes<typeof invoiceProps>

export const invoiceEmits = {
  onSubmit: (valid: any, errors: any) => true,
  scrollBottom: () => true,

}

export type InvoiceEmits = typeof invoiceEmits
