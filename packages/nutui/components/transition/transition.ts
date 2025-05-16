import type { ExtractPropTypes } from 'vue'
import { CLICK_EVENT } from '../_constants'
import { commonProps, makeNumberProp, makeStringProp } from '../_utils'
import type { NutAnimationName, NutAnimationtimingFunction } from './types'

export const transitionProps = {
  ...commonProps,
  /**
   * @description 内置动画名称，可选值为
   * `fade` `fade-up` `fade-down` `fade-left` `fade-right` `slide-up` `slide-down` `slide-left` `slide-right`
   */
  name: makeStringProp<NutAnimationName>('fade'),
  /**
   * @description 是否展示过渡动画级
   */
  show: Boolean,
  /**
   * @description 动画时长，单位为毫秒
   */
  duration: makeNumberProp(300),
  /**
   * @description 动画函数
   */
  timingFunction: makeStringProp<NutAnimationtimingFunction>('ease'),
  /**
   * @description 关闭后是否销毁内容
   */
  destroyOnClose: Boolean,
  /**
   * @description 进入动画前的类名
   */
  enterFromClass: String,
  /**
   * @description 进入动画时的类名
   */
  enterActiveClass: String,
  /**
   * @description 进入动画后的类名
   */
  enterToClass: String,
  /**
   * @description 离开动画前的类名
   */
  leaveFromClass: String,
  /**
   * @description 离开动画时的类名
   */
  leaveActiveClass: String,
  /**
   * @description 离开动画后的类名
   */
  leaveToClass: String,
}

export type TransitionProps = ExtractPropTypes<typeof transitionProps>

export const transitionEmits = {
  beforeEnter: () => true,
  enter: () => true,
  afterEnter: () => true,
  beforeLeave: () => true,
  leave: () => true,
  afterLeave: () => true,
  [CLICK_EVENT]: (evt: MouseEvent) => evt instanceof Object,
}

export type TransitionEmits = typeof transitionEmits
