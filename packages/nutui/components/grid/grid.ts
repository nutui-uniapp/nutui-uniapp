import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp, truthProp } from '../_utils'

export const GRID_KEY = Symbol('grid')

export type GridDirection = 'horizontal' | 'vertical'

export const gridProps = {
  ...commonProps,
  /**
   * @description 列数
   */
  columnNum: makeNumericProp(4),

  /**
   * @description 是否显示边框
   */
  border: truthProp,

  /**
   * @description 格子之间的间距，默认单位为 `px`
   */
  gutter: makeNumericProp(0),

  /**
   * @description 是否将格子内容居中显示
   */
  center: truthProp,

  /**
   * @description 是否将格子固定为正方形
   */
  square: Boolean,

  /**
   * @description 内容翻转
   */
  reverse: Boolean,

  /**
   * @description 格子内容排列的方向，可选值为 `horizontal`
   */
  direction: makeStringProp<GridDirection>('vertical'),

  /**
   * @description 是否开启格子点击反馈
   */
  clickable: Boolean,
}

export type GridProps = ExtractPropTypes<typeof gridProps>
