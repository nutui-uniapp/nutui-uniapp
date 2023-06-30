import type { ExtractPropTypes, PropType } from 'vue'
import { isNumber, isString } from '../_utils'
import type { ElevatorData } from './type'

export const elevatorProps = {
  height: {
    type: [Number, String],
    default: '200px',
  },
  acceptKey: {
    type: [String],
    default: 'title',
  },
  indexList: {
    type: Array as PropType<ElevatorData[]>,
    default: () => {
      return []
    },
  },
  isSticky: {
    type: [Boolean],
    default: false,
  },
  spaceHeight: {
    type: [Number],
    default: 23,
  },
  titleHeight: {
    type: [Number],
    default: 35,
  },
}

export type ElevatorProps = ExtractPropTypes<typeof elevatorProps>

export const elevatorEmits = {
  clickItem: (key: string, item: any) => { return { key, item } },
  clickIndex: (key: string) => isString(key),
  change: (val: number) => isNumber(val),
}

export type ElevatorEmits = typeof elevatorEmits
