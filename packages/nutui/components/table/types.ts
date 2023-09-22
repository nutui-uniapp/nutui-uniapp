import type { VNode, VNodeChild } from 'vue'

export interface TableColumnProps {
  key?: string
  title?: string
  align?: string
  stylehead?: string
  stylecolumn?: string
  sorter?: (row1: any, row2: any) => boolean
  render?: (rowData?: object, rowIndex?: number) => VNodeChild | string | VNode
}
