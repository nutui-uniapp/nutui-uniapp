import type { ExtractPropTypes, PropType } from 'vue'

export const formitemProps = {
  prop: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  rules: {
    type: Array as PropType<import('./types').FormItemRule[]>,
    default: () => {
      return []
    },
  },
  required: {
    type: Boolean,
    default: false,
  },
  showErrorMessage: {
    type: Boolean,
    default: true,
  },
  showErrorLine: {
    type: Boolean,
    default: true,
  },
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  labelAlign: {
    type: String,
    default: '',
  },
  errorMessageAlign: {
    type: String,
    default: '',
  },
  bodyAlign: {
    type: String,
    default: '',
  },
}

export type FormItemProps = ExtractPropTypes<typeof formitemProps>
