import type { ExtractPropTypes } from 'vue'
import type { CascaderOption, CascaderValue } from '../cascader/types'

export const cascaderitemProps = {
  visible: Boolean,
  modelValue: Array,
  options: {
    type: Array,
    default: () => [],
  },
  lazy: Boolean,
  lazyLoad: Function,
  valueKey: {
    type: String,
    default: 'value',
  },
  textKey: {
    type: String,
    default: 'text',
  },
  childrenKey: {
    type: String,
    default: 'children',
  },
  convertConfig: Object,
}

export type CascaderItemProps = ExtractPropTypes<typeof cascaderitemProps>

export const cascaderitemEmits = {
  'update:modelValue': (val: CascaderValue, val2?: CascaderOption[]) => {
    return {
      val,
      val2,
    }
  },
  'change': (val: CascaderValue, val2: CascaderOption[]) => {
    return { val, val2 }
  },
  'pathChange': (val: CascaderOption[]) => val,
}

export type CascaderItemEmits = typeof cascaderitemEmits
