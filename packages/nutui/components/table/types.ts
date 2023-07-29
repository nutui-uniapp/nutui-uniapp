import type { VNode, VNodeChild } from 'vue'

export interface TableColumnProps {
  key?: string
  title?: string
  align?: string
  stylehead?: string
  stylecolumn?: string
  sorter?: () => void
  render?: (rowData?: object, rowIndex?: number) => VNodeChild | string | VNode
}
