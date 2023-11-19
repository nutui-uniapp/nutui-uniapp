import type { ExtractPropTypes, PropType } from 'vue'
import type { PickerFieldNames, PickerOption } from '../pickercolumn/types'
import { commonProps, makeArrayProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { CANCEL_EVENT, CHANGE_EVENT, CONFIRM_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export const pickerProps = {
  ...commonProps,
  /**
   * @description 默认选中项
   */
  modelValue: makeArrayProp<(string | number)[]>([]),
  /**
   * @description 设置标题
   */
  title: makeStringProp(''),
  /**
   * @description 取消按钮文案
   */
  cancelText: makeStringProp(''),
  /**
   * @description 确定按钮文案
   */
  okText: makeStringProp(''),
  /**
   * @description 对象数组，配置每一列显示的数据
   */
  columns: makeArrayProp<(PickerOption | PickerOption[])[]>([]),
  /**
   * @description 是否开启3D效果
   */
  threeDimensional: truthProp,
  /**
   * @description 惯性滚动时长
   */
  swipeDuration: makeNumericProp(1000),
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
  /**
   * @description 自定义 columns 中的字段
   */
  fieldNames: {
    type: Object as PropType<PickerFieldNames>,
    default: () => ({}),
  },
}

export type PickerProps = ExtractPropTypes<typeof pickerProps>

export const pickerEmits = {
  [CANCEL_EVENT]: (val: {
    selectedValue: (string | number)[]
    selectedOptions: PickerOption[]
  }) => val instanceof Object,
  [CHANGE_EVENT]: (val: {
    columnIndex: number
    selectedValue: (string | number)[]
    selectedOptions: PickerOption[]
  }) => val instanceof Object,
  [CONFIRM_EVENT]: (val: {
    selectedValue: (string | number)[]
    selectedOptions: PickerOption[]
  }) => val instanceof Object,
  [UPDATE_MODEL_EVENT]: (val: (string | number)[]) => val instanceof Object,
}

export type PickerEmits = typeof pickerEmits
