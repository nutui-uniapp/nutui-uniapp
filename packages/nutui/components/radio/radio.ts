import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp, nullableBooleanProp } from '../_utils'

export const radioProps = {
  ...commonProps,
  /**
   * @description 是否禁用选择
   */
  disabled: nullableBooleanProp,
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
  size: makeStringProp<'large' | 'normal' | 'small' | 'mini'>('normal'),
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export const RADIO_KEY = Symbol('nut-radio')
