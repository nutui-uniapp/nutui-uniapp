import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { commonProps, isBoolean, isString, makeArrayProp, makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { CHOOSE_EVENT, CLOSE_EVENT, OPEN_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import type { PopoverList, PopoverLocation, PopoverTheme } from './type'

export const popoverProps = {
  ...commonProps,
  /**
   * @description 是否展示气泡弹出层
   */
  visible: Boolean,
  /**
   * @description 选项列表
   */
  list: makeArrayProp<PopoverList>([]),
  /**
   * @description 主题风格，可选值为 dark
   */
  theme: makeStringProp<PopoverTheme>('light'),
  /**
   * @description 弹出位置
   */
  location: makeStringProp<PopoverLocation>('bottom'),
  /**
   * @description 出现位置的偏移量
   */
  offset: makeArrayProp<number>([0, 12]),
  /**
   * @description 小箭头的偏移量
   */
  arrowOffset: makeNumberProp(0),
  /**
   * @description 是否显示小箭头
   */
  showArrow: truthProp,
  /**
   * @description 动画时长，单位毫秒
   */
  duration: makeNumericProp(300),
  /**
   * @description 是否显示遮罩层
   */
  overlay: Boolean,
  /**
   * @description 自定义遮罩层类名
   */
  overlayClass: makeStringProp(''),
  /**
   * @description 自定义遮罩层样式
   */
  overlayStyle: { type: Object as PropType<CSSProperties> },
  /**
   * @description 是否在点击遮罩层后关闭菜单
   */
  closeOnClickOverlay: truthProp,
  /**
   * @description 是否在点击选项后关闭
   */
  closeOnClickAction: truthProp,
  /**
   * @description 是否在点击外部元素后关闭菜单
   */
  closeOnClickOutside: truthProp,
  /**
   * @description 自定义背景色
   */
  bgColor: makeStringProp(''),
  /**
   * @description 自定义目标元素 id
   */
  targetId: makeStringProp(''),
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export const popoverEmits = {
  update: (val: boolean) => isBoolean(val),
  [UPDATE_VISIBLE_EVENT]: (val: boolean) => isBoolean(val),
  [OPEN_EVENT]: () => true,
  [CLOSE_EVENT]: () => true,
  [CHOOSE_EVENT]: (item: any, index: number) => (item instanceof Object) || isString(index),
}

export type PopoverEmits = typeof popoverEmits
