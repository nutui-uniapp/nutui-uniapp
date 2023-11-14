import type { ExtractPropTypes, PropType } from 'vue'
import { overlayProps } from '../overlay/overlay'
import { commonProps, isBoolean, makeStringProp, truthProp } from '../_utils'
import type { Position } from '../_constants/types'
import type { NutAnimationName } from '../transition/types'
import { CLOSED_EVENT, CLOSE_EVENT, OPENED_EVENT, OPEN_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'

export const popupProps = {
  ...overlayProps,
  ...commonProps,
  /**
   * @description 弹出位置（top,bottom,left,right,center）
   */
  position: makeStringProp<Position>('center'),
  /**
   * @description 动画名
   */
  transition: {
    type: String as PropType<NutAnimationName>,
    default: '',
  },
  /**
   * @description 自定义弹框类名
   */
  popClass: makeStringProp(''),
  /**
   * @description 是否显示关闭按钮
   */
  closeable: Boolean,
  /**
   * @description 关闭按钮位置（top-left,top-right,bottom-left,bottom-right）
   */
  closeIconPosition: makeStringProp<'top-right' | 'bottom-right' | 'bottom-left' | 'top-left'>('top-right'),
  /**
   * @description 关闭按钮图标
   */
  closeIcon: makeStringProp('close'),
  /**
   * @description 是否保留弹层关闭后的内容
   */
  destroyOnClose: truthProp,
  /**
   * @description 是否显示遮罩层
   */
  overlay: truthProp,
  /**
   * @description 是否显示圆角
   */
  round: Boolean,
  /**
   * @description 是否开启 iPhone 系列全面屏底部安全区适配，仅当 `position` 为 `bottom` 时有效
   */
  safeAreaInsetBottom: Boolean,
  /**
   * @description 是否开启 iPhone 顶部安全区适配
   */
  safeAreaInsetTop: truthProp,
}

export type PopupProps = ExtractPropTypes<typeof popupProps>

export const popupEmits = {
  [UPDATE_VISIBLE_EVENT]: (visible: boolean) => isBoolean(visible),
  'click-pop': (evt?: any) => evt instanceof Object,
  'click-close-icon': () => true,
  [OPEN_EVENT]: () => true,
  [CLOSE_EVENT]: () => true,
  [OPENED_EVENT]: () => true,
  /**
   * @deprecated
   */
  'opend': () => true,
  [CLOSED_EVENT]: () => true,
  'click-overlay': () => true,

}

export type PopupEmits = typeof popupEmits
