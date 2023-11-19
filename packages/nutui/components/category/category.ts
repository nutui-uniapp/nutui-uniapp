import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, makeArrayProp, makeStringProp } from '../_utils'
import { CHANGE_EVENT } from '../_constants'

export interface CategoryType {
  catName?: string
  [key: string]: any
}

export const categoryProps = {
  ...commonProps,
  /**
   * @description 分类模式：`classify`，`text`，`custom`
   */
  type: makeStringProp<'classify' | 'text' | 'custom'>('classify'),

  /**
   * @description 左侧导航栏数据列表
   */
  category: makeArrayProp<any>([]),
}

export type CategoryProps = ExtractPropTypes<typeof categoryProps>

export const categoryEmits = {
  [CHANGE_EVENT]: (index: number) => isNumber(index),
}

export type CategoryEmits = typeof categoryEmits
