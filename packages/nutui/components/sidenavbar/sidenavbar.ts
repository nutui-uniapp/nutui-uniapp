import type { ExtractPropTypes } from 'vue'

export const SIDEN_NAVBAR_KEY = Symbol('sidennavbar')

export const sidenavbarProps = {
  offset: {
    type: [String, Number],
    default: 15,
  },
}

export type SidenavbarProps = ExtractPropTypes<typeof sidenavbarProps>
