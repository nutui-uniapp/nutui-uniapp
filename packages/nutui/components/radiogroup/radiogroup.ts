import type { ExtractPropTypes } from 'vue'
import { commonProps, isBoolean, isNumber, isString, makeStringProp } from '../_utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export const radiogroupProps = {
  ...commonProps,
  /**
   * @description 当前选中项的标识符，与 `label` 值一致时呈选中状态
   */
  modelValue: {
    type: [Number, String, Boolean],
    default: '',
  },
  /**
   * @description 使用横纵方向，可选值 `horizontal`、`vertical`
   */
  direction: makeStringProp<'vertical' | 'horizontal'>('vertical'),
  /**
   * @description 文本所在的位置，可选值：`left`,`right`
   */
  textPosition: makeStringProp<'left' | 'right'>('right'),
}

export type RadioGroupProps = ExtractPropTypes<typeof radiogroupProps>

export const radiogroupEmits = {
  [CHANGE_EVENT]: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val),
  [UPDATE_MODEL_EVENT]: (val: string | boolean | number) => isString(val) || isNumber(val) || isBoolean(val),
}

export type RadioGroupEmits = typeof radiogroupEmits
