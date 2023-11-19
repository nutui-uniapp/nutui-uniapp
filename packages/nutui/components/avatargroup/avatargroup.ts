import type { ExtractPropTypes } from 'vue'
import type { AvatarShape, AvatarSize } from '../avatar'
import { commonProps, makeNumericProp, makeStringProp } from '../_utils'

export const AVATAR_KEY = Symbol('avatarGroup')
export const avatargroupProps = {
  ...commonProps,
  /**
   * @description 显示的最大头像个数
   */
  maxCount: makeNumericProp(''),

  /**
   * @description 头像数量超出时，会出现一个头像折叠元素，该元素内容可为`...`、`more`、`+N`
   */
  maxContent: makeStringProp(''),

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
   * @description 头像折叠元素的字体颜色
   */
  maxColor: makeStringProp('#666'),

  /**
   * @description 头像折叠元素的背景色
   */
  maxBgColor: makeStringProp('#eee'),

  /**
   * @description 头像之间的间距
   */
  span: makeStringProp('-8'),

  /**
   * @description 组合头像之间的层级方向，可选值为：`left`、`right`
   */
  zIndex: makeStringProp<'left' | 'right'>('left'),
}

export type AvatarGroupProps = ExtractPropTypes<typeof avatargroupProps>
