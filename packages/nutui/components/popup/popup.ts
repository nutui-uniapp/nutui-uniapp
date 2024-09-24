import type { ExtractPropTypes, PropType } from 'vue'
import { CLOSE_EVENT, CLOSED_EVENT, OPEN_EVENT, OPENED_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import type { Position } from '../_constants/types'
import { commonProps, makeStringProp, truthProp } from '../_utils'
import { overlayProps } from '../overlay/overlay'
import type { NutAnimationName } from '../transition/types'

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
   * @description 是否显示圆角
   */
  round: Boolean,
  /**
   * @description 是否显示关闭按钮
   */
  closeable: Boolean,
  /**
   * @description 关闭按钮图标
   */
  closeIcon: makeStringProp('close'),
  /**
   * @description 关闭按钮位置（top-left,top-right,bottom-left,bottom-right）
   */
  closeIconPosition: makeStringProp<'top-right' | 'bottom-right' | 'bottom-left' | 'top-left'>('top-right'),
  /**
   * @description 是否保留弹层关闭后的内容
   */
  destroyOnClose: truthProp,
  /**
   * @description 是否显示遮罩层
   */
  overlay: truthProp,
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

/* eslint-disable unused-imports/no-unused-vars */
export const popupEmits = {
  [UPDATE_VISIBLE_EVENT]: (value: boolean) => true,
  'click-pop': (event: any) => true,
  'click-close-icon': () => true,
  'click-overlay': () => true,
  [OPEN_EVENT]: () => true,
  [OPENED_EVENT]: () => true,
  [CLOSE_EVENT]: () => true,
  [CLOSED_EVENT]: () => true,
  /**
   * @deprecated
   */
  'opend': () => true,
}
/* eslint-enable unused-imports/no-unused-vars */

export type PopupEmits = typeof popupEmits
