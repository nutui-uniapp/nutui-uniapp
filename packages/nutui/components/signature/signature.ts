import type { ExtractPropTypes } from 'vue'
import { commonProps, isString, makeNumberProp, makeStringProp } from '../_utils'
import { CLEAR_EVENT, CONFIRM_EVENT } from '../_constants'

export const signatureProps = {
  ...commonProps,
  /**
   * @description 线条的宽度
   */
  lineWidth: makeNumberProp(2),
  /**
   * @description 绘图笔触颜色
   */
  strokeStyle: makeStringProp('#000'),
  /**
   * @description 图片格式
   */
  type: makeStringProp('png'),
  /**
   * @description 不支持Canvas情况下的展示文案
   */
  unSupportTpl: String,
}

export type SignatureProps = ExtractPropTypes<typeof signatureProps>

export const signatureEmits = {
  start: () => true,
  end: () => true,
  signing: (event: Event) => event instanceof Object,
  [CONFIRM_EVENT]: (canvas: any, filePath?: string) => canvas instanceof Object && isString(filePath),
  [CLEAR_EVENT]: () => true,
}

export type SignatureEmits = typeof signatureEmits
