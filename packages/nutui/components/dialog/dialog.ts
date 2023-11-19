import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { popupProps } from '../popup/popup'
import { type Interceptor, commonProps, isBoolean, makeStringProp, truthProp } from '../_utils'
import { CANCEL_EVENT, CLOSED_EVENT, OPENED_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'

export type TextAlign = 'left' | 'center' | 'right' | 'top'
export type FooterDirection = 'horizontal' | 'vertical'
export const dialogProps = {
  ...popupProps,
  ...commonProps,
  /**
   * @description 点击蒙层是否关闭对话框
   */
  closeOnClickOverlay: truthProp,
  /**
   * @description 标题
   */
  title: makeStringProp(''),
  /**
   * @description 内容，支持 HTML
   */
  content: makeStringProp(''),
  /**
   * @description 是否隐藏底部按钮栏
   */
  noFooter: Boolean,
  /**
   * @description 是否隐藏确定按钮
   */
  noOkBtn: Boolean,
  /**
   * @description 是否隐藏取消按钮
   */
  noCancelBtn: Boolean,
  /**
   * @description 取消按钮文案
   */
  cancelText: makeStringProp(''),
  /**
   * @description 确定按钮文案
   */
  okText: makeStringProp(''),
  /**
   * @description 确认按钮是否默认关闭弹窗
   */
  okAutoClose: truthProp,
  /**
   * @description 取消按钮是否默认关闭弹窗
   */
  cancelAutoClose: truthProp,
  /**
   * @description 文字对齐方向，可选值同 css 的 text-align
   */
  textAlign: makeStringProp<TextAlign>('center'),
  /**
   * @description 是否在页面回退时自动关闭
   */
  closeOnPopstate: Boolean,
  /**
   * @description 使用横纵方向,可选值`horizontal`、`vertical`
   */
  footerDirection: makeStringProp<FooterDirection>('horizontal'),
  /**
   * @description 自定义类名
   */
  customClass: makeStringProp(''),
  /**
   * @description 自定义 popup 弹框样式
   */
  popStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * @description 是否在页面回退时自动关闭
   */
  beforeClose: Function as PropType<Interceptor>,
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>

export const dialogEmits = {
  update: (val: boolean) => isBoolean(val),
  [UPDATE_VISIBLE_EVENT]: (val: boolean) => isBoolean(val),
  ok: () => true,
  [CANCEL_EVENT]: () => true,
  [OPENED_EVENT]: () => true,
  [CLOSED_EVENT]: () => true,
}

export type DialogEmits = typeof dialogEmits
