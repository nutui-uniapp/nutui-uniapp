import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps } from '../_utils'

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
    type: String as PropType<'after' | 'before'>,
    default: 'before',
  },
  size: {
    type: String,
    default: 'normal',
  },
  strikeThrough: {
    type: Boolean,
    default: false,
  },
}

export type PriceProps = ExtractPropTypes<typeof priceProps>
