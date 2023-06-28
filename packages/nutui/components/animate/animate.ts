import type { ExtractPropTypes, PropType } from 'vue'
import type { AnimateAction, AnimateType } from './type'

export const animateProps = {
  type: {
    type: String as PropType<AnimateType>,
    default: '',
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
  },
}

export type AnimateProps = ExtractPropTypes<typeof animateProps>

export const animateEmits = {
  click: (evt: Event) => evt,
}

export type AnimateEmits = typeof animateEmits
