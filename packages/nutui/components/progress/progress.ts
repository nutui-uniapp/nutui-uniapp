import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import type { ProgressSize, ProgressStatus } from './types'

export const progressProps = {
  ...commonProps,
  /**
   * @description 百分比
   */
  percentage: {
    type: [Number, String],
    default: 0,
    required: true,
  },
  /**
   * 是否需要展示百分号
   *
   * @description 是否需要展示百分号
   */
  isShowPercentage: truthProp,
  /**
   * @description 进度条背景色
   */
  strokeColor: makeStringProp(''),
  /**
   * @description 进度条宽度
   */
  strokeWidth: makeNumericProp(''),
  /**
   * @description 进度条及文字尺寸,可选值 `small` `base` `large`
   */
  size: makeStringProp<ProgressSize>('base'),
  /**
   * @description 是否显示进度条文字内容
   */
  showText: truthProp,
  /**
   * @description 进度条文字显示位置(false:外显，true:内显)
   */
  textInside: Boolean,
  /**
   * @description 进度条文字颜色设置
   */
  textColor: makeStringProp(''),
  /**
   * @description 进度条文字背景颜色设置
   */
  textBackground: makeStringProp(''),
  /**
   * @description 进度条当前状态，可选值`active(展示动画效果)` `icon(展示icon标签)`
   */
  status: makeStringProp<ProgressStatus>('text'),
}
export type ProgressProps = ExtractPropTypes<typeof progressProps>
