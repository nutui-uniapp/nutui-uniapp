import type { ExtractPropTypes } from 'vue'
import { CLICK_EVENT, CLOSE_EVENT, CLOSED_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import { commonProps, isBoolean, makeNumberProp, makeNumericProp, makeStringProp } from '../_utils'
import type { NotifyOptions, NotifyPosition, NotifyType } from './types'

export const notifyDefaultOptionsKey = '__NOTIFY_OPTIONS__'

export const notifyDefaultOptions: Required<Pick<
  NotifyOptions,
  'visible' | 'type' | 'msg' | 'position' | 'duration' | 'zIndex'
>> = {
  visible: false,
  type: 'danger',
  msg: '',
  position: 'top',
  duration: 3000,
  zIndex: 9999,
} as const

export const notifyProps = {
  ...commonProps,
  /**
   * @description 显示与否
   */
  visible: {
    type: Boolean,
    default: notifyDefaultOptions.visible,
  },
  /**
   * @description 配置注入的key
   */
  selector: String,
  /**
   * @description 提示的信息类型，可选值为`base` `primary` `success` `danger` `warning`
   */
  type: makeStringProp<NotifyType>(notifyDefaultOptions.type),
  /**
   * @description 展示文案，支持通过`\n`换行
   */
  msg: makeStringProp(notifyDefaultOptions.msg),
  /**
   * @description 自定义位置，可选值为 `top` `bottom`
   */
  position: makeStringProp<NotifyPosition>(notifyDefaultOptions.position),
  /**
   * @description 展示时长(ms)，值为 0 时，notify 不会消失
   */
  duration: makeNumberProp(notifyDefaultOptions.duration),
  /**
   * @description 自定义类名
   */
  className: makeStringProp(''),
  /**
   * @description 组件z-index
   */
  zIndex: makeNumberProp(notifyDefaultOptions.zIndex),
  /**
   * @description 字体颜色
   */
  customColor: makeStringProp(''),
  /**
   * @description 背景颜色
   */
  background: makeStringProp(''),
  /**
   * @description 是否留出顶部安全距离（默认为状态栏高度）
   */
  safeAreaInsetTop: Boolean,
  /**
   * @description 是否留出底部安全距离（启用后通过 `safeHeight` 指定距离）
   */
  safeAreaInsetBottom: Boolean,
  /**
   * @description 自定义安全距离
   */
  safeHeight: makeNumericProp(''),
  /**
   * @description 点击时的回调函数
   */
  onClick: Function,
  /**
   * @description 关闭时的回调函数
   */
  onClose: Function,
  /**
   * @description 关闭动画完成时回调函数
   */
  onClosed: Function,
}

export type NotifyProps = ExtractPropTypes<typeof notifyProps>

export const notifyEmits = {
  [UPDATE_VISIBLE_EVENT]: (value: boolean) => isBoolean(value),
  [CLICK_EVENT]: () => true,
  [CLOSE_EVENT]: () => true,
  [CLOSED_EVENT]: () => true,
}

export type NotifyEmits = typeof notifyEmits
