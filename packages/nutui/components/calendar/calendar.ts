import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps, getDay, isBoolean, isString, makeNumberProp, makeStringProp, truthProp } from '../_utils'
import { popupProps } from '../popup/popup'
import { CHOOSE_EVENT, CLOSE_EVENT, SELECT_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'

export const calendarProps = {
  ...popupProps,
  ...commonProps,
  /**
   * @description 是否可见
   */
  visible: Boolean,

  /**
   * @description 类型，日期单选 `one`，区间选择 `range`，日期多选 `multiple`，周选择 `week`
   */
  type: makeStringProp<'one' | 'range' | 'multiple' | 'week'>('one'),

  /**
   * @description 是否弹窗状态展示
   */
  poppable: truthProp,

  /**
   * @description 自动回填
   */
  isAutoBackFill: Boolean,

  /**
   * @description 显示标题
   */
  title: makeStringProp('日期选择'),

  /**
   * @description 默认值，单个日期选择为 `string`，其他为 `string[]`
   */
  defaultValue: {
    type: [String, Array] as PropType<string | string[]>,
  },
  /**
   * @description 开始日期
   */
  startDate: makeStringProp(getDay(0)),

  /**
   * @description 结束日期
   */
  endDate: makeStringProp(getDay(365)),

  /**
   * @description 是否展示今天标记
   */
  showToday: truthProp,

  /**
   * @description 范围选择，开始信息文案
   */
  startText: makeStringProp('开始'),

  /**
   * @description 范围选择，结束信息文案
   */
  endText: makeStringProp('结束'),

  /**
   * @description 底部确认按钮文案
   */
  confirmText: makeStringProp('确认'),

  /**
   * @description 是否在展示日历标题
   */
  showTitle: truthProp,

  /**
   * @description 是否展示日期标题
   */
  showSubTitle: truthProp,

  /**
   * @description 是否启动滚动动画
   */
  toDateAnimation: truthProp,

  /**
   * @description 设置周起始日
   */
  firstDayOfWeek: makeNumberProp(0),

  /**
   * @description 一个用来判断该日期是否被禁用的函数，接受一个 `年 - 月 - 日` 作为参数。 应该返回一个 Boolean 值。
   * @default undefined
   */
  disabledDate: Function,

  /**
   * @description 是否使用 footer 插槽，如果使用,此值必须为 true
   */
  footerSlot: Boolean,
  /**
   * @description 是否使用 btn 插槽，如果使用,此值必须为 true
   */
  btnSlot: Boolean,
}

export type CalendarProps = ExtractPropTypes<typeof calendarProps>

export const calendarEmits = {
  [CHOOSE_EVENT]: (val: string | object) => isString(val) || val instanceof Object,
  [CLOSE_EVENT]: () => true,
  [UPDATE_VISIBLE_EVENT]: (val: boolean) => isBoolean(val),
  [SELECT_EVENT]: (val: any) => val,
  clickCloseIcon: () => true,
  clickOverlay: () => true,
}

export type CalendarEmits = typeof calendarEmits
