import type { ExtractPropTypes, RendererElement, RendererNode, VNode } from 'vue'
import { commonProps, isString, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { CHANGE_EVENT, CLICK_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export type TabsSize = 'large' | 'normal' | 'small'

export const TAB_KEY = Symbol('tabs')

export const tabsProps = {
  ...commonProps,
  /**
   * @description 绑定当前选中标签的标识符
   */
  modelValue: makeNumericProp(0),
  /**
   * @description 标签选中色
   */
  customColor: String,
  /**
   * @description 使用横纵方向,可选值`horizontal`、`vertical`
   */
  direction: makeStringProp<'horizontal' | 'vertical'>('horizontal'),
  /**
   * @description 标签栏字体尺寸大小,可选值`large` `normal` `small`
   */
  size: makeStringProp<TabsSize>('normal'),
  /**
   * @description 选中底部展示样式,可选值 `line`、`smile`
   */
  type: makeStringProp<'line' | 'card' | 'smile'>('line'),
  /**
   * @description 标签栏是否可以滚动
   */
  titleScroll: Boolean,
  /**
   * @description 是否省略过长的标题文字
   */
  ellipsis: truthProp,
  /**
   * @description 是否开启手势左右滑动切换
   */
  swipeable: Boolean,
  /**
   * @description 自动高度。设置为 true 时，nut-tabs 和 nut-tabs__content 会随着当前 nut-tab-pane 的高度而发生变化,使用此属性时必须设置nut-tabs的`pane-key`
   */
  autoHeight: Boolean,
  /**
   * @description 标签栏背景颜色
   */
  background: String,
  /**
   * @description 切换动画时长，单位 ms。0 代表无动画，此时必须设置 pane-key
   */
  animatedTime: makeNumericProp(300),
  /**
   * @description 标签间隙
   */
  titleGutter: makeNumericProp(0),
  /**
   * @description 在`uni`环境下，必须设置`name`以开启标题栏自动滚动功能。
   */
  name: String,
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export const tabsEmits = {
  [CLICK_EVENT]: (val: Title) => val instanceof Object,
  [CHANGE_EVENT]: (val: Title) => val instanceof Object,
  [UPDATE_MODEL_EVENT]: (val: string) => isString(val),
}

export type TabsEmits = typeof tabsEmits

export class Title {
  title = ''
  titleSlot?: VNode<RendererNode, RendererElement, { [key: string]: any }>
  paneKey = ''
  disabled = false
  constructor() { }
}
