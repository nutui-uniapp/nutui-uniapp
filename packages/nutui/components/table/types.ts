import type { VNode, VNodeChild } from 'vue'

export interface TableColumnProps {
  /**
   * @description 列的唯一标识
   */
  key?: string
  /**
   * @description 表头标题
   */
  title?: string
  /**
   * @description 列的对齐方式，可选值`left`,`center`
   */
  align?: 'left' | 'right'
  /**
   * @description 表头样式
   */
  stylehead?: string
  /**
   * @description 表格列样式
   */
  stylecolumn?: string
  /**
   * @description 排序，可选值有 `true`,`function`, `default`, 其中 `default`表示点击之后可能会依赖接口, `function`可以返回具体的排序函数, `default`表示采用默认的排序算法
   * @param row1
   * @param row2
   * @returns
   */
  sorter?: (row1: any, row2: any) => boolean
  /**
   * @description 自定义渲染列数据，优先级高,仅支持`H5`
   * @param rowData
   * @param rowIndex
   * @returns
   */
  render?: (rowData?: object, rowIndex?: number) => VNodeChild | string | VNode
}
