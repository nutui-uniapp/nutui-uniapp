import type { ExtractPropTypes } from 'vue'
import { commonProps } from '../_utils'

export const navbarProps = {
  ...commonProps,
  customColor: {
    type: String,
    default: '#979797',
  },
  size: {
    type: [Number, String],
  },
  leftShow: { type: Boolean, default: false }, // 左侧  是否显示返回icon
  title: { type: String, default: '' }, // 中间  文字标题
  titleIcon: { type: Boolean, default: false }, // 中间  标题icon
  leftText: { type: String, default: '' }, // 左侧文字
  desc: { type: String, default: '' }, // 右侧   按钮文字
  fixed: {
    type: Boolean,
    default: false,
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    // 生成一个等高的占位元素
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: [Number, String],
    default: 10,
  },
}

export type NavBarProps = ExtractPropTypes<typeof navbarProps>

export const navbarEmits = {
  clickBack: () => true,
  clickTitle: () => true,
  clickIcon: () => true,
  clickRight: () => true,
  /**
   * will be deprecated
   */
  onClickBack: () => true,
  onClickTitle: () => true,
  onClickIcon: () => true,
  onClickRight: () => true,
}

export type NavBarEmits = typeof navbarEmits
