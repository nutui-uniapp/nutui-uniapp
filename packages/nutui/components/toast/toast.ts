import type { ExtractPropTypes } from 'vue'
import { commonProps, isBoolean, makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { CLOSED_EVENT, CLOSE_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import type { ToastOptions, ToastSize, ToastType } from './types'

export const toastDefaultOptions: Required<Pick<
  ToastOptions,
  'type' | 'msg' | 'duration' | 'size' | 'zIndex' | 'iconSize' | 'center' | 'bottom' | 'textAlignCenter' | 'loadingRotate'
>> = {
  type: 'text',
  msg: '',
  duration: 2000,
  size: 'base',
  zIndex: 50,
  iconSize: '20px',
  center: true,
  bottom: '30px',
  textAlignCenter: true,
  loadingRotate: true,
} as const

export const toastProps = {
  ...commonProps,
  /**
   * @description 是否显示
   */
  visible: Boolean,
  /**
   * @description 弹框类型,可选值（text、success、error、warning、loading）
   */
  type: makeStringProp<ToastType>(toastDefaultOptions.type),
  /**
   * @description 标题
   */
  title: String,
  /**
   * @description 消息文本内容,支持传入HTML
   */
  msg: makeStringProp(toastDefaultOptions.msg),
  /**
   * @description 展示时长（毫秒）
   * - 值为 0 时，toast 不会自动消失（loading类型默认为0）
   */
  duration: makeNumberProp(toastDefaultOptions.duration),
  /**
   * @description 文案尺寸，`small` `base` `large` 三选一
   */
  size: makeStringProp<ToastSize>(toastDefaultOptions.size),
  /**
   * @description 组件z-index
   */
  zIndex: makeNumberProp(toastDefaultOptions.zIndex),
  /**
   * @description 自定义图标
   */
  icon: String,
  /**
   * @description 图标大小
   */
  iconSize: makeNumericProp(toastDefaultOptions.iconSize),
  /**
   * @description 背景颜色
   */
  bgColor: String,
  /**
   * @description 是否显示遮罩层，loading类型默认显示
   */
  cover: Boolean,
  /**
   * @description 遮罩层颜色，默认透明
   */
  coverColor: String,
  /**
   * @description 是否展示在页面中部（为false时展示在底部）
   */
  center: truthProp,
  /**
   * @description 距页面底部的距离（像素或者百分比），center为false时生效
   */
  bottom: makeNumericProp(toastDefaultOptions.bottom),
  /**
   * @description 多行文案是否居中
   */
  textAlignCenter: truthProp,
  /**
   * @description loading图标是否旋转，仅对loading类型生效
   */
  loadingRotate: truthProp,
  /**
   * @description 是否在点击遮罩层后关闭提示
   */
  closeOnClickOverlay: Boolean,
  /**
   * @description 关闭时触发的事件
   */
  onClose: Function,
  /**
   * @description 关闭动画完成时触发的事件
   */
  onClosed: Function,
}

export type ToastProps = ExtractPropTypes<typeof toastProps>

export const toastEmits = {
  [UPDATE_VISIBLE_EVENT]: (visible: boolean) => isBoolean(visible),
  [CLOSE_EVENT]: () => true,
  [CLOSED_EVENT]: () => true,
}

export type ToastEmits = typeof toastEmits
