import type { ExtractPropTypes, PropType } from 'vue'
import type { AnimateAction, AnimateType } from './type'

export const animateProps = {
  type: {
    type: String as PropType<AnimateType>,
    default: '',
  },
  show: {
    type: Boolean,
    default: false,
  },
  action: {
    type: String as PropType<AnimateAction>,
    default: 'initial',
  },
  loop: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: [String, Number],
    default: 500,
  },
}

export type AnimateProps = ExtractPropTypes<typeof animateProps>

export const animateEmits = {
  click: (evt: Event) => evt,
  animate: () => true,
}

export type AnimateEmits = typeof animateEmits
