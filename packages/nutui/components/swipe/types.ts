export const swipeDirection = ['left', 'right', ''] as const
export type SwipeDirection = (typeof swipeDirection)[number]

export const swipePosition = ['left', 'content', 'right'] as const
export type SwipePosition = (typeof swipePosition)[number]

export interface SwipeToggleEvent {
  /**
   * swipe名称
   */
  name: string
  /**
   * 滑动方向
   */
  direction: SwipeDirection
  /**
   * @deprecated 使用 `direction` 代替
   * 滑动方向
   */
  position: SwipeDirection
}

export interface SwipeInst {
  /**
   * 滑动单元格侧边栏，left 指向左滑，right 指向右滑
   * @param position
   */
  open: (direction?: SwipeDirection) => void
  /**
   * 收起单元格侧边栏
   */
  close: () => void
}
