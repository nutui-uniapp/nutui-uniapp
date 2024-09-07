import type { PickerBaseEvent, PickerChangeEvent } from '../picker'
import type { PickerOption } from '../pickercolumn'

export type DateLike = number | string | Date

export const datepickerType = ['date', 'time', 'year-month', 'month-day', 'datehour', 'hour-minute', 'datetime'] as const
export type DatePickerType = (typeof datepickerType)[number]

export const datepickerColumnType = ['year', 'month', 'day', 'hour', 'minute', 'seconds'] as const
export type DatePickerColumnType = (typeof datepickerColumnType)[number]

export interface DatePickerBaseEvent extends PickerBaseEvent {
  date: Date
}

export interface DatePickerChangeEvent extends DatePickerBaseEvent, PickerChangeEvent {

}

export type DatePickerFormatter = (type: DatePickerColumnType, option: PickerOption) => PickerOption

export type DatePickerFilter = (type: DatePickerColumnType, options: PickerOption[]) => PickerOption[]

export interface DatePickerRangeItem {
  type: DatePickerColumnType
  range: [number, number]
}
