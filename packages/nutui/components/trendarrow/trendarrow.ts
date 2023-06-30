import type { ExtractPropTypes } from 'vue'

export const trendarrowProps = {
  rate: {
    type: Number,
    default: 0,
  },
  digits: {
    type: Number,
    default: 2,
  },
  showSign: {
    type: Boolean,
    default: false,
  },
  showZero: {
    type: Boolean,
    default: false,
  },
  arrowLeft: {
    type: Boolean,
    default: false,
  },
  syncTextColor: {
    type: Boolean,
    default: true,
  },
  textColor: {
    type: String,
    default: '#333',
  },
  riseColor: {
    type: String,
    default: '#fa2c19',
  },
  dropColor: {
    type: String,
    default: '#64b578',
  },
}

export type TrendArrowProps = ExtractPropTypes<typeof trendarrowProps>
