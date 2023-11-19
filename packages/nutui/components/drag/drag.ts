import type { ExtractPropTypes } from 'vue'
import { commonProps, makeStringProp } from '../_utils'

export const dragProps = {
  ...commonProps,
  /**
   * @description 是否开启自动吸边（根据 screenWidth 进行吸边）
   */
  attract: Boolean,

  /**
   * @description 拖拽元素的拖拽方向限制，'x'/'y'/'all'三选一
   */
  direction: makeStringProp<'x' | 'y' | 'all'>('all'),

  /**
   * @description 拖拽元素的拖拽边界
   */
  boundary: {
    type: Object,
    default: () => {
      return {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }
    },
  },
}

export type DragProps = ExtractPropTypes<typeof dragProps>
