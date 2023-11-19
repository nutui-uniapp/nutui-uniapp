import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, makeNumberProp, makeNumericProp, makeStringProp } from '../_utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export const paginationProps = {
  ...commonProps,
  /**
   * @description 当前页码
   */
  modelValue: makeNumberProp(1),
  /**
   * @description 显示模式,可选值为 `simple`
   */
  mode: makeStringProp<'simple' | 'multi'>('multi'),
  /**
   * @description 上一页按钮文字
   */
  prevText: makeStringProp(''),
  /**
   * @description 下一页按钮文字
   */
  nextText: makeStringProp(''),
  /**
   * @description 总页数
   */
  pageCount: makeNumericProp(''),
  /**
   * @description 总记录数
   */
  totalItems: makeNumericProp('0'),
  /**
   * @description 每页记录数
   */
  itemsPerPage: makeNumericProp('10'),
  /**
   * @description 显示的页码个数
   */
  showPageSize: makeNumericProp('5'),
  /**
   * @description 是否显示省略号
   */
  forceEllipses: Boolean,
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export const paginationEmits = {
  [UPDATE_MODEL_EVENT]: (val: number) => isNumber(val),
  [CHANGE_EVENT]: (val: number) => isNumber(val),
}

export type PaginationEmits = typeof paginationEmits
