import type { PickerOption } from '../pickercolumn'
import type { PickerChangeEvent } from '../picker'

export type DateLike = number | string | Date

export const datepickerType = ['date', 'time', 'year-month', 'month-day', 'datehour', 'hour-minute', 'datetime'] as const
export type DatePickerType = (typeof datepickerType)[number]

export const datepickerColumnType = ['year', 'month', 'day', 'hour', 'minute', 'seconds'] as const
export type DatePickerColumnType = (typeof datepickerColumnType)[number]

export interface DatePickerChangeEvent extends PickerChangeEvent {
  date: Date
}

export type DatePickerFormatter = (type: string, option: PickerOption) => PickerOption

export type DatePickerFilter = (columnType: string, options: PickerOption[]) => PickerOption[]

export interface DatePickerRangeItem {
  type: DatePickerColumnType
  range: [number, number]
}
