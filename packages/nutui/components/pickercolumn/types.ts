export interface PickerOption {
  text?: string | number
  value?: string | number
  disabled?: string
  children?: PickerOption[]
  className?: string | number
  [key: PropertyKey]: any
}

export interface PickerTouchParams {
  startY: number
  endY: number
  startTime: number
  endTime: number
  lastY: number
  lastTime: number
}

export interface PickerFieldNames {
  text?: string
  value?: string
  children?: string
  className?: string
}
