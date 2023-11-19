import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp } from '../_utils'

export const radioProps = {
  ...commonProps,
  /**
   * @description 是否禁用选择
   */
  disabled: Boolean,
  /**
   * @description 图标尺寸
   */
  iconSize: makeNumericProp(''),
  /**
   * @description 单选框标识
   */
  label: {
    type: [String, Number, Boolean],
    default: '',
  },
  /**
   * @description 形状，可选值为 button、round
   */
  shape: makeStringProp<'round' | 'button'>('round'),
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
