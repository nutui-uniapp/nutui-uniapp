import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'

export type PriceSize = 'small' | 'normal' | 'large'
export type PricePosition = 'before' | 'after'

export const priceProps = {
  ...commonProps,
  /**
   * @description 价格数量
   */
  price: makeNumericProp(0),
  /**
   * @description 是否需要加上 symbol 符号
   */
  needSymbol: truthProp,
  /**
   * @description 符号类型
   */
  symbol: makeStringProp('&yen;'),
  /**
   * @description 小数位位数
   */
  decimalDigits: makeNumberProp(2),
  /**
   * @description 是否按照千分号形式显示
   */
  thousands: Boolean,
  /**
   * @description 符号显示在价格前或者后，`before`、`after`
   */
  position: makeStringProp<PricePosition>('before'),
  /**
   * @description 价格尺寸，`small`、`normal`、`large`
   */
  size: makeStringProp<PriceSize>('normal'),
  /**
   * @description 是否展示划线价
   */
  strikeThrough: Boolean,
}

export type PriceProps = ExtractPropTypes<typeof priceProps>
