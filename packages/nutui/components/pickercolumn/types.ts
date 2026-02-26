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

export type ScrollState =
  | { type: 'idle' }
  | { type: 'touching', startIndex: number }
  | { type: 'scrolling' }
  | { type: 'momentum', targetIndex: number, duration: number }
  | { type: 'settling', targetIndex: number }

export interface PickerColumnInst {
  /** 停止惯性滚动并提交当前值 */
  stopMomentum: () => void
  /** 当前滚动状态 */
  scrollState: ScrollState
  /** 是否处于空闲状态 */
  isIdle: boolean
  /** 当前选中索引 */
  currentIndex: number
}
