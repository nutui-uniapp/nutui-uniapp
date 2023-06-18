import type { ExtractPropTypes, PropType } from 'vue'
import { isNumber } from '../_utils'

export const paginationProps = {
  modelValue: {
    type: Number,
    default: 1,
  },
  mode: {
    type: String as PropType<'simple' | 'multi'>,
    default: 'multi',
  },
  prevText: {
    type: String,
    default: '',
  },
  nextText: {
    type: String,
    default: '',
  },
  pageCount: {
    type: [String, Number],
    default: '',
  },
  totalItems: {
    type: [String, Number],
    default: '0',
  },
  itemsPerPage: {
    type: [String, Number],
    default: '10',
  },
  showPageSize: {
    type: [String, Number],
    default: '5',
  },
  forceEllipses: {
    type: Boolean,
    default: false,
  },
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export const paginationEmits = {
  'update:modelValue': (val: number) => isNumber(val),
  'change': (val: number) => isNumber(val),
}

export type PaginationEmits = typeof paginationEmits
