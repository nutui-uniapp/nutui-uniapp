import type { PickerOption } from '../pickercolumn'

export interface PickerBaseEvent {
  selectedValue: (string | number)[]
  selectedOptions: PickerOption[]
}

export interface PickerChangeEvent extends PickerBaseEvent {
  columnIndex: number
}

export const pickerColumnsType = ['single', 'multiple', 'cascade'] as const
export type PickerColumnsType = (typeof pickerColumnsType)[number]
