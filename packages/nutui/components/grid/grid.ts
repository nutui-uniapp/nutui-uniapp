import type { ExtractPropTypes } from 'vue'

export const GRID_KEY = Symbol('grid')

export type GridDirection = 'horizontal' | 'vertical'

export const gridProps = {
  // 列数
  columnNum: {
    type: [Number, String],
    default: 4,
  },
  // 是否显示边框
  border: {
    type: Boolean,
    default: true,
  },
  // 格子之间间隔距离
  gutter: {
    type: [Number, String],
    default: 0,
  },
  // 是否内容居中
  center: {
    type: Boolean,
    default: true,
  },
  // 是否固定正方形
  square: {
    type: Boolean,
    default: false,
  },
  // 内容与文字翻转
  reverse: {
    type: Boolean,
    default: false,
  },
  // 内容排列方向
  direction: {
    type: String as import('vue').PropType<GridDirection>,
  },
  // 是否开启点击反馈
  clickable: {
    type: Boolean,
    default: false,
  },
}

export type GridProps = ExtractPropTypes<typeof gridProps>
