import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumberProp, makeStringProp, truthProp } from '../_utils'

export const trendarrowProps = {
  ...commonProps,
  /**
   * @description 数值，大于0时箭头向上，小于0时箭头向下
   * - 类型为 `number`
   * - 默认值为 `0`
   */
  rate: makeNumberProp(0),
  /**
   * @description 小数位精度
   * - 类型为 `number`
   * - 默认值为 `2`
   */
  digits: makeNumberProp(2),
  /**
   * @description 是否显示加减号
   * - 类型为 `boolean`
   * - 默认值为 `false`
   */
  showSign: Boolean,
  /**
   * @description 是否显示 0
   * - 类型为 `boolean`
   * - 默认值为 `false`
   */
  showZero: Boolean,
  /**
   * @description 是否在数字左侧显示箭头
   * - 类型为 `boolean`
   * - 默认值为 `false`
   */
  arrowLeft: Boolean,
  /**
   * @description 文字颜色是否与箭头同步
   * - 类型为 `boolean`
   * - 默认值为 `true`
   */
  syncTextColor: truthProp,
  /**
   * @description 文字颜色
   * - 类型为 `string`
   * - 默认值为 `'#333'`
   */
  textColor: makeStringProp('#333'),
  /**
   * @description 向上箭头颜色
   * - 类型为 `string`
   * - 默认值为 `'#fa2c19'`
   */
  riseColor: makeStringProp('#fa2c19'),
  /**
   * @description 向下箭头颜色
   * - 类型为 `string`
   * - 默认值为 `'#64b578'`
   */
  dropColor: makeStringProp('#64b578'),
}

export type TrendArrowProps = ExtractPropTypes<typeof trendarrowProps>
