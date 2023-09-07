import type { ExtractPropTypes, PropType, RendererElement, RendererNode, VNode } from 'vue'
import { commonProps, isString } from '../_utils'

export type TabsSize = 'large' | 'normal' | 'small'

export const TAB_KEY = Symbol('tabs')

export const tabsProps = {
  ...commonProps,
  modelValue: {
    type: [String, Number],
    default: 0,
  },
  customColor: {
    type: String,
    default: '',
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal', // vertical
  },
  size: {
    type: String as import('vue').PropType<TabsSize>,
    default: 'normal',
  },
  type: {
    type: String as PropType<'line' | 'card' | 'smile'>,
    default: 'line', // card、line、smile
  },
  titleScroll: {
    type: Boolean,
    default: false,
  },
  ellipsis: {
    type: Boolean,
    default: true,
  },
  swipeable: {
    type: Boolean,
    default: false,
  },
  autoHeight: {
    type: Boolean,
    default: false,
  },
  background: {
    type: String,
    default: '',
  },
  animatedTime: {
    type: [Number, String],
    default: 300,
  },
  titleGutter: {
    type: [Number, String],
    default: 0,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  top: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: '',
  },
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export const tabsEmits = {
  'click': (val: Title) => val,
  'change': (val: Title) => val,
  'update:modelValue': (val: string) => isString(val),
}

export type TabsEmits = typeof tabsEmits

export class Title {
  title = ''
  titleSlot?: VNode<RendererNode, RendererElement, { [key: string]: any }>
  paneKey = ''
  disabled = false
  constructor() { }
}
