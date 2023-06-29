import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps, makeNumberProp } from '../_utils'
import type { NutAnimationName, NutAnimationtimingFunction } from './types'

export const transitionProps = {
  ...commonProps,
  name: {
    type: String as PropType<NutAnimationName>,
    default: 'fade',
  },
  show: Boolean,
  duration: makeNumberProp(300),
  timingFunction: {
    type: String as PropType<NutAnimationtimingFunction>,
    default: 'ease',
  },

  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,

}

export const transitionEmits = {
  beforeEnter: () => true,
  enter: () => true,
  afterEnter: () => true,
  beforeLeave: () => true,
  leave: () => true,
  afterLeave: () => true,
  click: (evt: MouseEvent) => evt,
}

export type TransitionProps = ExtractPropTypes<typeof transitionProps>
export type TransitionEmits = typeof transitionEmits
