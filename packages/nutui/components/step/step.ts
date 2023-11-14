import type { ExtractPropTypes } from 'vue'
import { isNumber } from '../_utils'

export const stepProps = {
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

export const stepEmits = {
  clickStep: (val: number) => isNumber(val),
}

export type StepEmits = typeof stepEmits
