import type { ExtractPropTypes } from 'vue'

export const timeselectProps = {
  visible: {
    type: Boolean,
    defalut: false,
  },
  height: {
    type: [String],
    default: '20%',
  },
  title: {
    type: String,
    default: '',
  },
  currentKey: {
    type: [Number, String],
    default: 0,
  },
  currentTime: {
    type: Array,
    default: () => {
      return []
    },
  },
  muti: {
    type: [Boolean],
    default: false,
  },
  lockScroll: {
    type: [Boolean],
    default: true,
  },
}

export type TimeSelectProps = ExtractPropTypes<typeof timeselectProps>

export const timeselectEmits = {
  'update:visible': (val: boolean) => true,
  'select': (val: any) => true,

}

export type TimeSelectEmits = typeof timeselectEmits
