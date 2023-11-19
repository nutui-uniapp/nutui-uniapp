import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp } from '../_utils'
import { CLICK_EVENT } from '../_constants'
import type { AnimateAction, AnimateType } from './type'

export const animateProps = {
  ...commonProps,
  /**
   * @description 控制动画，当值从 false 变为 true 时会触发一次动画
   */
  show: Boolean,

  /**
   * @description 动画类型
   * @values 'fade', 'slide', 'zoom', ...
   */
  type: makeStringProp<AnimateType | ''>(''),

  /**
   * @description 是否循环执行。`true`-循环执行; `false`-执行一次
   */
  loop: Boolean,

  /**
   * @description 动画时长，单位 ms
   */
  duration: makeNumericProp(500),

  /**
   * @description （不能与 show 同时使用）触发方式，`initial`-初始化执行; `click`-点击执行
   * @values 'initial', 'click'
   * @default initial
   */
  action: makeStringProp<AnimateAction>('initial'),
}

export type AnimateProps = ExtractPropTypes<typeof animateProps>

export const animateEmits = {
  [CLICK_EVENT]: (evt: MouseEvent) => evt instanceof Object,
  animate: () => true,
}

export type AnimateEmits = typeof animateEmits
