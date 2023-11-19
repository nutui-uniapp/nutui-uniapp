import type { ExtractPropTypes } from 'vue'
import { commonProps, isString, makeArrayProp, makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { CLICK_EVENT, CLOSE_EVENT } from '../_constants'

export interface stateProps {
  wrapWidth: number
  firstRound: boolean
  duration: number
  offsetWidth: number
  showNoticebar: boolean
  animationClass: string
  animate: boolean
  scrollList: any[]
  distance: number
  timer: null
  keepAlive: boolean
  isCanScroll: null | boolean
  showNotica: boolean
  id: number
}

export const noticebarProps = {
  ...commonProps,
  /**
   * @description 滚动的方向，可选 `across`、`vertical`
   */
  direction: makeStringProp<'across' | 'vertical'>('across'),
  /**
   * @description 纵向滚动数据列表, `vertical`方向
   */
  list: makeArrayProp<string | object>([]),
  /**
   * @description 停留时间(毫秒),`vertical`方向
   */
  standTime: makeNumberProp(1000),
  /**
   * @description 稍复杂的动画，耗能会高,`vertical`方向
   */
  complexAm: Boolean,
  /**
   * @description 每一个滚动列的高度(px)，注意：在使用 slot 插槽定义滚动单元时，按照实际高度修改此值
   */
  height: makeNumberProp(40),
  /**
   * @description 提示的信息
   */
  text: makeStringProp(''),
  /**
   * @description 是否启用关闭模式
   */
  closeMode: Boolean,
  /**
   * @description 是否展示左侧图标, 滚动方向为 `across` 生效
   */
  leftIcon: truthProp,
  /**
   * @description 导航栏的文字颜色
   */
  customColor: makeStringProp(''),
  /**
   * @description 导航栏的背景颜色
   */
  background: makeStringProp(''),
  /**
   * @description 延时多少秒
   */
  delay: makeNumericProp(1),
  /**
   * @description 是否可以滚动
   */
  scrollable: truthProp,
  /**
   * @description 滚动速率 (px/s)
   */
  speed: makeNumberProp(50),
  /**
   * @description 是否开启文本换行,`scrollable` 会设置为 `false`
   */
  wrapable: Boolean,
  /**
   * @description `vertical`方向时`list`属性如果传入数组对象，显示文本的字段名
   */
  fieldName: String,
}

export type NoticeBarProps = ExtractPropTypes<typeof noticebarProps>

export const noticebarEmits = {
  [CLICK_EVENT]: (value: Event | string) => value instanceof Object || isString(value),
  [CLOSE_EVENT]: (evt: Event | string) => evt instanceof Object || isString(evt),
  acrossEnd: (evt: Event) => evt instanceof Object,

}

export type NoticeBarEmits = typeof noticebarEmits
