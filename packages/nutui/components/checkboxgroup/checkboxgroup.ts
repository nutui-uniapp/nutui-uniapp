import type { ExtractPropTypes } from 'vue'
import { commonProps, isArray, makeArrayProp, makeNumberProp } from '../_utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export const checkboxgroupProps = {
  ...commonProps,
  /**
   * @description 当前选中项的标识符，和 `label` 相对应
   */
  modelValue: makeArrayProp<any>([]),
  /**
   * @description 是否禁用选择,将用于其下的全部复选框
   */
  disabled: Boolean,
  /**
   * @description 限制选择的数量，不能和全选/取消/反选一起使用, 0表示没有限制
   */
  max: makeNumberProp(0),
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxgroupProps>

export const checkboxgroupEmits = {
  [CHANGE_EVENT]: (val: any[]) => val instanceof Object,
  [UPDATE_MODEL_EVENT]: (val: any[]) => isArray(val),
}

export type CheckboxGroupEmits = typeof checkboxgroupEmits

export interface CheckBoxInst {
  /**
   * @description 全选/取消 传 true,表示全选，传 false,表示取消全选
   */
  toggleAll: (val: boolean) => void
  /**
   * @description 反选
   */
  toggleReverse: () => void
}
