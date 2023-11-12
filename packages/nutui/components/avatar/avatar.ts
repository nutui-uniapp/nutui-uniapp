import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp } from '../_utils'

export type AvatarSize = 'large' | 'normal' | 'small'
export type AvatarShape = 'round' | 'square'

export const avatarProps = {
  ...commonProps,
  /**
   * @description 头像的大小，可选值为：`large`、`normal`、`small`，支持直接输入数字
   */
  // eslint-disable-next-line ts/ban-types
  size: makeNumericProp<AvatarSize | (string & {}) | (number & {})>('normal'),
  /**
   * @description 头像的形状，可选值为：`square`、`round`
   */
  shape: makeStringProp<AvatarShape>('round'),
  /**
   * @description 背景色
   */
  bgColor: makeStringProp('#eee'),
  /**
   * @description 字体颜色
   */
  customColor: makeStringProp('#666'),
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
