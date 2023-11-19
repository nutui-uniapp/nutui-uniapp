import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp, truthProp } from '../_utils'

export type CircleProgressStrokeLinecap = 'butt' | 'round' | 'square'

export const circleprogressProps = {
  ...commonProps,
  /**
   * @description 进度百分比
   */
  progress: makeNumericProp(0),
  /**
   * @description 圆弧的宽度
   */
  strokeWidth: makeNumericProp(5),
  /**
   * @description 半径
   */
  radius: makeNumericProp(50),
  /**
   * @description 圆环进度条端点形状，可选值为 `square`、`round`、`butt`
   */
  strokeLinecap: makeStringProp<CircleProgressStrokeLinecap>('round'),
  /**
   * @description 圆环进度条颜色
   */
  customColor: { type: [String, Object], default: '#FF673E' },
  /**
   * @description 圆环轨道颜色
   */
  pathColor: makeStringProp('#d9d9d9'),
  /**
   * @description 是否顺时针展示
   */
  clockwise: truthProp,
}

export type CircleProgressProps = ExtractPropTypes<typeof circleprogressProps>
