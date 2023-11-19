import type { ExtractPropTypes } from 'vue'
import { commonProps, makeArrayProp, makeNumberProp } from '../_utils'

export const clientHeight = uni.getSystemInfoSync().windowHeight || 667

export const listProps = {
  ...commonProps,
  /**
   * @description 列表项的高度/预估高度，支持不固定高度
   */
  height: makeNumberProp(50),
  /**
   * @description 列表数据
   */
  listData: makeArrayProp([]),
  /**
   * @description 容器高度(最大值不能超过可视区)
   */
  containerHeight: makeNumberProp(clientHeight),
}

export type ListProps = ExtractPropTypes<typeof listProps>

export const listEmits = {
  // scrollUp: (val: number) => true,
  // scrollDown: (val: number) => true,
  scrollBottom: () => true,
  scroll: () => true,
}

export type ListEmits = typeof listEmits
