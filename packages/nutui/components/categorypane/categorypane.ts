import type { ExtractPropTypes, PropType } from 'vue'

export interface ChildType {
  catName?: string
  catType?: number
  [key: string]: any
}
export interface CustomType {
  catName?: string
  [key: string]: any
}
export const categorypaneProps = {
  // 分类模式
  type: {
    type: String,
    default: 'classify',
  },

  // 右侧导航数据
  categoryChild: {
    type: Array as PropType<ChildType>,
    default: () => [],
  },

  // 模式传入自定义数据
  customCategory: {
    type: Array as PropType<CustomType>,
    default: () => [],
  },
}

export type CategoryPaneProps = ExtractPropTypes<typeof categorypaneProps>

export const categorypaneEmits = {
  onChange: (sku: string) => true,
}

export type CategoryPaneEmits = typeof categorypaneEmits
