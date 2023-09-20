import type { ExtractPropTypes, PropType } from 'vue'
import { isBoolean } from '../_utils'
import { popupProps } from '../popup/popup'
import type { TabsSize } from '../tabs/tabs'
import type { CascaderOption, CascaderValue } from './types'

export const cascaderProps = {
  ...popupProps,
  modelValue: Array,
  visible: Boolean,
  title: String,
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
  poppable: {
    type: Boolean,
    default: true,
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

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>

export const cascaderEmits = {
  'update:modelValue': (val: CascaderValue) => val,
  'change': (val: CascaderValue, val2: CascaderOption[]) => {
    return { val, val2 }
  },
  'update:visible': (val: boolean) => isBoolean(val),
  'pathChange': (val: CascaderOption[]) => val,
}

export type CascaderEmits = typeof cascaderEmits
