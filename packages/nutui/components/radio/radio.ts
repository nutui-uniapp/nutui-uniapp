import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp } from '../_utils'

export type RadioButtonSize = 'large' | 'normal' | 'small' | 'mini'
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
  /**
   * @description 尺寸，可选值为 `large` `small` `mini` `normal`，仅在 shape 为 `button` 时生效
   */
  size: makeStringProp<RadioButtonSize>('normal'),
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
