import type { ExtractPropTypes } from 'vue'
import { commonProps, makeStringProp, truthProp } from '../_utils'

export const menuProps = {
  ...commonProps,
  /**
   * @description 选项的选中态图标颜色
   */
  activeColor: makeStringProp(''),
  /**
   * @description 是否显示遮罩
   */
  overlay: truthProp,
  /**
   * @description 是否锁定滚动
   */
  lockScroll: truthProp,
  /**
   * @description 动画时长
   */
  duration: {
    type: [Number, String],
    default: 300,
  },
  /**
   * @description 标题图标
   */
  titleIcon: String,
  /**
   * @description 是否在点击遮罩层后关闭菜单
   */
  closeOnClickOverlay: truthProp,
  /**
   * @description 展开方向
   */
  direction: makeStringProp<'down' | 'up'>('down'),
  /**
   * @description 滚动后是否固定，可设置固定位置
   */
  scrollFixed: {
    type: [Boolean, String, Number],
    default: false,
  },
  /**
   * @description 标题样式类名
   */
  titleClass: [String],
  /**
   * @description 收起的图标
   */
  upIcon: makeStringProp('rect-up'),
  /**
   * @description 展开时的图标
   */
  downIcon: makeStringProp('rect-down'),
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
