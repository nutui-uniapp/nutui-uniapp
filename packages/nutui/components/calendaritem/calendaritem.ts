import type { ExtractPropTypes } from 'vue'
import { getDay } from '../_utils'

export const calendaritemProps = {
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
    default: '',
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
  },
}

export const calendaritemEmits = {
  choose: (val: any) => val,
  close: () => true,
  update: () => true,
  select: (val: any) => val,
}

export type CalendarItemEmits = typeof calendaritemEmits

export type CalendarItemProps = ExtractPropTypes<typeof calendaritemProps>
