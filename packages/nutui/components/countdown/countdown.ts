import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, isString, makeNumericProp, makeObjectProp, makeStringProp, truthProp } from '../_utils'
import { INPUT_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export const countdownProps = {
  ...commonProps,
  /**
   * @description 当前时间，自定义展示内容时生效
   */
  modelValue: makeObjectProp({}),
  /**
   * @description 开始时间
   */
  startTime: {
    type: [Number, String],
    validator(v: Date) {
      const dateStr = new Date(v).toString().toLowerCase()
      return dateStr !== 'invalid date'
    },
  },
  /**
   * @description 结束时间
   */
  endTime: {
    type: [Number, String],
    validator(v: Date) {
      const dateStr = new Date(v).toString().toLowerCase()
      return dateStr !== 'invalid date'
    },
  },
  /**
   * @description 是否开启毫秒级渲染
   */
  millisecond: Boolean,
  /**
   * @description 时间格式
   */
  format: makeStringProp('HH:mm:ss'),
  /**
   * @description 是否自动开始倒计时
   */
  autoStart: truthProp,
  /**
   * @description 倒计时显示时间，单位是毫秒。`auto-start` 为 `false` 时生效
   */
  time: makeNumericProp(0),
  /**
   * @description 是否暂停
   */
  paused: Boolean,
}

export const countdownEmits = {
  [INPUT_EVENT]: (val: string | {
    d: number
    h: number
    m: number
    s: number
    ms: number
  }) => val instanceof Object || isString(val),
  [UPDATE_MODEL_EVENT]: (val: string | {
    d: number
    h: number
    m: number
    s: number
    ms: number
  }) => val instanceof Object || isString(val),
  onEnd: () => true,
  onRestart: (val: number) => isNumber(val) || isString(val) || val === undefined,
  onPaused: (val: number) => isNumber(val) || isString(val) || val === undefined,
}

export type CountdownEmits = typeof countdownEmits

export interface CountdownInst {
  /**
   * @description 开始倒计时
   */
  start: () => void
  /**
   * @description 暂停倒计时
   */
  pause: () => void
  /**
   * @description 重设倒计时，若 `auto-start` 为 `true`，重设后会自动开始倒计时
   */
  reset: () => void
}

export type CountDownPropsProps = ExtractPropTypes<typeof countdownProps>
