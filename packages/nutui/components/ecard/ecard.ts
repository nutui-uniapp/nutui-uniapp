import type { ExtractPropTypes, PropType } from 'vue'

interface dataList {
  price: string | number
}
export const ecardProps = {
  chooseText: {
    type: String,
    default: '',
  },
  otherValueText: {
    type: String,
    default: '',
  },
  list: {
    type: Array as PropType<dataList[]>,
    default: () => [],
  },
  cardAmountMin: {
    type: Number,
    default: 1,
  },
  cardAmountMax: {
    type: Number,
    default: 9999,
  },
  cardBuyMin: {
    type: Number,
    default: 1,
  },
  cardBuyMax: {
    type: Number,
    default: 9999,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  placeholder: {
    type: String,
    default: '',
  },
  suffix: {
    type: String,
    default: '¥',
  },
}

export type ECardProps = ExtractPropTypes<typeof ecardProps>

export const ecardEmits = {
  'inputChange': (val: number) => true,
  'changeStep': (val1: number, val2: number | string) => true,
  'inputClick': () => true,
  'change': (item: {
    price: number | string
  }) => true,
  'update:modelValue': (val: number) => true,

}

export type ECardEmits = typeof ecardEmits
