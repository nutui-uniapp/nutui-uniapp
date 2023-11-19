import type { ExtractPropTypes } from 'vue'
import { commonProps, isString } from '../_utils'
import { CLICK_EVENT } from '../_constants'

export const swipeProps = {
  ...commonProps,
  /**
   * @description 唯一标识
   */
  name: String,
  /**
   * @description 是否阻止滑动事件冒泡
   */
  touchMoveStopPropagation: Boolean,
  /**
   * @description 是否阻止滑动事件行为
   */
  touchMovePreventDefault: Boolean,
  /**
   * @description 是否禁用滑动
   */
  disabled: Boolean,
}

export type SwipeProps = ExtractPropTypes<typeof swipeProps>

export type SwipePosition = 'left' | 'right' | ''

export const swipeEmits = {
  open: (info: { name: string; position: SwipePosition }) => info instanceof Object,
  close: (info: { name: string; position: SwipePosition }) => info instanceof Object,
  [CLICK_EVENT]: (val: string) => isString(val),
}

export type SwipeEmits = typeof swipeEmits

export interface SwipeInts {
  /**
   * 滑动单元格侧边栏，left 指向左滑，right 指向右滑
   * @param position
   */
  open: (position?: SwipePosition) => void
  /**
   * 收起单元格侧边栏，同上
   */
  close: () => void
}
