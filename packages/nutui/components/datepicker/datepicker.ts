import type { ExtractPropTypes, PropType } from 'vue'
import { isDate, makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import type { PickerOption } from '../pickercolumn'
import { CANCEL_EVENT, CHANGE_EVENT, CLICK_EVENT, CONFIRM_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import type { Filter, Formatter } from './type'

export const currentYear = new Date().getFullYear()

export const datepickerProps = {
  /**
   * @description 初始值
   */
  modelValue: {
    type: [Date, String, Number],
  },
  /**
   * @description 设置标题
   */
  title: makeStringProp(''),
  /**
   * @description 确定按钮文案
   */
  okText: makeStringProp(''),
  /**
   * @description 取消按钮文案
   */
  cancelText: makeStringProp(''),
  /**
   * @description 时间类型，可选值 `date`(年月日) `time`(时分秒) `year-month`(年月) `month-day`(月日) `datehour`(年月日时) `hour-minute`
   */
  type: makeStringProp<'date' | 'time' | 'year-month' | 'month-day' | 'datehour' | 'hour-minute' | 'datetime'>('date'),
  /**
   * @description 每列是否展示中文
   */
  isShowChinese: Boolean,
  /**
   * @description 分钟步进值
   */
  minuteStep: makeNumberProp(1),
  /**
   * @description 开始日期
   */
  minDate: {
    type: Date,
    default: () => new Date(currentYear - 10, 0, 1),
    validator: isDate,
  },
  /**
   * @description 结束日期
   */
  maxDate: {
    type: Date,
    default: () => new Date(currentYear + 10, 11, 31),
    validator: isDate,
  },
  /**
   * @description 选项格式化函数
   */
  formatter: {
    type: Function as PropType<Formatter>,
    default: null,
  },
  /**
   * @description 是否开启3D效果
   */
  threeDimensional: truthProp,
  /**
   * @description 惯性滚动时长
   */
  swipeDuration: makeNumericProp(1000),
  /**
   * @description 选项过滤函数
   */
  filter: Function as PropType<Filter>,
  /**
   * @description 是否显示顶部导航
   */
  showToolbar: truthProp,
  /**
   * @description 可见的选项个数
   */
  visibleOptionNum: makeNumericProp(7),
  /**
   * @description 选项高度
   */
  optionHeight: makeNumericProp(36),
}

export type DatePickerProps = ExtractPropTypes<typeof datepickerProps>

export const datepickerEmits = {
  [CLICK_EVENT]: () => true,
  [CANCEL_EVENT]: (val: any) => val instanceof Object,
  [CONFIRM_EVENT]: (val: any) => val instanceof Object,
  [CHANGE_EVENT]: (val: {
    columnIndex: number
    selectedValue: (string | number)[]
    selectedOptions: PickerOption[]
  }) => val instanceof Object,
  [UPDATE_MODEL_EVENT]: (val: any) => val instanceof Object,
}

export type DatePickerEmits = typeof datepickerEmits
