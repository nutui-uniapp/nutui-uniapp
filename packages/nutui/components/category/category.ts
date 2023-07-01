import type { ExtractPropTypes, PropType } from 'vue'
import { isNumber } from '../_utils'

export interface CategoryType {
  catName?: string
  [key: string]: any
}

export const categoryProps = {
  // 分类模式
  type: {
    type: String,
    default: 'classify',
  },

  // 左侧导航栏
  category: {
    type: Array as PropType<CategoryType>,
    default: () => [],
  },
}

export type CategoryProps = ExtractPropTypes<typeof categoryProps>

export const categoryEmits = {
  change: (index: number) => isNumber(index),
}

export type CategoryEmits = typeof categoryEmits
