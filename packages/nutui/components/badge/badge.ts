import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumberProp, makeStringProp } from '../_utils'

export const badgeProps = {
  ...commonProps,
  /**
   * @description 显示的内容
   */
  value: [String, Number],
  /**
   * @description `value` 为数值时，最大值
   */
  max: makeNumberProp(10000),

  /**
   * @description 是否为小点
   */
  dot: Boolean,

  /**
   * @description 是否为气泡形状
   * @since >v4.0.0
   */
  bubble: Boolean,

  /**
   * @description 是否隐藏
   */
  hidden: Boolean,

  /**
   * @description 上下偏移量，支持单位设置，可设置为：`5px` 等
   */
  top: makeStringProp('0'),

  /**
   * @description 左右偏移量，支持单位设置，可设置为：`5px` 等
   */
  right: makeStringProp('0'),

  /**
   * @description 徽标的 `z-index` 值
   */
  zIndex: makeNumberProp(10),

  /**
   * @description 徽标背景颜色
   */
  customColor: makeStringProp(''),
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
