import type { ExtractPropTypes } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { commonProps, isBoolean, isNumber, isString } from '../_utils'

export const collapseProps = {
  ...commonProps,
  /**
   * @description 当前展开面板的 `name`
   */
  modelValue: { type: [String, Number, Array<string | number>], default: '' },
  /**
   * @description 是否开启手风琴模式
   */
  accordion: Boolean,
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export const collapseEmits = {
  [CHANGE_EVENT]: (val: string | number | (string | number)[], name: string | number, status: boolean) => isString(val) || isNumber(val) || (val instanceof Object && isNumber(name)) || (isString(name) && isBoolean(status)),
  [UPDATE_MODEL_EVENT]: (val: string | number | (string | number)[]) => isString(val) || isNumber(val) || (val instanceof Object),
}

export type CollapseEmits = typeof collapseEmits
