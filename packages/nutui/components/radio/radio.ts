import type { ExtractPropTypes, PropType } from 'vue'

export const radioProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  shape: {
    type: String as PropType<'round' | 'button'>,
    default: 'round', // button
  },
  label: {
    type: [String, Number, Boolean],
    default: '',
  },
  iconSize: {
    type: [String, Number],
    default: '',
  },
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
