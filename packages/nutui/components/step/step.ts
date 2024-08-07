import type { ExtractPropTypes } from 'vue'
import { commonProps } from '../_utils'

export const stepProps = {
  ...commonProps,
  /**
   * @description 流程步骤的标题
   */
  title: String,
  /**
   * @description 流程步骤的描述性文字(支持 html 结构)
   */
  content: String,
}

export type StepProps = ExtractPropTypes<typeof stepProps>
