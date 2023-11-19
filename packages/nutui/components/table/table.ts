import type { ExtractPropTypes } from 'vue'
import { commonProps, makeArrayProp, makeObjectProp, truthProp } from '../_utils'
import type { TableColumnProps } from './types'

export const tableProps = {
  ...commonProps,
  /**
   * @description 是否显示边框
   */
  bordered: truthProp,
  /**
   * @description 表头数据
   */
  columns: makeArrayProp<TableColumnProps>([]),
  /**
   * @description 表格数据
   */
  data: makeObjectProp<any>({}),
  /**
   * @description 是否显示简介
   */
  summary: {
    type: Function,
    default: null,
  },
  /**
   * @description 条纹是否明暗交替
   */
  striped: Boolean,
}

export type TableProps = ExtractPropTypes<typeof tableProps>

export const tableEmits = {
  sorter: (val: TableColumnProps) => val instanceof Object,
}

export type TableEmits = typeof tableEmits
