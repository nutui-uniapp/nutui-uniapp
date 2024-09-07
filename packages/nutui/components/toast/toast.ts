import type { ExtractPropTypes } from 'vue'
import { CLOSE_EVENT, CLOSED_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import { commonProps, isBoolean, makeNumberProp, makeNumericProp, makeStringProp } from '../_utils'
import type { ToastOptions, ToastSize, ToastType } from './types'

export const toastDefaultOptionsKey = '__TOAST_OPTIONS__'

export const toastDefaultOptions: Required<Pick<
  ToastOptions,
  'visible' | 'type' | 'msg' | 'duration' | 'size' | 'zIndex' | 'iconSize' | 'center' | 'bottom' | 'textAlignCenter' | 'loadingRotate'
>> = {
  visible: false,
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
  visible: {
    type: Boolean,
    default: toastDefaultOptions.visible,
  },
  /**
   * @description 配置注入的key
   */
  selector: String,
  /**
   * @description 弹框类型，可选值（text、success、error、warning、loading）
   */
  type: makeStringProp<ToastType>(toastDefaultOptions.type),
  /**
   * @description 标题
   */
  title: String,
  /**
   * @description 消息文本内容，支持传入HTML
   */
  msg: makeStringProp(toastDefaultOptions.msg),
  /**
   * @description 展示时长（单位：ms）
   * - 值为0时toast不会自动关闭
   * - 组合式函数用法/Ref用法中，loading类型默认为0
   */
  duration: makeNumberProp(toastDefaultOptions.duration),
  /**
   * @description 文案尺寸，可选值（small、base、large）
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
   * @description 是否显示遮罩层
   * - 组合式函数用法/Ref用法中，loading类型默认为true
   */
  cover: Boolean,
  /**
   * @description 遮罩层颜色，默认透明
   */
  coverColor: String,
  /**
   * @description 是否展示在页面中部（为false时展示在底部）
   */
  center: {
    type: Boolean,
    default: toastDefaultOptions.center,
  },
  /**
   * @description 距页面底部的距离（center为false时生效）
   */
  bottom: makeNumericProp(toastDefaultOptions.bottom),
  /**
   * @description 文案是否居中
   */
  textAlignCenter: {
    type: Boolean,
    default: toastDefaultOptions.textAlignCenter,
  },
  /**
   * @description loading图标是否旋转（仅对loading类型生效）
   */
  loadingRotate: {
    type: Boolean,
    default: toastDefaultOptions.loadingRotate,
  },
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
