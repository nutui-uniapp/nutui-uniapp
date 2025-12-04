/**
 * PickerColumn 滚动状态机
 *
 * 状态转换图:
 * ```
 * idle ──► touching ──► scrolling ──► momentum ──► settling ──► idle
 *              │             │                          ▲
 *              │             └──────────────────────────┘
 *              └──► idle (未移动)
 * ```
 */
export type ScrollState =
  | { type: 'idle' }
  | { type: 'touching', startIndex: number }
  | { type: 'scrolling' }
  | { type: 'momentum', targetIndex: number, duration: number }
  | { type: 'settling', targetIndex: number }

export interface ScrollStateActions {
  /** 进入 idle 状态 */
  toIdle: () => void
  /** 进入 touching 状态 */
  toTouching: (startIndex: number) => void
  /** 进入 scrolling 状态 */
  toScrolling: () => void
  /** 进入 momentum 状态 */
  toMomentum: (targetIndex: number, duration: number) => void
  /** 进入 settling 状态 */
  toSettling: (targetIndex: number) => void
}

export interface PickerColumnExpose {
  /** 停止惯性滚动并提交当前值 */
  stopMomentum: () => void
  /** 当前滚动状态 */
  scrollState: ScrollState
  /** 是否处于空闲状态 */
  isIdle: boolean
  /** 当前选中索引 */
  currentIndex: number
}
