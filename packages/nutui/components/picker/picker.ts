import type { ExtractPropTypes } from 'vue'
import { CANCEL_EVENT, CHANGE_EVENT, CONFIRM_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { commonProps, makeArrayProp, makeNumericProp, makeObjectProp, makeStringProp, truthProp } from '../_utils'
import type { PickerFieldNames, PickerOption } from '../pickercolumn'
import type { PickerBaseEvent, PickerChangeEvent } from './type'

export const pickerProps = {
  ...commonProps,
  /**
   * @description 默认选中项
   */
  modelValue: makeArrayProp<string | number>([]),
  /**
   * @description 对象数组，配置每一列显示的数据
   */
  columns: makeArrayProp<PickerOption | PickerOption[]>([]),
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
  /**
   * @description 自定义 columns 中的字段
   */
  fieldNames: makeObjectProp<PickerFieldNames>({}),
}

export type PickerProps = ExtractPropTypes<typeof pickerProps>

export const pickerEmits = {
  [UPDATE_MODEL_EVENT]: (val: (string | number)[]) => val instanceof Object,
  [CHANGE_EVENT]: (evt: PickerChangeEvent) => evt instanceof Object,
  [CONFIRM_EVENT]: (evt: PickerBaseEvent) => evt instanceof Object,
  [CANCEL_EVENT]: (evt: PickerBaseEvent) => evt instanceof Object,
}

export type PickerEmits = typeof pickerEmits
