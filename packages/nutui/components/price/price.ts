import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps } from '../_utils'

export type PriceSize = 'small' | 'normal' | 'large'
export type PricePosition = 'before' | 'after'

export const priceProps = {
  ...commonProps,
  price: {
    type: [Number, String],
    default: 0,
  },
  needSymbol: {
    type: Boolean,
    default: true,
  },
  symbol: {
    type: String,
    default: '&yen;',
  },
  decimalDigits: {
    type: Number,
    default: 2,
  },
  thousands: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String as PropType<PricePosition>,
    default: 'before',
  },
  size: {
    type: String as PropType<PriceSize>,
    default: 'normal',
  },
  strikeThrough: {
    type: Boolean,
    default: false,
  },
}

export type PriceProps = ExtractPropTypes<typeof priceProps>
