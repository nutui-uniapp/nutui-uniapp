import type { ExtractPropTypes } from 'vue'
import { commonProps, isH5, makeNumericProp, makeStringProp } from '../_utils'

export const stickyProps = {
  ...commonProps,
  /**
   * @description 吸附时的层级
   */
  zIndex: [Number, String],
  /**
   * @description 吸顶距离
   */
  offsetTop: makeNumericProp(0),
  /**
   * @description 导航栏高度，自定义导航栏时，需要传入此值
   * - H5端的导航栏属于“自定义”导航栏的范畴，因为它是非原生的，与普通元素一致
   */
  customNavHeight: makeNumericProp(isH5 ? 44 : 0),
  /**
   * @description 是否开启吸顶功能
   */
  disabled: Boolean,
  /**
   * @description 吸顶区域的背景颜色
   */
  bgColor: makeStringProp('transparent'),
  /**
   * @description 自定义标识，用于区分是哪一个组件
   */
  index: [String, Number],
}

export type StickyProps = ExtractPropTypes<typeof stickyProps>
