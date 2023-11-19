import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp } from '../_utils'

// eslint-disable-next-line ts/ban-types
export type EmptyImage = 'empty' | 'error' | 'network' | (string & {})

export const emptyProps = {
  ...commonProps,
  /**
   * @description 图片类型，可选值为 `empty`、`error`、`network`，支持传入图片 `URL`
   */
  image: makeStringProp<EmptyImage>('empty'),

  /**
   * @description 图片大小，单位为 `px`
   */
  imageSize: makeNumericProp(''),

  /**
   * @description 图片下方的描述文字
   */
  description: makeStringProp(''),
}
export type EmptyProps = ExtractPropTypes<typeof emptyProps>
