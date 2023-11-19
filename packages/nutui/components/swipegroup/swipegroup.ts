import type { ExtractPropTypes } from 'vue'
import { commonProps } from '../_utils'

export const swipegroupProps = {
  ...commonProps,
  /**
   * @description 控制内部 Swipe 互斥，即滑动打开某一个 Swipe 时，触发其余 Swipe 的 close 方法
   */
  lock: Boolean,
}

export type SwipeGroupProps = ExtractPropTypes<typeof swipegroupProps>
