import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps } from '../_utils'

export const safeareaProps = {
  ...commonProps,
  /**
   * @description 安全区的位置
   */
  position: String as PropType<'top' | 'bottom'>,
}

export type SafeAreaProps = ExtractPropTypes<typeof safeareaProps>
