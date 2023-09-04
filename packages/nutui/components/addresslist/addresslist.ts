import type { ExtractPropTypes } from 'vue'

export const addresslistProps = {
  data: {
    type: Array,
    default: [],
  },
  longPress: {
    type: Boolean,
    default: false,
  },
  swipeEdition: {
    type: Boolean,
    default: false,
  },
  showBottomButton: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Object,
    default: {},
  },
}

export type AddressListProps = ExtractPropTypes<typeof addresslistProps>

export const addresslistEmits = {
  delIcon: (val: Event, item: unknown, index: number | string) => true,
  editIcon: (val: Event, item: unknown, index: number | string) => true,
  clickItem: (val: Event, item: unknown, index: number | string) => true,
  longCopy: (val: Event, item: unknown, index: number | string) => true,
  longSet: (val: Event, item: unknown, index: number | string) => true,
  longDel: (val: Event, item: unknown, index: number | string) => true,
  swipeDel: (val: Event, item: unknown, index: number | string) => true,
  add: (val: Event) => true,

}

export type AddressListEmits = typeof addresslistEmits
