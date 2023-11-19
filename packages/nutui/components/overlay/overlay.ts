import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { commonProps, isBoolean, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { CLICK_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'

export const overlayProps = {
  ...commonProps,
  /**
   * @description 控制遮罩的显示/隐藏
   */
  visible: Boolean,
  /**
   * @description 自定义遮罩层级
   */
  zIndex: makeNumericProp(300),
  /**
   * @description 显示/隐藏的动画时长，单位毫秒
   */
  duration: makeNumericProp(300),
  /**
   * @description 自定义遮罩类名
   */
  overlayClass: makeStringProp(''),
  /**
   * @description 自定义遮罩样式
   */
  overlayStyle: Object as PropType<CSSProperties>,
  /**
   * @description 遮罩显示时的背景是否锁定
   */
  lockScroll: Boolean,
  /**
   * @description 点击遮罩时是否关闭
   */
  closeOnClickOverlay: truthProp,
}

export type OverlayProps = ExtractPropTypes<typeof overlayProps>

export const overlayEmits = {
  [UPDATE_VISIBLE_EVENT]: (visible: boolean) => isBoolean(visible),
  [CLICK_EVENT]: (evt: any) => evt instanceof Object,
}

export type OverlayEmits = typeof overlayEmits
