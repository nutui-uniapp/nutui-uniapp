import type { ExtractPropTypes } from 'vue'
import { commonProps, isString, makeArrayProp } from '../_utils'
import { CLICK_EVENT } from '../_constants'
import type { SwipePosition, SwipeToggleEvent } from './type'

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
  /**
   * @description 点击自动关闭的部分
   */
  closeOnClick: makeArrayProp<SwipePosition>(['left', 'content', 'right']),
}

export type SwipeProps = ExtractPropTypes<typeof swipeProps>

export const swipeEmits = {
  open: (event: SwipeToggleEvent) => event instanceof Object,
  close: (event: SwipeToggleEvent) => event instanceof Object,
  [CLICK_EVENT]: (val: string) => isString(val),
}

export type SwipeEmits = typeof swipeEmits
