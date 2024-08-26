import type { PopoverLocation } from '../popover'

export interface TourStepOptions {
  target: string
  content?: string
  location?: PopoverLocation
  popoverOffset?: number[]
  arrowOffset?: number
}
