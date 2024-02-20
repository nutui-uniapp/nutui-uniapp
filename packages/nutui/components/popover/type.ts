export type PopoverTheme = 'light' | 'dark'

export interface PopoverRootPosition {
  width: number
  height: number
  left: number
  top: number
  right: number
}
export const popoverLocation
   = ['bottom', 'top', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'right-start', 'right-end'] as const
export type PopoverLocation = (typeof popoverLocation)[number]

export interface PopoverList {
  name: string
  icon?: string
  disabled?: boolean
  className?: any
  [key: PropertyKey]: any
}
