import type { ExtractPropTypes } from 'vue'
import { commonProps } from '../_utils'

export const cardProps = {
  ...commonProps,
  imgUrl: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  price: {
    type: String,
    default: '',
  },
  vipPrice: {
    type: String,
    default: '',
  },
  shopDesc: {
    type: String,
    default: '',
  },
  delivery: {
    type: String,
    default: '',
  },
  shopName: {
    type: String,
    default: '',
  },
  isNeedPrice: {
    type: Boolean,
    default: true,
  },
}

export type CardProps = ExtractPropTypes<typeof cardProps>
