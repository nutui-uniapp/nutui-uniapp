import type { ExtractPropTypes } from 'vue'
import type { AvatarShape } from '../avatar/avatar'

export const skeletonProps = {
  // 每行宽度
  width: {
    type: String,
    default: '100px',
  },
  // 每行高度
  height: {
    type: String,
    default: '15px',
  },
  // 是否显示动画
  animated: {
    type: Boolean,
    default: false,
  },
  // 头像
  avatar: {
    type: Boolean,
    default: false,
  },
  // 头像形状：正方形/圆形
  avatarShape: {
    type: String as import('vue').PropType<AvatarShape>,
    default: 'round',
  },
  // 头像大小
  avatarSize: {
    type: String,
    default: '50px',
  },
  // 是否显示骨架屏
  loading: {
    type: Boolean,
    default: true,
  },
  // 标题/段落 圆角风格
  round: {
    type: Boolean,
    default: false,
  },

  // 显示段落行数
  row: {
    type: String,
    default: '1',
  },

  // 是否显示段落标题
  title: {
    type: Boolean,
    default: true,
  },
}

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
