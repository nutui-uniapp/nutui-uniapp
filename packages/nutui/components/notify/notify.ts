import type { ExtractPropTypes } from 'vue'
import { commonProps, isBoolean, makeNumberProp, makeStringProp } from '../_utils'
import type { Position } from '../_constants/types'
import { UPDATE_VISIBLE_EVENT } from '../_constants'
import type { NotifyType } from './type'

export const notifyProps = {
  ...commonProps,
  /**
   * @description 字体颜色
   */
  customColor: makeStringProp(''),
  /**
   * @description 展示文案，支持通过`\n`换行
   */
  msg: makeStringProp(''),
  /**
   * @description 展示时长(ms)，值为 0 时，notify 不会消失
   */
  duration: makeNumberProp(3000),
  /**
   * @description 自定义类名
   */
  className: makeStringProp(''),
  /**
   * @description 背景颜色
   */
  background: makeStringProp(''),
  /**
   * @description 提示的信息类型，可选值为`primary` `success` `danger` `warning`
   */
  type: makeStringProp<NotifyType>('danger'),
  /**
   * @description 显示与否
   */
  visible: Boolean,
  /**
   * @description 自定义位置，可选值为 `top` `bottom` `left` `right` `center`
   */
  position: makeStringProp<Position>('top'),
  /**
   * @description 是否留出顶部安全距离（默认为状态栏高度）
   */
  safeAreaInsetTop: Boolean,
  /**
   * @description 顶部安全高度（默认为状态栏高度）
   */
  safeHeight: Number,
  /**
   * @description 关闭时的回调函数
   */
  onClose: Function,
  /**
   * @description 点击时的回调函数
   */
  onClick: Function,
}
export type NotifyProps = ExtractPropTypes<typeof notifyProps>

export const notifyEmits = {
  [UPDATE_VISIBLE_EVENT]: (val: boolean) => isBoolean(val),
}

export type NotifyEmits = typeof notifyEmits
