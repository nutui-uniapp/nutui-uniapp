import type { ExtractPropTypes } from 'vue'
import { commonProps, isBoolean, makeArrayProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { SELECT_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'

export const timeselectProps = {
  ...commonProps,
  /**
   * @description 是否显示弹层
   */
  visible: Boolean,
  /**
   * @description 弹层的高度
   */
  height: makeStringProp('20%'),
  /**
   * @description 弹层标题
   */
  title: String,
  /**
   * @description 唯一标识
   */
  currentKey: makeNumericProp(0),
  /**
   * @description 当前选择的时间，数组元素包含:key: string; list: string[]
   */
  currentTime: makeArrayProp<{ key: string; list: string[] }>([]),
  /**
   * @description 背景是否锁定
   */
  lockScroll: truthProp,
  muti: Boolean,
}

export type TimeSelectProps = ExtractPropTypes<typeof timeselectProps>

export const timeselectEmits = {
  [UPDATE_VISIBLE_EVENT]: (val: boolean) => isBoolean(val),
  [SELECT_EVENT]: (val: any) => val instanceof Object,

}

export type TimeSelectEmits = typeof timeselectEmits
