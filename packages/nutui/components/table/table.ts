import type { ExtractPropTypes, PropType } from 'vue'
import type { TableColumnProps } from './types'

export const tableProps = {
  bordered: {
    type: Boolean,
    default: true,
  },
  columns: {
    type: Array as PropType<TableColumnProps[]>,
    default: () => {
      return []
    },
  },
  data: {
    type: Object,
    default: () => {
      return {}
    },
  },
  summary: {
    type: Function,
    default: null,
  },
  striped: {
    type: Boolean,
    default: false,
  },
}

export type TableProps = ExtractPropTypes<typeof tableProps>

export const tableEmits = {
  sorter: (val: TableColumnProps) => true,
}

export type TableEmits = typeof tableEmits
