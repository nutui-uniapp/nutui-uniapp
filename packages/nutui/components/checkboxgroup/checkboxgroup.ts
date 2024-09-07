import type { ExtractPropTypes } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { commonProps, makeArrayProp, makeNumberProp, nullableBooleanProp } from '../_utils'

export const checkboxgroupProps = {
  ...commonProps,
  /**
   * @description 当前选中项的标识符，和 `label` 相对应
   */
  modelValue: makeArrayProp<any>([]),
  /**
   * @description 是否禁用选择,将用于其下的全部复选框
   */
  disabled: nullableBooleanProp,
  /**
   * @description 限制选择的数量，不能和全选/取消/反选一起使用, 0表示没有限制
   */
  max: makeNumberProp(0),
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxgroupProps>

/* eslint-disable unused-imports/no-unused-vars */
export const checkboxgroupEmits = {
  [UPDATE_MODEL_EVENT]: (value: any[]) => true,
  [CHANGE_EVENT]: (value: any[]) => true,
}
/* eslint-enable unused-imports/no-unused-vars */

export type CheckboxGroupEmits = typeof checkboxgroupEmits
