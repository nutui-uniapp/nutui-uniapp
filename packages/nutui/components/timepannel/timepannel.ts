import type { ExtractPropTypes } from 'vue'

export const timepannelProps = {
  name: {
    type: String,
    default: '',
  },
  pannelKey: {
    type: [Number, String],
    default: 0,
  },
}

export type TimePannelProps = ExtractPropTypes<typeof timepannelProps>

export const timepannelEmits = {
  change: (pannelKey: number | string) => true,
}

export type TimePannelEmits = typeof timepannelEmits
