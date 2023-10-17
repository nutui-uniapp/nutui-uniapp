import type { ExtractPropTypes } from 'vue'
import { commonProps, isH5 } from '../_utils'

export const stickyProps = {
  ...commonProps,
  zIndex: {
    type: [Number, String],
    default: '',
  },
  offsetTop: {
    type: [Number, String],
    default: 0,
  },
  customNavHeight: {
    type: [String, Number],
    // H5端的导航栏属于“自定义”导航栏的范畴，因为它是非原生的，与普通元素一致
    default: isH5 ? 44 : 0,
  },
  // 是否开启吸顶功能
  disabled: {
    type: Boolean,
    default: false,
  },
  // 吸顶区域的背景颜色
  bgColor: {
    type: String,
    default: 'transparent',
  },
  // 列表中的索引值
  index: {
    type: [String, Number],
    default: '',
  },
}

export type StickyProps = ExtractPropTypes<typeof stickyProps>
