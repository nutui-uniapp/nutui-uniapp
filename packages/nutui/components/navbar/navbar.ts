import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp, truthProp } from '../_utils'

export const navbarProps = {
  ...commonProps,
  /**
   * @description 图标与字体颜色
   */
  customColor: makeStringProp('#979797'),
  /**
   * @description 图标与字体大小
   */
  size: [Number, String],
  /**
   * @description 是否展示左侧箭头
   */
  leftShow: Boolean, // 左侧  是否显示返回icon
  /**
   * @description 中间文字标题
   */
  title: makeStringProp(''),
  /**
   * @description 中间标题icon
   */
  titleIcon: Boolean,
  /**
   * @description 左侧文字
   */
  leftText: makeStringProp(''),
  /**
   * @description 右侧按钮文字
   */
  desc: makeStringProp(''),
  /**
   * @description 是否固定到顶部
   */
  fixed: Boolean,
  /**
   * @description 是否开启顶部安全区适配
   */
  safeAreaInsetTop: Boolean,
  /**
   * @description 是否显示下边框
   */
  border: Boolean,
  /**
   * @description 固定在顶部时，是否在标签位置生成一个等高的占位元素
   */
  placeholder: truthProp,
  /**
   * @description 导航栏 `z-index`
   */
  zIndex: makeNumericProp(10),
}

export type NavBarProps = ExtractPropTypes<typeof navbarProps>

export const navbarEmits = {
  clickBack: () => true,
  clickTitle: () => true,
  clickIcon: () => true,
  clickRight: () => true,
  /**
   * @deprecated This function will be deprecated in future releases. Please migrate to `clickBack`
   */
  onClickBack: () => true,
  /**
   * @deprecated This function will be deprecated in future releases. Please migrate to `clickTitle`
   */
  onClickTitle: () => true,
  /**
   * @deprecated This function will be deprecated in future releases. Please migrate to `clickIcon`
   */
  onClickIcon: () => true,
  /**
   * @deprecated This function will be deprecated in future releases. Please migrate to `clickRight`
   */
  onClickRight: () => true,
}

export type NavBarEmits = typeof navbarEmits
