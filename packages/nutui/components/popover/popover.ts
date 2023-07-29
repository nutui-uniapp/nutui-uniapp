import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { commonProps } from '../_utils'
import type { PopoverList, PopoverLocation, PopoverTheme } from './type'

export const popoverProps = {
  ...commonProps,
  visible: { type: Boolean, default: false },
  list: { type: Array as PropType<PopoverList[]>, default: [] },
  theme: { type: String as PropType<PopoverTheme>, default: 'light' },
  location: { type: String as PropType<PopoverLocation>, default: 'bottom' },
  offset: { type: Array<number>, default: [0, 12] },
  arrowOffset: { type: Number, default: 0 },
  showArrow: { type: Boolean, default: true },
  duration: { type: [Number, String], default: 200 },
  overlay: { type: Boolean, default: false },
  overlayClass: { type: String, default: '' },
  overlayStyle: { type: Object as PropType<CSSProperties> },
  closeOnClickOverlay: { type: Boolean, default: true },
  closeOnClickAction: { type: Boolean, default: true },
  closeOnClickOutside: { type: Boolean, default: true },
  targetId: { type: String },
  bgColor: { type: String, default: '' },
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export const popoverEmits = {
  'update': (val: boolean) => true,
  'update:visible': (val: boolean) => true,
  'open': () => true,
  'close': () => true,
  'choose': (item: any, index: number) => true,

}

export type PopoverEmits = typeof popoverEmits
