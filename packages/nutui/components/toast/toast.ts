import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps, isBoolean, makeNumberProp, makeStringProp, truthProp } from '../_utils'
import { CLOSED_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import type { ToastType } from './types'

export const toastProps = {
  ...commonProps,
  /**
   * @description 消息文本内容,支持传入HTML
   */
  msg: String,
  /**
   * @description 展示时长（毫秒）
   * - 值为 0 时，toast 不会自动消失（loading类型默认为0）
   */
  duration: makeNumberProp(2000),
  /**
   * @description 是否展示在页面中部（为false时展示在底部）
   */
  center: truthProp,
  /**
   * @description 弹框类型,可选值（text、success、fail、warn、loading）
   */
  type: String as PropType<ToastType>,
  /**
   * @description 距页面底部的距离（像素或者百分比），option.center为false时生效
   */
  bottom: makeStringProp('30px'),
  /**
   * @description 文案尺寸，`small` `base` `large` 三选一
   */
  size: String as PropType<'small' | 'base' | 'large'>,
  /**
   * @description 自定义图标
   */
  icon: String,
  /**
   * @description 图标大小
   */
  iconSize: makeStringProp('20'),
  /**
   * @description 多行文案是否居中
   */
  textAlignCenter: truthProp,
  /**
   * @description loading图标是否旋转，仅对loading类型生效
   */
  loadingRotate: truthProp,
  /**
   * @description 背景颜色（透明度）
   */
  bgColor: String,
  /**
   * @description 关闭时触发的事件
   */
  onClose: Function,
  /**
   * @description 是否显示遮罩层，loading类型默认显示
   */
  cover: Boolean,
  /**
   * @description 遮罩层颜色，默认透明
   */
  coverColor: String,
  /**
   * @description 标题
   */
  title: String,
  /**
   * @description 是否在点击遮罩层后关闭提示
   */
  closeOnClickOverlay: Boolean,
  /**
   * @description 是否显示
   */
  visible: Boolean,
}

export type ToastProps = ExtractPropTypes<typeof toastProps>

export const toastEmits = {
  [UPDATE_VISIBLE_EVENT]: (visible: boolean) => isBoolean(visible),
  [CLOSED_EVENT]: () => true,
}

export type ToastEmits = typeof toastEmits
