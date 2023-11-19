import type { ExtractPropTypes } from 'vue'
import type { AvatarShape } from '../avatar/avatar'
import { commonProps, makeStringProp, truthProp } from '../_utils'

export const skeletonProps = {
  ...commonProps,
  /**
   * @description 是否显示骨架屏
   */
  loading: truthProp,
  /**
   * @description 每行宽度
   */
  width: makeStringProp('100px'),
  /**
   * @description 每行高度
   */
  height: makeStringProp('15px'),
  /**
   * @description 是否开启骨架屏动画
   */
  animated: Boolean,
  /**
   * @description 是否显示头像
   */
  avatar: Boolean,
  /**
   * @description 头像形状
   */
  avatarShape: makeStringProp<AvatarShape>('round'),
  /**
   * @description 头像大小
   */
  avatarSize: makeStringProp('50px'),
  /**
   * @description 标题/段落是否采用圆角风格
   */
  round: Boolean,
  /**
   * @description 设置段落行数
   */
  row: makeStringProp('1'),
  /**
   * @description 是否显示段落标题
   */
  title: truthProp,
}

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
