import type { PickerOption } from '../pickercolumn/types'

export type Formatter = (
  type: string,
  option: PickerOption
) => PickerOption
export type Filter = (
  columnType: string,
  options: PickerOption[]
) => PickerOption[]
