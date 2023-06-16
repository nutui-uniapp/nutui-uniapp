import type { ExtractPropTypes, PropType } from 'vue'
import { isBoolean } from '../_utils'

export const fixednavProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  navList: {
    default: () => [],
    type: Array as PropType<any[]>,
  },
  activeColor: {
    default: '',
    type: String,
  },
  activeText: {
    default: '',
    type: String,
  },
  unActiveText: {
    default: '',
    type: String,
  },
  position: {
    default: () => {
      return {
        top: 'auto',
        bottom: 'auto',
      }
    },
    type: Object,
  },
  type: {
    default: 'right',
    type: String,
  },
}

export type FixednavProps = ExtractPropTypes<typeof fixednavProps>

export const fixednavEmits = {
  'update:visible': (val: boolean) => isBoolean(val),
  'selected': (val: { item: any; event: Event }) => {
    return val
  },
}

export type FixednavEmits = typeof fixednavEmits
