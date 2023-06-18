import type { ExtractPropTypes } from 'vue'

export const sidenavbaritemProps = {
  title: {
    type: String,
    default: '',
  },
  ikey: {
    type: String,
    default: '',
  },
}

export type SideNavbaritemProps = ExtractPropTypes<typeof sidenavbaritemProps>

export const sidenavbaritemEmits = {
  click: () => true,
}

export type SideNavbaritemEmits = typeof sidenavbaritemEmits
