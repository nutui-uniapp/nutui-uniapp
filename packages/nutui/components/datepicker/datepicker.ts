import type { ExtractPropTypes, PropType } from 'vue'
import { CANCEL_EVENT, CHANGE_EVENT, CONFIRM_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import type {
  DateLike,
  DatePickerBaseEvent,
  DatePickerChangeEvent,
  DatePickerFilter,
  DatePickerFormatter,
  DatePickerType,
} from './type'

export const datepickerProps = {
  /**
   * @description 初始值
   */
  modelValue: {
    type: [Number, String, Object] as PropType<DateLike>,
  },
  /**
   * @description 时间类型，可选值 `date`(年月日) `time`(时分秒) `year-month`(年月) `month-day`(月日) `datehour`(年月日时) `hour-minute`
   */
  type: makeStringProp<DatePickerType>('date'),
  /**
   * @description 是否显示顶部导航
   */
  showToolbar: truthProp,
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
    type: [Number, String, Object] as PropType<DateLike>,
    default: () => new Date(new Date().getFullYear() - 10, 0, 1),
  },
  /**
   * @description 结束日期
   */
  maxDate: {
    type: [Number, String, Object] as PropType<DateLike>,
    default: () => new Date(new Date().getFullYear() + 10, 11, 31),
  },
  /**
   * @description 选项格式化函数
   */
  formatter: Function as PropType<DatePickerFormatter>,
  /**
   * @description 选项过滤函数
   */
  filter: Function as PropType<DatePickerFilter>,
  /**
   * @description 是否开启3D效果
   */
  threeDimensional: Boolean,
  /**
   * @description 惯性滚动时长
   */
  swipeDuration: makeNumericProp(1000),
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
  [UPDATE_MODEL_EVENT]: (val: Date) => val instanceof Object,
  [CHANGE_EVENT]: (evt: DatePickerChangeEvent) => evt instanceof Object,
  [CONFIRM_EVENT]: (evt: DatePickerBaseEvent) => evt instanceof Object,
  [CANCEL_EVENT]: (evt: DatePickerBaseEvent) => evt instanceof Object,
}

export type DatePickerEmits = typeof datepickerEmits
