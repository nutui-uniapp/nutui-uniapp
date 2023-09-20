import type { ExtractPropTypes, PropType } from 'vue'
import type { CascaderOption, CascaderValue } from '../cascader/types'
import type { TabsSize } from '../tabs/tabs'

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
  titleSize: {
    type: String as import('vue').PropType<TabsSize>,
    default: 'normal',
  },
  titleType: {
    type: String as PropType<'line' | 'card' | 'smile'>,
    default: 'line',
  },
  titleEllipsis: {
    type: Boolean,
    default: true,
  },
  titleGutter: {
    type: [Number, String],
    default: 0,
  },
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
