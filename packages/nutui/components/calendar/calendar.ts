import type { ExtractPropTypes } from 'vue'
import { getDay, isBoolean } from '../_utils'
import { popupProps } from '../popup/popup'

export const calendarProps = {
  ...popupProps,
  type: {
    type: String,
    default: 'one',
  },
  isAutoBackFill: {
    type: Boolean,
    default: false,
  },
  toDateAnimation: {
    type: Boolean,
    default: true,
  },
  poppable: {
    type: Boolean,
    default: true,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  showSubTitle: {
    type: Boolean,
    default: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  showToday: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '',
  },
  startText: {
    type: String,
    default: '',
  },
  endText: {
    type: String,
    default: '',
  },
  defaultValue: {
    type: [String, Array],
  },
  startDate: {
    type: String,
    default: getDay(0),
  },
  endDate: {
    type: String,
    default: getDay(365),
  },
  firstDayOfWeek: {
    type: Number,
    default: 0,
    validator: (val: number) => val >= 0 && val <= 6,
  },
}

export type CalendarProps = ExtractPropTypes<typeof calendarProps>

export const calendarEmits = {
  'choose': (val: any) => val,
  'close': () => true,
  'update:visible': (val: boolean) => isBoolean(val),
  'select': (val: any) => val,
}

export type CalendarEmits = typeof calendarEmits
