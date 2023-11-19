import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, makeNumericProp, makeStringProp } from '../_utils'

export const stepsProps = {
  ...commonProps,
  /**
   * @description 显示方向，`horizontal`,`vertical`
   */
  direction: makeStringProp<'horizontal' | 'vertical'>('horizontal'),
  /**
   * @description 当前所在的步骤
   */
  current: makeNumericProp(0),
  /**
   * @description 点状步骤条
   */
  progressDot: Boolean,
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>

export const stepsEmits = {
  clickStep: (val: number) => isNumber(val),
}

export type StepsEmits = typeof stepsEmits
