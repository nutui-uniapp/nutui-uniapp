import type { ExtractPropTypes } from 'vue'

export const subsidenavbarProps = {
  title: {
    type: String,
    default: '',
  },
  ikey: {
    type: [String, Number],
    default: '',
  },
  open: {
    type: Boolean,
    default: true,
  },
}

export type SubSidenavbarProps = ExtractPropTypes<typeof subsidenavbarProps>

export const subsidenavbarEmits = {
  titleClick: () => true,
}

export type SubSidenavbarEmits = typeof subsidenavbarEmits
